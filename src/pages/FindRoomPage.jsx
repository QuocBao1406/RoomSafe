import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
    FaSearch, FaMapMarkerAlt, FaHeart, FaRegHeart, FaBolt, FaTint, FaWifi, 
    FaCity, FaHome, FaDollarSign, FaFilter, FaExpandArrowsAlt, FaClock 
} from 'react-icons/fa';
import '../css/FindRoomPage.css';
import RoomDetailModal from '../components/RoomDetailModal.jsx';

const FindRoomPage = () => {
    // --- KHAI BÁO STATE ---
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

    // --- HELPER FUNCTIONS ---
    
    // Format giá ngắn gọn cho Badge: "3.5 tr", "500k"
    const formatPriceShort = (price) => {
        if (!price) return "Thỏa thuận";
        if (price >= 1000000) return (price / 1000000).toFixed(1).replace('.0', '') + " tr";
        return (price / 1000).toFixed(0) + "k";
    };
    
    // Format giá đầy đủ cho Modal
    const formatPriceFull = (price) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
    
    // Tính thời gian đăng (Vd: "2 giờ trước")
    const timeAgo = (dateString) => {
        const date = new Date(dateString);
        const now = new Date();
        const seconds = Math.floor((now - date) / 1000);
        
        let interval = seconds / 31536000;
        if (interval > 1) return Math.floor(interval) + " năm trước";
        interval = seconds / 2592000;
        if (interval > 1) return Math.floor(interval) + " tháng trước";
        interval = seconds / 86400;
        if (interval > 1) return Math.floor(interval) + " ngày trước";
        interval = seconds / 3600;
        if (interval > 1) return Math.floor(interval) + " giờ trước";
        interval = seconds / 60;
        if (interval > 1) return Math.floor(interval) + " phút trước";
        return "Vừa xong";
    };

    const toggleFavorite = (e, id) => {
        e.stopPropagation();
        setFavorites(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
    };

    // --- FETCH DATA ---
    useEffect(() => {
        const fetchProvinces = async () => {
            try {
                const res = await axios.get('https://esgoo.net/api-tinhthanh/1/0.htm');
                if(res.data.error === 0) setProvinces(res.data.data);
            } catch (error) { console.error(error); }
        };
        fetchProvinces();
    }, []);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/posts/public');
                const data = res.data.data || [];
                // Chỉ lấy tin AVAILABLE (Còn phòng)
                const availablePosts = data.filter(p => p.status === 'AVAILABLE');
                setPosts(availablePosts);
                setFilteredPosts(availablePosts);
            } catch (error) { console.error(error); } 
            finally { setTimeout(() => setLoading(false), 500); }
        };
        fetchPosts();
    }, []);

    // Load Quận/Huyện khi chọn Tỉnh
    useEffect(() => {
        if (!selectedProvinceId) { setDistricts([]); return; }
        const fetchDistricts = async () => {
             try {
                const res = await axios.get(`https://esgoo.net/api-tinhthanh/2/${selectedProvinceId}.htm`);
                if(res.data.error === 0) setDistricts(res.data.data);
            } catch (error) { console.error(error); }
        };
        fetchDistricts();
    }, [selectedProvinceId]);

    const handleProvinceChange = (e) => {
        const pId = e.target.value;
        const index = e.target.selectedIndex;
        const pName = e.target.childNodes[index].getAttribute('data-name') || '';
        setSelectedProvinceId(pId);
        setFilters({ ...filters, city: pName, district: '' });
    };

    // --- FILTER & SORT LOGIC ---
    useEffect(() => {
        let results = [...posts];
        // 1. Lọc theo từ khóa
        if (filters.keyword) {
            const key = filters.keyword.toLowerCase();
            results = results.filter(p => p.post_title.toLowerCase().includes(key) || p.post_address.toLowerCase().includes(key));
        }
        // 2. Lọc theo địa điểm
        if (filters.city) results = results.filter(p => p.post_city && p.post_city.includes(filters.city));
        if (filters.district) results = results.filter(p => p.post_district && p.post_district.includes(filters.district));
        // 3. Lọc theo loại phòng
        if (filters.category) results = results.filter(p => p.category === filters.category);
        // 4. Lọc theo giá
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
        // 5. Sắp xếp
        if (sortOption === 'newest') results.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        if (sortOption === 'price_asc') results.sort((a, b) => a.post_price - b.post_price);
        if (sortOption === 'price_desc') results.sort((a, b) => b.post_price - a.post_price);
        
        setFilteredPosts(results);
    }, [filters, sortOption, posts]);

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
            {/* HERO SECTION */}
            <div className="search-hero">
                <h1 className="hero-title">Tìm không gian sống lý tưởng</h1>
                <p className="hero-subtitle">Hàng nghìn phòng trọ, căn hộ đang chờ bạn khám phá</p>
            </div>

            {/* FILTER BAR (FLOATING PILL) */}
            <div className="filter-bar-wrapper">
                <div className="filter-bar-container">
                    <div className="filter-group" style={{flex: 1.5}}>
                        <label className="filter-label"><FaSearch/> Tìm kiếm</label>
                        <input className="filter-input" placeholder="Nhập tên đường, khu vực..." value={filters.keyword} onChange={(e) => setFilters({...filters, keyword: e.target.value})}/>
                    </div>
                    <div className="filter-group">
                        <label className="filter-label"><FaCity/> Tỉnh/Thành</label>
                        <select className="filter-select" value={selectedProvinceId} onChange={handleProvinceChange}>
                            <option value="">Toàn quốc</option>
                            {provinces.map(p => <option key={p.id} value={p.id} data-name={p.full_name}>{p.full_name}</option>)}
                        </select>
                    </div>
                    <div className="filter-group">
                        <label className="filter-label"><FaMapMarkerAlt/> Quận/Huyện</label>
                        <select className="filter-select" value={filters.district ? 'selected' : ''} onChange={(e) => {
                                const index = e.target.selectedIndex;
                                const dName = e.target.childNodes[index].getAttribute('data-name') || '';
                                setFilters({ ...filters, district: dName });
                            }} disabled={!selectedProvinceId} style={{opacity: !selectedProvinceId?0.5:1}}>
                            <option value="">Tất cả</option>
                            {districts.map(d => <option key={d.id} value={d.id} data-name={d.full_name}>{d.full_name}</option>)}
                        </select>
                    </div>
                    <div className="filter-group">
                        <label className="filter-label"><FaHome/> Loại phòng</label>
                         <select className="filter-select" value={filters.category} onChange={(e) => setFilters({...filters, category: e.target.value})}>
                            <option value="">Tất cả</option>
                            <option value="PHONG_TRO">Phòng trọ</option>
                            <option value="CHUNG_CU">Chung cư</option>
                            <option value="NHA_NGUYEN_CAN">Nguyên căn</option>
                            <option value="O_GHEP">Ở ghép</option>
                        </select>
                    </div>
                    <div className="filter-group">
                        <label className="filter-label"><FaDollarSign/> Mức giá</label>
                        <select className="filter-select" value={filters.priceRange} onChange={(e) => setFilters({...filters, priceRange: e.target.value})}>
                            <option value="">Mọi mức giá</option>
                            <option value="1">&lt; 1 triệu</option>
                            <option value="2">1 - 3 triệu</option>
                            <option value="3">3 - 5 triệu</option>
                            <option value="4">&gt; 5 triệu</option>
                        </select>
                    </div>
                    <button className="btn-search-round"><FaSearch size={20} /></button>
                </div>
            </div>

            {/* RESULT LIST */}
            <div className="room-list-container">
                <div className="list-header-modern">
                    <div className="result-badge">Tìm thấy <b>{filteredPosts.length}</b> tin đăng</div>
                    <div className="sort-box">
                        <span className="sort-label">Sắp xếp:</span>
                        <select className="sort-select" value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
                            <option value="newest">Mới nhất</option>
                            <option value="price_asc">Giá tăng dần</option>
                            <option value="price_desc">Giá giảm dần</option>
                        </select>
                    </div>
                </div>

                {loading ? (
                    <div style={{textAlign:'center', padding:50}}>Đang tải danh sách phòng...</div>
                ) : (
                    <div className="room-grid">
                        {filteredPosts.map(post => (
                            <div key={post.post_id} className="premium-card" onClick={() => openModal(post)}>
                                
                                {/* 1. ẢNH & BADGE */}
                                <div className="card-img-container">
                                    <img src={post.thumbnail || "https://via.placeholder.com/400x300?text=RoomSafe"} alt={post.post_title} />
                                    
                                    <div className="category-badge">
                                        {post.category === 'PHONG_TRO' ? 'Phòng trọ' : post.category === 'CHUNG_CU' ? 'Căn hộ' : post.category === 'NHA_NGUYEN_CAN' ? 'Nhà nguyên căn' : 'Ở ghép'}
                                    </div>
                                    <div className="card-heart-btn" onClick={(e) => toggleFavorite(e, post.post_id)}>
                                        {favorites.includes(post.post_id) ? <FaHeart color="#f43f5e"/> : <FaRegHeart/>}
                                    </div>
                                    
                                    {/* Giá tiền nổi bật ở góc */}
                                    <div className="price-badge">
                                        {formatPriceShort(post.post_price)} <small>/tháng</small>
                                    </div>
                                </div>

                                {/* 2. NỘI DUNG CHÍNH */}
                                <div className="card-content">
                                    <h3 className="card-title" title={post.post_title}>{post.post_title}</h3>
                                    
                                    {/* Địa chỉ 2 dòng */}
                                    <div className="card-address">
                                        <FaMapMarkerAlt style={{color:'#4f46e5', marginTop:3, flexShrink:0}}/> 
                                        <span className="address-text">
                                            {post.post_address}, {post.post_ward}, {post.post_district}
                                        </span>
                                    </div>

                                    {/* Tags Dịch vụ (Hiển thị nhanh Diện tích, Điện, Nước) */}
                                    <div className="service-tags">
                                        <div className="tag area"><FaExpandArrowsAlt/> {post.post_area}m²</div>
                                        
                                        {Number(post.price_electricity) === 0 ? 
                                            <div className="tag free"><FaBolt/> Free điện</div> : 
                                            <div className="tag"><FaBolt/> {post.price_electricity/1000}k</div>
                                        }
                                        
                                        {Number(post.price_water) === 0 ? 
                                            <div className="tag free"><FaTint/> Free nước</div> : 
                                            <div className="tag"><FaTint/> {post.price_water/1000}k</div>
                                        }

                                        {Number(post.price_internet) === 0 && 
                                            <div className="tag free"><FaWifi/> Free Net</div>
                                        }
                                    </div>
                                </div>

                                {/* 3. FOOTER (Người đăng & Thời gian) */}
                                <div className="card-footer">
                                    <div className="user-info">
                                        <img className="user-avatar" src="https://cdn-icons-png.flaticon.com/512/149/149071.png" alt="user" />
                                        <span>Chủ trọ</span>
                                    </div>
                                    <span className="time-posted">
                                        <FaClock style={{marginRight:4}}/> {timeAgo(post.created_at)}
                                    </span>
                                </div>

                            </div>
                        ))}
                    </div>
                )}
                
                {/* Empty State */}
                {!loading && filteredPosts.length === 0 && (
                    <div style={{textAlign: 'center', padding: '80px 0', color: '#94a3b8'}}>
                        <FaFilter size={50} style={{opacity: 0.2, marginBottom: 20}}/>
                        <p>Không tìm thấy phòng nào phù hợp.</p>
                        <button onClick={() => setFilters({ keyword: '', city: '', district: '', priceRange: '', category: '' })} style={{color:'#4f46e5', fontWeight:'700', border:'none', background:'none', cursor:'pointer', marginTop:'10px'}}>Xóa bộ lọc và tìm lại</button>
                    </div>
                )}
            </div>

            <RoomDetailModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} roomData={selectedRoom} />
        </div>
    );
};

export default FindRoomPage;