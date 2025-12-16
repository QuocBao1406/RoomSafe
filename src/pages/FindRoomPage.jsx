import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
    FaSearch, FaMapMarkerAlt, FaBed, FaRulerCombined, 
    FaHeart, FaRegHeart, FaBolt, FaTint, FaFilter, FaCity, FaHome, FaDollarSign
} from 'react-icons/fa';
import '../css/FindRoomPage.css';
import RoomDetailModal from '../components/RoomDetailModal.jsx';

const FindRoomPage = () => {
    // --- KHAI BÁO STATE (Giữ nguyên như cũ) ---
    const [posts, setPosts] = useState([]); 
    const [filteredPosts, setFilteredPosts] = useState([]); 
    const [loading, setLoading] = useState(true);
    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [selectedProvinceId, setSelectedProvinceId] = useState('');
    const [filters, setFilters] = useState({ keyword: '', city: '', district: '', priceRange: '', category: '' });
    const [sortOption, setSortOption] = useState('newest'); 
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedRoom, setSelectedRoom] = useState(null);
    const [favorites, setFavorites] = useState([]);

    // --- HELPER FUNCTIONS (Giữ nguyên) ---
    const formatPriceShort = (price) => {
        if (!price) return "Thỏa thuận";
        if (price >= 1000000) return (price / 1000000).toFixed(1).replace('.0', '') + " tr";
        return (price / 1000).toFixed(0) + "k";
    };
    const formatPriceFull = (price) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
    const toggleFavorite = (e, id) => {
        e.stopPropagation();
        setFavorites(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
    };

    // --- FETCH DATA (Giữ nguyên) ---
    useEffect(() => {
        const fetchProvinces = async () => {
            try {
                const res = await axios.get('https://esgoo.net/api-tinhthanh/1/0.htm');
                if(res.data.error === 0) setProvinces(res.data.data);
            } catch (error) { console.error(error); }
        };
        fetchProvinces();
    }, []);

    const handleProvinceChange = async (e) => {
        const provinceId = e.target.value;
        const index = e.target.selectedIndex;
        const provinceName = e.target.childNodes[index].getAttribute('data-name') || '';
        setSelectedProvinceId(provinceId);
        setFilters({ ...filters, city: provinceName, district: '' });
        setDistricts([]);
        if (provinceId) {
            try {
                const res = await axios.get(`https://esgoo.net/api-tinhthanh/2/${provinceId}.htm`);
                if(res.data.error === 0) setDistricts(res.data.data);
            } catch (error) { console.error(error); }
        }
    };
    const handleDistrictChange = (e) => {
        const index = e.target.selectedIndex;
        const districtName = e.target.childNodes[index].getAttribute('data-name') || '';
        setFilters({ ...filters, district: districtName });
    };

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/posts/public');
                const data = res.data.data || [];
                const availablePosts = data.filter(p => p.status === 'AVAILABLE');
                setPosts(availablePosts);
                setFilteredPosts(availablePosts);
            } catch (error) { console.error(error); } 
            finally { setTimeout(() => setLoading(false), 600); }
        };
        fetchPosts();
    }, []);

    // --- FILTER LOGIC (Giữ nguyên) ---
    useEffect(() => {
        let results = [...posts];
        if (filters.keyword) {
            const key = filters.keyword.toLowerCase();
            results = results.filter(p => p.post_title.toLowerCase().includes(key) || p.post_address.toLowerCase().includes(key));
        }
        if (filters.city) results = results.filter(p => p.post_city && p.post_city.includes(filters.city));
        if (filters.district) results = results.filter(p => p.post_district && p.post_district.includes(filters.district));
        if (filters.category) results = results.filter(p => p.category === filters.category);
        if (filters.priceRange) {
            const price = parseInt(filters.priceRange);
            results = results.filter(p => {
                if (price === 1) return p.post_price < 1000000;
                if (price === 2) return p.post_price >= 1000000 && p.post_price < 3000000;
                if (price === 3) return p.post_price >= 3000000 && p.post_price < 5000000;
                if (price === 4) return p.post_price >= 5000000;
                return true;
            });
        }
        if (sortOption === 'newest') results.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        if (sortOption === 'price_asc') results.sort((a, b) => a.post_price - b.post_price);
        if (sortOption === 'price_desc') results.sort((a, b) => b.post_price - a.post_price);
        setFilteredPosts(results);
    }, [filters, sortOption, posts]);

    const clearFilters = () => {
        setFilters({ keyword: '', city: '', district: '', priceRange: '', category: '' });
        setSelectedProvinceId('');
        setDistricts([]);
    };

    const openModal = (post) => {
        const fmt = (p) => p ? new Intl.NumberFormat('vi-VN').format(p) : 0;
        setSelectedRoom({
            ...post, id: post.post_id, title: post.post_title, price: formatPriceFull(post.post_price),
            address: `${post.post_address}, ${post.post_ward||''}, ${post.post_district}, ${post.post_city}`,
            area: post.post_area, description: post.post_description || "...",
            image: post.thumbnail, images: post.images || [], 
            elecPrice: Number(post.price_electricity)===0?"Miễn phí":`${fmt(post.price_electricity)} đ/kwh`,
            waterPrice: Number(post.price_water)===0?"Miễn phí":`${fmt(post.price_water)} đ/khối`,
            internetPrice: Number(post.price_internet)===0?"Miễn phí":`${fmt(post.price_internet)} đ/tháng`,
        });
        setIsModalOpen(true);
    };

    return (
        <div className="client-page-wrapper">
            {/* HERO MỚI (Overlay tối + Chữ nổi) */}
            <div className="search-hero">
                <h1 className="hero-title">Tìm Phòng Nhanh & Ưng Ý</h1>
            </div>

            {/* FILTER BAR - NỀN TRẮNG SẠCH */}
            <div className="filter-bar-wrapper">
                <div className="filter-bar-container">
                    <div className="filter-group" style={{flex: 1.5}}>
                        <label className="filter-label"><FaSearch size={10}/> TÌM KIẾM</label>
                        <input 
                            className="filter-input" placeholder="Nhập khu vực..."
                            value={filters.keyword} onChange={(e) => setFilters({...filters, keyword: e.target.value})}
                        />
                    </div>
                    <div className="filter-group">
                        <label className="filter-label"><FaCity size={10}/> TỈNH / THÀNH</label>
                        <select className="filter-select" value={selectedProvinceId} onChange={handleProvinceChange}>
                            <option value="">Toàn quốc</option>
                            {provinces.map(p => <option key={p.id} value={p.id} data-name={p.full_name}>{p.full_name}</option>)}
                        </select>
                    </div>
                    <div className="filter-group">
                        <label className="filter-label"><FaMapMarkerAlt size={10}/> QUẬN / HUYỆN</label>
                        <select className="filter-select" value={filters.district ? 'selected' : ''} onChange={handleDistrictChange} disabled={!selectedProvinceId} style={{opacity: !selectedProvinceId?0.5:1}}>
                            <option value="">Tất cả</option>
                            {districts.map(d => <option key={d.id} value={d.id} data-name={d.full_name}>{d.full_name}</option>)}
                        </select>
                    </div>
                    <div className="filter-group">
                        <label className="filter-label"><FaHome size={10}/> LOẠI PHÒNG</label>
                         <select className="filter-select" value={filters.category} onChange={(e) => setFilters({...filters, category: e.target.value})}>
                            <option value="">Tất cả</option>
                            <option value="PHONG_TRO">Phòng trọ</option>
                            <option value="CHUNG_CU">Chung cư</option>
                            <option value="NHA_NGUYEN_CAN">Nguyên căn</option>
                            <option value="O_GHEP">Ở ghép</option>
                        </select>
                    </div>
                    <div className="filter-group">
                        <label className="filter-label"><FaDollarSign size={10}/> MỨC GIÁ</label>
                        <select className="filter-select" value={filters.priceRange} onChange={(e) => setFilters({...filters, priceRange: e.target.value})}>
                            <option value="">Tất cả</option>
                            <option value="1">&lt; 1 triệu</option>
                            <option value="2">1 - 3 triệu</option>
                            <option value="3">3 - 5 triệu</option>
                            <option value="4">&gt; 5 triệu</option>
                        </select>
                    </div>
                    <button className="btn-search-round"><FaSearch size={18} /></button>
                </div>
            </div>

            {/* LIST ROOMS */}
            <div className="room-list-container">
                <div className="list-header-modern">
                    
                    {/* --- KẾT QUẢ HIỂN THỊ DẠNG BADGE KHUNG --- */}
                    <div className="list-title-modern">
                        <div className="result-count-badge">
                            <span>Hiện có:</span>
                            <span className="count-number">{filteredPosts.length}</span>
                            <span>tin đăng</span>
                        </div>
                    </div>
                    
                    <div style={{display:'flex', alignItems:'center', gap: '8px'}}>
                        <span style={{fontSize:'0.8rem', color:'#64748b', fontWeight:'600'}}>Sắp xếp:</span>
                        <select className="sort-select-minimal" value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
                            <option value="newest">Mới nhất</option>
                            <option value="price_asc">Giá tăng dần</option>
                            <option value="price_desc">Giá giảm dần</option>
                        </select>
                    </div>
                </div>

                {loading ? (
                    <div className="room-grid">
                        {[1,2,3,4,5,6].map(i => <div key={i} className="skeleton-loader" style={{height: '280px', borderRadius:'20px'}}></div>)}
                    </div>
                ) : (
                    <div className="room-grid">
                        {filteredPosts.map(post => (
                            <div key={post.post_id} className="premium-card" onClick={() => openModal(post)}>
                                <div className="card-img-container">
                                    <img src={post.thumbnail || "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=600&q=80"} alt={post.post_title} />
                                    <div className="badge-category">
                                        {post.category === 'PHONG_TRO' ? 'Trọ' : post.category === 'CHUNG_CU' ? 'Căn hộ' : post.category === 'NHA_NGUYEN_CAN' ? 'Nhà' : 'Ghép'}
                                    </div>
                                    <div className="card-heart-btn" onClick={(e) => toggleFavorite(e, post.post_id)}>
                                        {favorites.includes(post.post_id) ? <FaHeart color="#f43f5e"/> : <FaRegHeart/>}
                                    </div>
                                    <div className="card-price-overlay">
                                        <span className="price-amount">{formatPriceShort(post.post_price)}</span>
                                        <span className="price-unit">/tháng</span>
                                    </div>
                                </div>
                                <div className="card-content">
                                    <h3 className="card-title-link" title={post.post_title}>{post.post_title}</h3>
                                    <div className="card-location">
                                        <FaMapMarkerAlt size={12} color="#94a3b8"/> 
                                        <span className="truncate">{post.post_district}, {post.post_city}</span>
                                    </div>
                                    <div className="card-amenities">
                                        <div className="amenity-pill"><FaRulerCombined size={10}/> {post.post_area}m²</div>
                                        <div className="amenity-pill"><FaBed size={10}/> {post.category==='O_GHEP'?'Giường':'1 ngủ'}</div>
                                        {Number(post.price_electricity) === 0 && <div className="amenity-pill" style={{color:'#10b981', background:'#d1fae5'}}><FaBolt size={10}/> Free điện</div>}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
                
                {!loading && filteredPosts.length === 0 && (
                    <div style={{textAlign: 'center', padding: '60px', color: '#64748b'}}>
                        <FaFilter size={40} color="#e2e8f0" style={{marginBottom:'10px'}}/>
                        <p style={{fontWeight:'600'}}>Không tìm thấy phòng phù hợp.</p>
                        <button onClick={clearFilters} style={{color:'var(--fr-primary)', fontWeight:'700', border:'none', background:'none', cursor:'pointer', marginTop:'10px'}}>Xóa bộ lọc</button>
                    </div>
                )}
            </div>

            <RoomDetailModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} roomData={selectedRoom} />
        </div>
    );
};

export default FindRoomPage;