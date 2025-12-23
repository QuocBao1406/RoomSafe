import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";
import axios from "axios";
import { 
    FaSearch, FaMapMarkerAlt, FaFilter, FaVenusMars, FaUserFriends, FaBriefcase, 
    FaClock, FaUndo, FaHeart, FaPaw, FaSmokingBan, FaMoon, FaGamepad, FaCheckCircle, FaThLarge, FaList
} from "react-icons/fa";
import roommateApi from "../services/roommateApi.js";
import "../css/RoommateList.css";

const RoommateListPage = () => {
    const navigate = useNavigate();
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [provinces, setProvinces] = useState([]);

    // --- STATES ---
    const [filters, setFilters] = useState({
        keyword: "", city: "", priceMin: "", priceMax: "",
        gender: "", career: "", ageMin: "", ageMax: "", habits: []
    });

    const HABIT_TAGS = [
        { label: "Sạch sẽ", icon: <FaHeart/> },
        { label: "Yên tĩnh", icon: <FaMoon/> },
        { label: "Ko hút thuốc", icon: <FaSmokingBan/> },
        { label: "Thú cưng", icon: <FaPaw/> },
        { label: "Game", icon: <FaGamepad/> },
        { label: "Ngủ sớm", icon: <FaClock/> }
    ];

    useEffect(() => {
        axios.get('https://esgoo.net/api-tinhthanh/1/0.htm')
            .then(res => { if(res.data.error === 0) setProvinces(res.data.data); });
    }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            const params = { ...filters, habits: filters.habits.join(',') };
            const res = await roommateApi.listPublic(params); 
            setItems(res.data.data || []);
        } catch (error) {
            console.error(error);
            toast.error("Lỗi tải dữ liệu");
        } finally { setLoading(false); }
    };

    useEffect(() => { fetchData(); }, []);

    // --- HANDLERS ---
    const handleSearch = () => fetchData();

    const toggleHabit = (tag) => {
        setFilters(prev => {
            const exists = prev.habits.includes(tag);
            return { ...prev, habits: exists ? prev.habits.filter(h => h !== tag) : [...prev.habits, tag] };
        });
    };

    const clearFilters = () => {
        setFilters({ keyword: "", city: "", priceMin: "", priceMax: "", gender: "", career: "", ageMin: "", ageMax: "", habits: [] });
        setTimeout(fetchData, 100);
    };

    const formatPrice = (price) => {
        if (!price) return "Thỏa thuận";
        if (price >= 1000000) return (price / 1000000).toFixed(1).replace('.0', '') + " tr/tháng";
        return (price / 1000).toFixed(0) + "k";
    };

    const timeAgo = (date) => {
        const seconds = Math.floor((new Date() - new Date(date)) / 1000);
        if (seconds < 86400) return "Mới đăng";
        return Math.floor(seconds/86400) + " ngày trước";
    };

    return (
        <div className="rl-wrapper">
            <Toaster position="top-center" />

            <div className="rl-container">
                
                {/* --- 1. SIDEBAR BỘ LỌC --- */}
                <aside className="rl-sidebar">
                    <div className="rl-filter-head">
                        <h3><FaFilter style={{color:'#4f46e5'}}/> Bộ lọc</h3>
                        <button className="rl-reset-btn" onClick={clearFilters}><FaUndo/> Xóa</button>
                    </div>

                    <div className="rl-group">
                        <label className="rl-label">Tìm theo từ khóa</label>
                        <input className="rl-input" placeholder="nhập tên đường..." value={filters.keyword} onChange={e => setFilters({...filters, keyword: e.target.value})}/>
                    </div>

                    <div className="rl-group">
                        <label className="rl-label">Khu vực</label>
                        <select className="rl-select" value={filters.city} onChange={e => setFilters({...filters, city: e.target.value})}>
                            <option value="">Toàn quốc</option>
                            {provinces.map(p => <option key={p.id} value={p.full_name}>{p.full_name}</option>)}
                        </select>
                    </div>

                    <div className="rl-group">
                        <label className="rl-label">Bạn cùng phòng</label>
                        <div className="rl-toggle-group">
                            {['', 'MALE', 'FEMALE'].map(g => (
                                <div 
                                    key={g} 
                                    className={`rl-toggle-item ${filters.gender === g ? 'active' : ''}`}
                                    onClick={() => setFilters({...filters, gender: g})}
                                >
                                    {g === '' ? 'Tất cả' : g === 'MALE' ? 'Nam' : 'Nữ'}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="rl-group">
                        <label className="rl-label">Khoảng giá (VNĐ)</label>
                        <div className="rl-range-row">
                            <input className="rl-input" type="number" placeholder="Min" value={filters.priceMin} onChange={e => setFilters({...filters, priceMin: e.target.value})}/>
                            <span>-</span>
                            <input className="rl-input" type="number" placeholder="Max" value={filters.priceMax} onChange={e => setFilters({...filters, priceMax: e.target.value})}/>
                        </div>
                    </div>

                    <div className="rl-group">
                        <label className="rl-label">Tiện ích / Thói quen</label>
                        <div className="rl-tags">
                            {HABIT_TAGS.map((tag, idx) => (
                                <div 
                                    key={idx} 
                                    className={`rl-chip ${filters.habits.includes(tag.label) ? 'active' : ''}`}
                                    onClick={() => toggleHabit(tag.label)}
                                >
                                    {tag.icon} {tag.label}
                                </div>
                            ))}
                        </div>
                    </div>

                    <button className="rl-btn-apply" onClick={fetchData}>Áp dụng</button>
                </aside>

                {/* --- 2. MAIN CONTENT --- */}
                <main className="rl-main">
                    
                    {/* SORT BAR - Thanh công cụ lấp khoảng trống */}
                    <div className="rl-sort-bar">
                        <div className="rl-sb-left">
                            <span className="rl-result-count">Tìm thấy <b>{items.length}</b> tin đăng</span>
                        </div>
                        <div className="rl-sb-right">
                            <select className="rl-sort-select">
                                <option>Mới nhất</option>
                                <option>Giá thấp đến cao</option>
                                <option>Giá cao đến thấp</option>
                            </select>
                            <div className="rl-view-mode">
                                <div className="rl-vm-btn active"><FaThLarge/></div>
                                <div className="rl-vm-btn"><FaList/></div>
                            </div>
                        </div>
                    </div>

                    {/* GRID */}
                    {loading ? (
                        <div style={{textAlign:'center', padding:50}}>Đang tải dữ liệu...</div>
                    ) : items.length === 0 ? (
                        <div style={{textAlign:'center', padding:50, background:'white', borderRadius:16}}>
                            <p style={{color:'#64748b'}}>Chưa có tin đăng phù hợp.</p>
                        </div>
                    ) : (
                        <div className="rl-grid">
                            {items.map(item => {
                                const details = item.roommate_details || {};
                                const image = item.images?.[0]?.image_url || "https://via.placeholder.com/400x300?text=RoomSafe";

                                return (
                                    <div key={item.post_id} className="rl-card" onClick={() => navigate(`/roommate/${item.post_id}`)}>
                                        
                                        {/* IMAGE */}
                                        <div className="rl-card-thumb">
                                            <img src={image} alt={item.post_title} />
                                            {/* Nút thả tim giả */}
                                            <div className="rl-btn-heart" onClick={(e) => {e.stopPropagation(); toast.success("Đã lưu tin!")}}>
                                                <FaHeart/>
                                            </div>
                                            <div className="rl-price-badge">{formatPrice(item.post_price)}</div>
                                        </div>
                                        
                                        {/* BODY */}
                                        <div className="rl-card-body">
                                            <h3 className="rl-card-title">{item.post_title}</h3>
                                            
                                            <div className="rl-card-meta">
                                                <FaMapMarkerAlt style={{color:'#64748b'}}/> 
                                                <span className="truncate">{item.post_address}, {item.post_ward},{item.post_district}, {item.post_city}</span>
                                            </div>

                                            {/* TAGS NỔI BẬT */}
                                            <div className="rl-tags-row">
                                                <span className="rl-tag gender">
                                                    <FaVenusMars/> {details.gender_partner === 'MALE' ? 'Tìm Nam' : details.gender_partner === 'FEMALE' ? 'Tìm Nữ' : 'Nam/Nữ'}
                                                </span>
                                                {(details.age_range_min || details.age_range_max) && (
                                                    <span className="rl-tag age">
                                                        <FaUserFriends/> {details.age_range_min}-{details.age_range_max}t
                                                    </span>
                                                )}
                                                {details.career && (
                                                    <span className="rl-tag job">
                                                        <FaBriefcase/> {details.career === 'SINH_VIEN' ? 'Sinh viên' : 'Đi làm'}
                                                    </span>
                                                )}
                                            </div>
                                        </div>

                                        {/* FOOTER */}
                                        <div className="rl-card-foot">
                                            <div className="rl-user">
                                                <img className="rl-avatar" src="https://cdn-icons-png.flaticon.com/512/149/149071.png" alt="user"/>
                                                <span>Người đăng</span>
                                                <FaCheckCircle className="rl-verified" title="Đã xác thực"/>
                                            </div>
                                            <span className="rl-time"><FaClock style={{marginRight:4}}/> {timeAgo(item.created_at)}</span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
};

export default RoommateListPage;