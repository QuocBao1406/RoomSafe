import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
    FaSearch, FaMapMarkerAlt, FaBed, FaRulerCombined, 
    FaSortAmountDown, FaHeart, FaRegHeart, FaBolt, FaTint, FaWifi 
} from 'react-icons/fa';
import '../css/FindRoomPage.css';
import RoomDetailModal from '../components/RoomDetailModal.jsx';

const FindRoomPage = () => {
    // --- STATE DỮ LIỆU ---
    const [posts, setPosts] = useState([]); 
    const [filteredPosts, setFilteredPosts] = useState([]); 
    const [loading, setLoading] = useState(true);

    // --- STATE ĐỊA CHÍNH (Đồng bộ với trang Đăng tin) ---
    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [selectedProvinceId, setSelectedProvinceId] = useState(''); // Dùng để load huyện

    // --- STATE BỘ LỌC ---
    const [filters, setFilters] = useState({
        keyword: '',
        city: '',      // Lưu Tên Tỉnh (VD: Thành phố Hà Nội) để khớp DB
        district: '',  // Lưu Tên Huyện (VD: Quận Ba Đình) để khớp DB
        priceRange: '',
        category: ''
    });

    const [sortOption, setSortOption] = useState('newest'); 
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedRoom, setSelectedRoom] = useState(null);
    const [favorites, setFavorites] = useState([]);

    // --- HELPER FORMAT ---
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

    // --- 1. FETCH API ĐỊA CHÍNH (Giống trang Đăng tin) ---
    useEffect(() => {
        const fetchProvinces = async () => {
            try {
                const res = await axios.get('https://esgoo.net/api-tinhthanh/1/0.htm');
                if(res.data.error === 0) setProvinces(res.data.data);
            } catch (error) { console.error("Lỗi tải tỉnh thành:", error); }
        };
        fetchProvinces();
    }, []);

    // Xử lý khi chọn Tỉnh -> Load Huyện tương ứng
    const handleProvinceChange = async (e) => {
        const provinceId = e.target.value;
        const index = e.target.selectedIndex;
        const provinceName = e.target.childNodes[index].getAttribute('data-name') || '';

        setSelectedProvinceId(provinceId);
        setFilters({ ...filters, city: provinceName, district: '' }); // Reset huyện khi đổi tỉnh
        setDistricts([]); // Clear huyện cũ

        if (provinceId) {
            try {
                const res = await axios.get(`https://esgoo.net/api-tinhthanh/2/${provinceId}.htm`);
                if(res.data.error === 0) setDistricts(res.data.data);
            } catch (error) { console.error("Lỗi tải quận huyện:", error); }
        }
    };

    // Xử lý khi chọn Huyện
    const handleDistrictChange = (e) => {
        const index = e.target.selectedIndex;
        const districtName = e.target.childNodes[index].getAttribute('data-name') || '';
        setFilters({ ...filters, district: districtName });
    };

    // --- 2. FETCH DANH SÁCH PHÒNG ---
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/posts/public');
                const data = res.data.data || [];
                // Chỉ lấy tin AVAILABLE
                const availablePosts = data.filter(p => p.status === 'AVAILABLE');
                setPosts(availablePosts);
                setFilteredPosts(availablePosts);
            } catch (error) {
                console.error("Lỗi tải tin:", error);
            } finally {
                setTimeout(() => setLoading(false), 600);
            }
        };
        fetchPosts();
    }, []);

    // --- 3. LOGIC LỌC & SẮP XẾP ---
    useEffect(() => {
        let results = [...posts];

        // Lọc từ khóa
        if (filters.keyword) {
            const key = filters.keyword.toLowerCase();
            results = results.filter(p => 
                p.post_title.toLowerCase().includes(key) || 
                p.post_address.toLowerCase().includes(key)
            );
        }

        // Lọc Tỉnh/Thành (So sánh chuỗi gần đúng để linh hoạt hơn)
        if (filters.city) {
            results = results.filter(p => p.post_city && p.post_city.includes(filters.city));
        }
        
        // Lọc Quận/Huyện
        if (filters.district) {
            results = results.filter(p => p.post_district && p.post_district.includes(filters.district));
        }
        
        // Lọc Category (Khớp với value ở PostRoomPage)
        if (filters.category) {
            results = results.filter(p => p.category === filters.category);
        }
        
        // Lọc Giá
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

        // Sắp xếp
        if (sortOption === 'newest') results.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        if (sortOption === 'price_asc') results.sort((a, b) => a.post_price - b.post_price);
        if (sortOption === 'price_desc') results.sort((a, b) => b.post_price - a.post_price);

        setFilteredPosts(results);
    }, [filters, sortOption, posts]);

    // --- MỞ MODAL ---
    const openModal = (post) => {
        const fmt = (p) => p ? new Intl.NumberFormat('vi-VN').format(p) : 0;
        
        const modalData = {
            ...post, // Copy hết data gốc
            id: post.post_id,
            title: post.post_title,
            price: formatPriceFull(post.post_price),
            address: `${post.post_address}, ${post.post_ward || ''}, ${post.post_district}, ${post.post_city}`,
            area: post.post_area,
            description: post.post_description || "Liên hệ để biết thêm chi tiết.",
            image: post.thumbnail,
            images: post.images || [], 
            
            // Xử lý hiển thị giá dịch vụ (0 -> Miễn phí)
            elecPrice: Number(post.price_electricity) === 0 ? "Miễn phí" : `${fmt(post.price_electricity)} đ/kwh`,
            waterPrice: Number(post.price_water) === 0 ? "Miễn phí" : `${fmt(post.price_water)} đ/khối`,
            internetPrice: Number(post.price_internet) === 0 ? "Miễn phí" : `${fmt(post.price_internet)} đ/tháng`,
        };
        setSelectedRoom(modalData);
        setIsModalOpen(true);
    };

    // Hàm reset bộ lọc
    const clearFilters = () => {
        setFilters({ keyword: '', city: '', district: '', priceRange: '', category: '' });
        setSelectedProvinceId('');
        setDistricts([]);
    };

    return (
        <div className="client-page-wrapper">
            
            {/* HERO & FILTER */}
            <div className="search-hero">
                <div className="hero-content">
                    <h1 className="hero-title">Tìm phòng trọ & Căn hộ ưng ý</h1>
                </div>
            </div>

            <div className="filter-bar-wrapper">
                <div className="filter-bar-container">
                    {/* Cột 1: Từ khóa */}
                    <div className="filter-group" style={{flex: 1.2}}>
                        <label className="filter-label">Tìm kiếm</label>
                        <input 
                            className="filter-input"
                            placeholder="Tên đường, địa điểm..."
                            value={filters.keyword}
                            onChange={(e) => setFilters({...filters, keyword: e.target.value})}
                        />
                    </div>

                    {/* Cột 2: Tỉnh/Thành (API) */}
                    <div className="filter-group">
                        <label className="filter-label">Tỉnh / Thành</label>
                        <select 
                            className="filter-select"
                            value={selectedProvinceId}
                            onChange={handleProvinceChange}
                        >
                            <option value="">Toàn quốc</option>
                            {provinces.map(p => (
                                <option key={p.id} value={p.id} data-name={p.full_name}>
                                    {p.full_name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Cột 3: Quận/Huyện (API - Load theo tỉnh) */}
                    <div className="filter-group">
                        <label className="filter-label">Quận / Huyện</label>
                        <select 
                            className="filter-select"
                            value={filters.district ? 'selected' : ''} // Hack nhẹ để hiển thị placeholder
                            onChange={handleDistrictChange}
                            disabled={!selectedProvinceId}
                            style={{cursor: !selectedProvinceId ? 'not-allowed' : 'pointer', opacity: !selectedProvinceId ? 0.6 : 1}}
                        >
                            <option value="">Tất cả</option>
                            {districts.map(d => (
                                <option key={d.id} value={d.id} data-name={d.full_name}>
                                    {d.full_name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Cột 4: Loại phòng (Khớp PostRoomPage) */}
                    <div className="filter-group">
                        <label className="filter-label">Loại phòng</label>
                         <select 
                            className="filter-select"
                            value={filters.category}
                            onChange={(e) => setFilters({...filters, category: e.target.value})}
                        >
                            <option value="">Tất cả</option>
                            <option value="PHONG_TRO">Phòng trọ</option>
                            <option value="CHUNG_CU">Chung cư / Căn hộ</option>
                            <option value="NHA_NGUYEN_CAN">Nhà nguyên căn</option>
                            <option value="O_GHEP">Ở ghép</option>
                        </select>
                    </div>

                    {/* Cột 5: Giá */}
                    <div className="filter-group">
                        <label className="filter-label">Khoảng giá</label>
                        <select 
                            className="filter-select"
                            value={filters.priceRange}
                            onChange={(e) => setFilters({...filters, priceRange: e.target.value})}
                        >
                            <option value="">Mọi mức giá</option>
                            <option value="1">&lt; 1 triệu</option>
                            <option value="2">1 - 3 triệu</option>
                            <option value="3">3 - 5 triệu</option>
                            <option value="4">&gt; 5 triệu</option>
                        </select>
                    </div>

                    <button className="btn-search-round">
                        <FaSearch size={16} />
                    </button>
                </div>
            </div>

            {/* LIST ROOMS */}
            <div className="room-list-container">
                <div className="list-header-modern">
                    <div className="list-title-modern">
                        <h2>Kết quả tìm kiếm</h2>
                        <span>Tìm thấy {filteredPosts.length} tin đăng phù hợp</span>
                    </div>
                    
                    <div className="sort-box">
                        <span style={{fontSize:'0.85rem', color:'#64748b', fontWeight:'600'}}>Sắp xếp:</span>
                        <select 
                            className="sort-select-minimal"
                            value={sortOption}
                            onChange={(e) => setSortOption(e.target.value)}
                        >
                            <option value="newest">Mới nhất</option>
                            <option value="price_asc">Giá thấp - cao</option>
                            <option value="price_desc">Giá cao - thấp</option>
                        </select>
                    </div>
                </div>

                {loading ? (
                    <div className="room-grid">
                        {[1,2,3,4,5,6].map(i => <div key={i} className="skeleton-loader"></div>)}
                    </div>
                ) : (
                    <div className="room-grid">
                        {filteredPosts.map(post => (
                            <div key={post.post_id} className="premium-card" onClick={() => openModal(post)}>
                                
                                <div className="card-img-container">
                                    <img 
                                        src={post.thumbnail || "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=600&q=80"} 
                                        alt={post.post_title} 
                                    />
                                    {/* BADGE CATEGORY - Chuẩn hóa hiển thị */}
                                    <div className="badge-category">
                                        {post.category === 'PHONG_TRO' ? 'Phòng trọ' : 
                                         post.category === 'CHUNG_CU' ? 'Chung cư' : 
                                         post.category === 'NHA_NGUYEN_CAN' ? 'Nguyên căn' : 'Ở ghép'}
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
                                    <h3 className="card-title-link" title={post.post_title}>
                                        {post.post_title}
                                    </h3>
                                    
                                    <div className="card-location">
                                        <FaMapMarkerAlt size={14} style={{flexShrink:0}}/>
                                        <span className="truncate">
                                            {post.post_district}, {post.post_city}
                                        </span>
                                    </div>

                                    <div className="card-amenities">
                                        <div className="amenity-item">
                                            <FaRulerCombined/> {post.post_area}m²
                                        </div>
                                        <div className="amenity-item">
                                            <FaBed/> {post.category === 'O_GHEP' ? 'Giường tầng' : '1 ngủ'}
                                        </div>
                                        {/* Hiển thị Free điện nếu giá điện = 0 */}
                                        {Number(post.price_electricity) === 0 && (
                                            <div className="amenity-item" style={{color:'#10b981'}}>
                                                <FaBolt/> Free điện
                                            </div>
                                        )}
                                        {/* Hiển thị Free nước nếu giá nước = 0 */}
                                        {Number(post.price_water) === 0 && (
                                            <div className="amenity-item" style={{color:'#0ea5e9'}}>
                                                <FaTint/> Free nước
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
                
                {/* EMPTY STATE */}
                {!loading && filteredPosts.length === 0 && (
                    <div style={{textAlign: 'center', padding: '60px 20px', color: '#64748b'}}>
                        <FaSearch size={40} color="#cbd5e1" style={{marginBottom:'15px'}}/>
                        <p style={{fontSize:'1rem', fontWeight:'600'}}>Không tìm thấy kết quả nào.</p>
                        <button 
                            style={{
                                color:'var(--fr-primary)', 
                                fontWeight:'700', 
                                border:'none', 
                                background:'none', 
                                cursor:'pointer',
                                marginTop: '10px'
                            }}
                            onClick={clearFilters}
                        >
                            Xóa bộ lọc
                        </button>
                    </div>
                )}
            </div>

            <RoomDetailModal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
                roomData={selectedRoom}
            />
        </div>
    );
};

export default FindRoomPage;