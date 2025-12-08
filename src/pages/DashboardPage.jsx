import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../contexts/UserContext.jsx';
import { useNavigate } from 'react-router-dom';
import { FaHome, FaWallet, FaChartPie, FaCalendarAlt, FaArrowRight } from 'react-icons/fa';
import '../css/DashboardPage.css';

const DashboardPage = () => {
    const { user } = useContext(UserContext);
    const navigate = useNavigate();
    
    // State lưu trữ các chỉ số thống kê
    const [stats, setStats] = useState({
        total: 0,
        rented: 0,
        occupancyRate: 0,
        estimatedRevenue: 0, // Doanh thu hiện tại (từ phòng đã thuê)
        potentialRevenue: 0, // Doanh thu tiềm năng (nếu full phòng)
        avgPrice: 0          // Giá trung bình
    });

    // State lưu danh sách bài mới nhất
    const [recentPosts, setRecentPosts] = useState([]);

    // Helper: Định dạng tiền tệ (VNĐ)
    const formatMoney = (amount) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
    };

    // Helper: Tính toán số liệu từ danh sách bài đăng tải về
    const calculateStats = (posts) => {
        const total = posts.length;
        if (total === 0) return;

        // 1. Đếm số phòng đã thuê (dựa trên status RENTED)
        const rented = posts.filter(p => p.status === 'RENTED').length;
        
        // 2. Tính tỉ lệ lấp đầy (%)
        const occupancyRate = Math.round((rented / total) * 100);

        // 3. Tính toán tài chính
        // - estimatedRevenue: Cộng tổng tiền các phòng ĐÃ THUÊ
        const estimatedRevenue = posts
            .filter(p => p.status === 'RENTED')
            .reduce((sum, p) => sum + (p.post_price || 0), 0);
            
        // - potentialRevenue: Cộng tổng tiền TẤT CẢ các phòng (Max doanh thu)
        const potentialRevenue = posts.reduce((sum, p) => sum + (p.post_price || 0), 0);

        // - avgPrice: Giá trung bình 1 phòng
        const avgPrice = Math.round(potentialRevenue / total);

        setStats({ total, rented, occupancyRate, estimatedRevenue, potentialRevenue, avgPrice });
    };

    // Gọi API khi component được load
    useEffect(() => {
        const fetchData = async () => {
            if (!user || !user.id) return;
            try {
                // Gọi API lấy toàn bộ bài đăng của user
                const res = await axios.get(`http://localhost:5000/api/posts/user/${user.id}`);
                const data = res.data.data || [];
                
                // Tính toán số liệu
                calculateStats(data);
                
                // Lấy 5 bài đăng mới nhất (sắp xếp theo ngày tạo)
                const sortedPosts = [...data].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
                setRecentPosts(sortedPosts.slice(0, 5));
            } catch (error) {
                console.error("Lỗi tải dashboard:", error);
            }
        };
        fetchData();
    }, [user]);

    // Helper: Render trạng thái với style đẹp
    const renderStatus = (status) => {
        switch(status) {
            case 'AVAILABLE': return <span style={{padding:'4px 10px', borderRadius:'20px', background:'#dcfce7', color:'#166534', fontSize:'12px', fontWeight:'bold'}}>Còn trống</span>;
            case 'RENTED': return <span style={{padding:'4px 10px', borderRadius:'20px', background:'#f3f4f6', color:'#374151', fontSize:'12px', fontWeight:'bold'}}>Đã thuê</span>;
            case 'HIDDEN': return <span style={{padding:'4px 10px', borderRadius:'20px', background:'#ffedd5', color:'#c2410c', fontSize:'12px', fontWeight:'bold'}}>Đang ẩn</span>;
            default: return <span>{status}</span>;
        }
    };

    return (
        <div className="dashboard-wrapper">
            {/* 1. Header Chào Mừng */}
            <div className="dashboard-header">
                <div className="welcome-text">
                    <h1>Tổng quan hoạt động</h1>
                    <p>Chào {user?.name}, chúc bạn một ngày kinh doanh hiệu quả!</p>
                </div>
                <div className="date-badge">
                    <FaCalendarAlt style={{color: '#6b7280'}} />
                    {new Date().toLocaleDateString('vi-VN', { weekday: 'long', day: 'numeric', month: 'numeric', year: 'numeric' })}
                </div>
            </div>

            {/* 2. Grid Thống Kê (3 Thẻ - 3 Màu riêng biệt) */}
            <div className="stats-grid">
                
                {/* Card 1: Doanh thu (Màu Xanh Lá - card-green) */}
                <div className="stat-card card-green">
                    <div className="card-top">
                        <div className="stat-icon-wrapper">
                            <FaWallet />
                        </div>
                        {/* % Doanh thu đạt được so với tiềm năng */}
                        <span className="highlight-text">
                            {stats.potentialRevenue ? Math.round((stats.estimatedRevenue/stats.potentialRevenue)*100) : 0}% đạt được
                        </span>
                    </div>
                    <div className="stat-value">
                        {formatMoney(stats.estimatedRevenue)}
                    </div>
                    <div className="stat-label">Doanh thu thực tế / tháng</div>
                </div>

                {/* Card 2: Tỉ lệ lấp đầy (Màu Xanh Dương - card-blue) */}
                <div className="stat-card card-blue">
                    <div className="card-top">
                        <div className="stat-icon-wrapper">
                            <FaChartPie />
                        </div>
                        <span className="highlight-text">
                            {stats.rented} / {stats.total} phòng
                        </span>
                    </div>
                    <div className="stat-value">{stats.occupancyRate}%</div>
                    <div className="stat-label">Tỉ lệ lấp đầy</div>
                    {/* Thanh Progress Bar */}
                    <div className="progress-bg">
                        <div className="progress-fill" style={{width: `${stats.occupancyRate}%`}}></div>
                    </div>
                </div>

                {/* Card 3: Tổng phòng (Màu Cam - card-orange) */}
                <div className="stat-card card-orange">
                    <div className="card-top">
                        <div className="stat-icon-wrapper">
                            <FaHome />
                        </div>
                    </div>
                    <div className="stat-value">{stats.total}</div>
                    <div className="stat-label">Tổng số phòng quản lý</div>
                </div>
            </div>

            {/* 3. Nội dung Chi tiết (Chia cột 2 bên) */}
            <div className="dashboard-content">
                
                {/* Cột Trái: Bảng tin mới nhất */}
                <div className="section-card">
                    <div className="section-header">
                        <div className="section-title">Tin đăng gần đây</div>
                        <button className="btn-view-all" onClick={() => navigate('/manage-post')}>
                            Xem tất cả <FaArrowRight style={{marginLeft: '5px', fontSize: '10px'}}/>
                        </button>
                    </div>

                    <table className="modern-table">
                        <thead>
                            <tr>
                                <th>Phòng / Tiêu đề</th>
                                <th>Giá thuê</th>
                                <th>Trạng thái</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recentPosts.length > 0 ? recentPosts.map(post => (
                                <tr key={post.post_id}>
                                    <td>
                                        <div style={{fontWeight: '600', color: '#1f2937'}}>{post.post_title}</div>
                                        <div style={{fontSize: '12px', color: '#9ca3af', marginTop: '2px'}}>
                                            {new Date(post.created_at).toLocaleDateString('vi-VN')}
                                        </div>
                                    </td>
                                    <td style={{fontWeight: 'bold', color: '#4f46e5'}}>
                                        {formatMoney(post.post_price)}
                                    </td>
                                    <td>{renderStatus(post.status)}</td>
                                </tr>
                            )) : (
                                <tr><td colSpan="3" style={{textAlign: 'center', color: '#999', padding: '20px'}}>Chưa có tin nào</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Cột Phải: Thông tin phân tích bổ sung */}
                <div className="section-card">
                    <div className="section-header">
                        <div className="section-title">Phân tích nhanh</div>
                    </div>
                    
                    <div className="info-row">
                        <span className="info-label">Doanh thu tiềm năng (Max)</span>
                        <span className="info-val">{formatMoney(stats.potentialRevenue)}</span>
                    </div>
                    <div className="info-row">
                        <span className="info-label">Giá thuê trung bình</span>
                        <span className="info-val">{formatMoney(stats.avgPrice)}</span>
                    </div>
                    <div className="info-row">
                        <span className="info-label">Phòng còn trống</span>
                        <span className="info-val" style={{color: '#f59e0b'}}>
                            {stats.total - stats.rented} phòng
                        </span>
                    </div>
                    
                    {/* Banner nút hành động */}
                    <div style={{marginTop: '25px', background: 'linear-gradient(135deg, #6366f1, #a855f7)', padding: '20px', borderRadius: '12px', color: 'white', textAlign: 'center'}}>
                        <h4 style={{margin: '0 0 5px 0', fontSize: '16px'}}>Cần thêm khách thuê?</h4>
                        <p style={{margin: '0 0 15px 0', fontSize: '13px', opacity: 0.9}}>Đăng tin mới ngay để lấp đầy phòng trống.</p>
                        <button 
                            onClick={() => navigate('/post-room')}
                            style={{padding: '10px 20px', background: 'white', color: '#6366f1', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', width: '100%'}}
                        >
                            + Đăng tin mới
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default DashboardPage;