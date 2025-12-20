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
        const estimatedRevenue = posts.filter(p => p.status === 'RENTED').reduce((sum, p) => sum + (p.post_price || 0), 0);
        const potentialRevenue = posts.reduce((sum, p) => sum + (p.post_price || 0), 0);
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
            default: return <span className="status-pill hidden">Ẩn</span>;
        }
    };

    return (
        <div className="dashboard-wrapper">
            <div className="dashboard-container">

                <div className="dashboard-header">
                    <div className="welcome-text">
                        <h1>Xin chào, {user?.name}!</h1>
                        <p>Đây là tổng quan tình hình kinh doanh hôm nay.</p>
                    </div>
                    <div className="date-badge">
                        <FaCalendarAlt />
                        {new Date().toLocaleDateString('vi-VN', { weekday: 'long', day: 'numeric', month: 'numeric' })}
                    </div>
                </div>

                <div className="stats-grid">
                    <div className="stat-card revenue">
                        <div className="card-top">
                            <div className="stat-icon-box"><FaWallet /></div>
                            <span className="stat-change">
                                {stats.potentialRevenue ? Math.round((stats.estimatedRevenue/stats.potentialRevenue)*100) : 0}% đạt được
                            </span>
                        </div>
                        <div className="stat-main">
                            <div className="stat-value">{formatMoney(stats.estimatedRevenue)}</div>
                            <div className="stat-label">Doanh thu thực tế / tháng</div>
                        </div>
                    </div>

                    <div className="stat-card occupancy">
                        <div className="card-top">
                            <div className="stat-icon-box"><FaChartPie /></div>
                            <span className="stat-change">{stats.rented}/{stats.total} phòng</span>
                        </div>
                        <div className="stat-main">
                            <div className="stat-value">{stats.occupancyRate}%</div>
                            <div className="stat-label">Tỉ lệ lấp đầy</div>
                            <div className="progress-container">
                                <div className="progress-bar" style={{width: `${stats.occupancyRate}%`}}></div>
                            </div>
                        </div>
                    </div>

                    <div className="stat-card rooms">
                        <div className="card-top">
                            <div className="stat-icon-box"><FaHome /></div>
                        </div>
                        <div className="stat-main">
                            <div className="stat-value">{stats.total}</div>
                            <div className="stat-label">Tổng số phòng quản lý</div>
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
                            <table className="modern-table">
                                <thead>
                                    <tr>
                                        <th style={{width: '50%'}}>Phòng / Địa chỉ</th>
                                        <th>Giá thuê</th>
                                        <th>Trạng thái</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {recentPosts.length > 0 ? recentPosts.map(post => (
                                        <tr key={post.post_id} onClick={() => navigate('/manage-post')} style={{cursor:'pointer'}}>
                                            <td>
                                                <div className="post-cell">
                                                    {/* Ảnh Thumbnail nhỏ */}
                                                    {post.thumbnail ? 
                                                        <img src={post.thumbnail} alt="" className="mini-thumb" /> :
                                                        <div className="mini-thumb" style={{display:'flex',alignItems:'center', justifyContent:'center', background:'#f1f5f9'}}><FaImage style={{color:'#cbd5e1'}}/></div>
                                                    }
                                                    <div className="post-info">
                                                        <h4>{post.post_title}</h4>
                                                        <span>{new Date(post.created_at).toLocaleDateString('vi-VN')}</span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="price-cell">
                                                {formatMoney(post.post_price)}
                                            </td>
                                            <td>{renderStatusPill(post.status)}</td>
                                        </tr>
                                    )) : (
                                        <tr><td colSpan="3" style={{textAlign: 'center', padding: '30px', color: '#94a3b8'}}>Chưa có tin đăng nào</td></tr>
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
                                <span className="analysis-label">Doanh thu tối đa</span>
                                <span className="analysis-value">{formatMoney(stats.potentialRevenue)}</span>
                            </div>
                            <div className="analysis-item">
                                <span className="analysis-label">Giá trung bình</span>
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
                            <div style={{fontWeight: '700', fontSize:'1.1rem', marginBottom:'5px'}}>Thêm khách thuê?</div>
                            <div style={{fontSize:'0.9rem', opacity:0.9}}>Đăng tin mới để lấp đầy phòng trống ngay.</div>
                            <button className="cta-btn" onClick={() => navigate('/post-room')}>
                                + Đăng tin mới
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default DashboardPage;