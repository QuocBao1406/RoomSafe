import React, { useEffect, useState, useContext } from "react";
import adminApi from "../../services/adminApi.js";
import AdminLayout from "../../components/admin/AdminLayout.jsx";
import { UserContext } from "../../contexts/UserContext.jsx";
import { useNavigate } from "react-router-dom";
import { 
    FaUsers, FaHome, FaHandshake, FaArrowRight, FaCalendarAlt, FaShieldAlt
} from "react-icons/fa";
import "../../css/AdminDashboard.css"; 

const AdminDashboardPage = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  
  const [data, setData] = useState({ users: [], posts: [] });
  const [loading, setLoading] = useState(true);

  // Tính toán số liệu
  const stats = {
    totalUsers: data.users.length,
    rentals: data.posts.filter(p => p.category !== 'O_GHEP').length,
    roommates: data.posts.filter(p => p.category === 'O_GHEP').length,
  };

  const recentUsers = data.users.slice(0, 5);
  const recentPosts = data.posts.slice(0, 5);

  useEffect(() => {
    const token = user?.token || localStorage.getItem('token');
    
    if (!token || user?.role !== "ADMIN") {
      navigate("/login");
      return;
    }

    const load = async () => {
      try {
        setLoading(true);
        const [u, p] = await Promise.all([
            adminApi.listUsers(token), 
            adminApi.listPosts(token)
        ]);
        
        setData({
            users: u.data.data || [],
            posts: p.data.data || []
        });
      } catch (error) {
        console.error("Lỗi tải dashboard:", error);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [user, navigate]);

  const formatDate = (dateString) => {
      if(!dateString) return "N/A";
      return new Date(dateString).toLocaleDateString('vi-VN');
  };

  const formatMoney = (val) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(val || 0);

  const renderRoleBadge = (role) => {
      if (role === 'ADMIN') return <span className="db-role-badge admin">Quản trị viên</span>;
      if (role === 'LANDLORD') return <span className="db-role-badge landlord">Chủ trọ</span>;
      return <span className="db-role-badge tenant">Người tìm trọ</span>;
  };

  return (
    <AdminLayout>
      <div className="db-container">
        
        {/* HEADER */}
        <div className="db-header">
            <div>
                <h1 className="db-title">Tổng quan hoạt động hệ thống RoomSafe</h1>
            </div>
            <div className="db-date-badge">
                <FaCalendarAlt className="icon-cal"/> 
                <span>{new Date().toLocaleDateString('vi-VN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
            </div>
        </div>

        {/* 1. STATS CARDS */}
        <div className="db-stats-grid">
            <div className="db-card stat-card border-blue">
                <div className="stat-icon-wrapper gradient-blue"><FaUsers /></div>
                <div className="stat-content">
                    <span className="stat-label">Tổng Thành viên</span>
                    <h3 className="stat-value">{loading ? "..." : stats.totalUsers}</h3>
                    <p className="stat-desc">Tài khoản trong hệ thống</p>
                </div>
            </div>

            <div className="db-card stat-card border-green">
                <div className="stat-icon-wrapper gradient-green"><FaHome /></div>
                <div className="stat-content">
                    <span className="stat-label">Tin Cho thuê</span>
                    <h3 className="stat-value">{loading ? "..." : stats.rentals}</h3>
                    <p className="stat-desc">Phòng trọ & Căn hộ</p>
                </div>
            </div>

            <div className="db-card stat-card border-orange">
                <div className="stat-icon-wrapper gradient-orange"><FaHandshake /></div>
                <div className="stat-content">
                    <span className="stat-label">Tin Tìm bạn</span>
                    <h3 className="stat-value">{loading ? "..." : stats.roommates}</h3>
                    <p className="stat-desc">Bài đăng tìm ở ghép</p>
                </div>
            </div>
        </div>

        {/* 2. MAIN CONTENT */}
        <div className="db-content-grid">
            
            {/* CỘT TRÁI: TIN ĐĂNG */}
            <div className="db-card content-card">
                <div className="card-header">
                    <h3>Tin đăng mới nhất</h3>
                    <button className="btn-link" onClick={() => navigate('/admin/posts')}>
                        Xem tất cả <FaArrowRight/>
                    </button>
                </div>
                <div className="table-responsive">
                    <table className="db-table">
                        <thead>
                            <tr>
                                <th width="40%">Tiêu đề & Người đăng</th>
                                <th>Giá thuê</th>
                                <th>Loại tin</th>
                                <th>Ngày đăng</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recentPosts.map(post => (
                                <tr key={post.post_id || post.id}>
                                    <td>
                                        <div className="post-cell">
                                            <span className="post-title" title={post.post_title || post.title}>
                                                {post.post_title || post.title || "Tiêu đề trống"} 
                                            </span>
                                            <span className="post-author">
                                                By: {post.author || `${post.user?.user_first_name || ""} ${post.user?.user_last_name || ""}`.trim() || "Ẩn danh"}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="price-text">{formatMoney(post.post_price || post.price)}</td>
                                    <td>
                                        <span className={`db-cat-badge ${post.category === 'O_GHEP' ? 'roommate' : 'rental'}`}>
                                            {post.category === 'O_GHEP' ? 'Tìm bạn' : 'Cho thuê'}
                                        </span>
                                    </td>
                                    <td className="date-text">{formatDate(post.created_at)}</td>
                                </tr>
                            ))}
                            {!loading && recentPosts.length === 0 && (
                                <tr><td colSpan="4" className="text-center">Chưa có tin đăng nào.</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* CỘT PHẢI: USER (ĐÃ SỬA CLASS ẢNH) */}
            <div className="db-card content-card">
                <div className="card-header">
                    <h3>Thành viên mới</h3>
                    <button className="btn-link" onClick={() => navigate('/admin/users')}>
                        Xem tất cả <FaArrowRight/>
                    </button>
                </div>
                <div className="db-user-list">
                    {recentUsers.map(u => (
                        <div key={u.user_id || u.id} className="db-user-item">
                            <div className="db-user-avatar-box">
                                {/* THÊM CLASS NÀY ĐỂ KHỐNG CHẾ SIZE ẢNH */}
                                <img 
                                    className="db-user-avatar-img" 
                                    src={u.user_avatar || u.avatar || "https://cdn-icons-png.flaticon.com/512/149/149071.png"} 
                                    alt="avt" 
                                />
                                {(u.user_role === 'ADMIN' || u.role === 'ADMIN') && <div className="db-admin-icon"><FaShieldAlt/></div>}
                            </div>
                            
                            <div className="db-user-info">
                                <div className="db-user-name">
                                    {`${u.user_first_name || ""} ${u.user_last_name || ""}`.trim() || "Chưa đặt tên"}
                                </div>
                                <div className="db-user-email">
                                    {u.user_email || u.email}
                                </div>
                            </div>
                            
                            {renderRoleBadge(u.user_role || u.role)}
                        </div>
                    ))}
                    {!loading && recentUsers.length === 0 && (
                        <div className="text-center p-4">Chưa có thành viên nào.</div>
                    )}
                </div>
            </div>

        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboardPage;