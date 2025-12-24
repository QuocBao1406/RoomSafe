import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../contexts/UserContext.jsx';
import { useNavigate } from 'react-router-dom';
import { FaWallet, FaChartPie, FaHome, FaCalendarAlt, FaArrowRight, FaImage } from 'react-icons/fa';
import '../css/DashboardPage.css';

const DashboardPage = () => {
    const { user } = useContext(UserContext);
    const navigate = useNavigate();

    const [stats, setStats] = useState({
        total: 0,
        rented: 0,
        occupancyRate: 0,
        estimatedRevenue: 0,
        potentialRevenue: 0,
        avgPrice: 0
    });
    const [recentPosts, setRecentPosts] = useState([]);

    const formatMoney = (amount) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);

    const calculateStats = (posts) => {
        const total = posts.length;
        if (total === 0) return;
        
        const rented = posts.filter(p => p.status === 'RENTED').length;
        const occupancyRate = Math.round((rented / total) * 100);
        
        // Tính toán doanh thu
        const estimatedRevenue = posts.filter(p => p.status === 'RENTED').reduce((sum, p) => sum + (p.post_price || p.price || 0), 0);
        const potentialRevenue = posts.reduce((sum, p) => sum + (p.post_price || p.price || 0), 0);
        const avgPrice = Math.round(potentialRevenue / total);
        
        setStats({ total, rented, occupancyRate, estimatedRevenue, potentialRevenue, avgPrice });
    };

    useEffect(() => {
        const fetchData = async () => {
            if (!user || !user.id) return;
            try {
                const res = await axios.get(`http://localhost:5000/api/posts/user/${user.id}`);
                const data = res.data.data || [];
                calculateStats(data);
                const sortedPosts = [...data].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
                setRecentPosts(sortedPosts.slice(0, 5));
            } catch (error) { console.error("Lỗi tải dashboard:", error); }
        };
        fetchData();
    }, [user]);

    const renderStatusPill = (status) => {
        switch(status) {
            case 'AVAILABLE': return <span className="status-pill available">Còn trống</span>;
            case 'RENTED': return <span className="status-pill rented">Đã thuê</span>;
            default: return <span className="status-pill hidden">Ẩn / Khóa</span>;
        }
    };

    return (
        <div className="dashboard-wrapper">
            <div className="dashboard-container">

                <div className="dashboard-header">
                    <div className="welcome-text">
                        <h1>Xin chào, {user?.name || user?.full_name || "Bạn"}! 👋</h1>
                        <p>Dưới đây là tổng quan tình hình kinh doanh của bạn hôm nay.</p>
                    </div>
                    <div className="date-badge">
                        <FaCalendarAlt />
                        {new Date().toLocaleDateString('vi-VN', { weekday: 'long', day: 'numeric', month: 'numeric', year: 'numeric' })}
                    </div>
                </div>

                <div className="db-stats-grid">
                    {/* CARD 1: DOANH THU */}
                    <div className="db-stat-card revenue">
                        <div className="card-header-flex">
                            <div className="stat-label">Doanh thu tháng</div>
                            <div className="stat-icon-box"><FaWallet /></div>
                        </div>
                        <div className="stat-main">
                            <div className="db-stat-value">{formatMoney(stats.estimatedRevenue)}</div>
                        </div>
                        <div className="card-footer-info">
                            <span className="stat-change-badge">
                                {stats.potentialRevenue ? Math.round((stats.estimatedRevenue/stats.potentialRevenue)*100) : 0}%
                            </span>
                            <span className="sub-text">so với mục tiêu</span>
                        </div>
                    </div>

                    {/* CARD 2: TỈ LỆ LẤP ĐẦY */}
                    <div className="db-stat-card occupancy">
                        <div className="card-header-flex">
                            <div className="stat-label">Tỉ lệ lấp đầy</div>
                            <div className="stat-icon-box"><FaChartPie /></div>
                        </div>
                        <div className="stat-main">
                            <div className="db-stat-value">{stats.occupancyRate}%</div>
                        </div>
                        <div className="progress-container">
                            <div className="progress-bar" style={{width: `${stats.occupancyRate}%`}}></div>
                        </div>
                        <div style={{marginTop: '8px', fontSize: '0.8rem', color: '#64748b'}}>
                            Đang cho thuê <b>{stats.rented}</b> / {stats.total} phòng
                        </div>
                    </div>

                    {/* CARD 3: TỔNG SỐ PHÒNG */}
                    <div className="db-stat-card rooms">
                        <div className="card-header-flex">
                            <div className="stat-label">Tổng bài đăng</div>
                            <div className="stat-icon-box"><FaHome /></div>
                        </div>
                        <div className="stat-main">
                            <div className="db-stat-value">{stats.total}</div>
                        </div>
                         <div className="card-footer-info">
                            <span className="sub-text">Tin đăng đang hiển thị</span>
                        </div>
                    </div>
                </div>

                <div className="dashboard-content">
                    <div className="section-card">
                        <div className="section-header">
                            <div className="section-title">Tin đăng mới nhất</div>
                            <button className="btn-link" onClick={() => navigate('/manage-post')}>
                                Xem tất cả <FaArrowRight />
                            </button>
                        </div>
                        
                        <div className="table-responsive">
                            <table className="db-modern-table">
                                <thead>
                                    <tr>
                                        <th>Thông tin phòng</th>
                                        <th>Giá thuê</th>
                                        <th>Trạng thái</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {recentPosts.length > 0 ? recentPosts.map(post => (
                                        <tr key={post.post_id} onClick={() => navigate('/manage-post')}>
                                            <td>
                                                <div className="db-post-cell">
                                                    {post.thumbnail ? 
                                                        <img src={post.thumbnail} alt="" className="mini-thumb" /> :
                                                        <div className="mini-thumb" style={{display:'flex',alignItems:'center', justifyContent:'center', background:'#f1f5f9', borderRadius:'10px'}}><FaImage style={{color:'#cbd5e1'}}/></div>
                                                    }
                                                    <div className="post-info">
                                                        <h4>{post.post_title || post.title || "Tin chưa đặt tên"}</h4>
                                                        <span>{post.post_address || post.address || "Địa chỉ đang cập nhật"}</span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="db-price-cell">
                                                {formatMoney(post.post_price || post.price || 0)}
                                            </td>
                                            <td>{renderStatusPill(post.status)}</td>
                                        </tr>
                                    )) : (
                                        <tr><td colSpan="3" style={{textAlign: 'center', padding: '40px', color: '#94a3b8'}}>Chưa có bài đăng nào.</td></tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="section-card">
                        <div className="section-header">
                            <div className="section-title">Phân tích nhanh</div>
                        </div>
                        
                        <div className="sidebar-content">
                            <div className="analysis-item">
                                <span className="analysis-label">Doanh thu tiềm năng</span>
                                <span className="analysis-value">{formatMoney(stats.potentialRevenue)}</span>
                            </div>
                            <div className="analysis-item">
                                <span className="analysis-label">Giá thuê trung bình</span>
                                <span className="analysis-value">{formatMoney(stats.avgPrice)}</span>
                            </div>
                            <div className="analysis-item">
                                <span className="analysis-label">Phòng còn trống</span>
                                <span className="analysis-value" style={{color: '#f59e0b'}}>
                                    {stats.total - stats.rented} phòng
                                </span>
                            </div>
                        </div>

                        <div className="cta-banner">
                            <div style={{fontWeight: '800', fontSize:'1.2rem', marginBottom:'8px'}}>Tăng thu nhập ngay</div>
                            <div style={{fontSize:'0.9rem', opacity:0.95, marginBottom:'20px', lineHeight:'1.4'}}>Đăng thêm phòng mới để tiếp cận hàng ngàn khách hàng tiềm năng.</div>
                            <button className="cta-btn" onClick={() => navigate('/post-room')}>
                                + Đăng tin ngay
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;