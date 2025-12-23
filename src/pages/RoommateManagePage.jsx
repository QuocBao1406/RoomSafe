import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";
import { FaTrash, FaEdit, FaPlus, FaMapMarkerAlt, FaClock, FaVenusMars, FaUserFriends, FaEye, FaEyeSlash, FaLayerGroup, FaCheckCircle, FaBriefcase } from "react-icons/fa";
import roommateApi from "../services/roommateApi.js"; 
import { UserContext } from "../contexts/UserContext.jsx";
import "../css/RoommateManage.css"; // Style mới

const RoommateManagePage = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // Tính toán thống kê
  const stats = {
      total: items.length,
      active: items.filter(i => i.status === 'AVAILABLE').length,
      found: items.filter(i => i.status === 'HIDDEN' || i.status === 'RENTED').length
  };

  // Format tiền
  const formatPrice = (price) => 
    new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(price || 0);

  // Tính ngày còn lại
  const getDaysLeft = (dateString) => {
    if (!dateString) return null;
    const today = new Date();
    const expiry = new Date(dateString);
    const diffTime = expiry - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  // Load dữ liệu
  useEffect(() => {
    const fetchMine = async () => {
      const token = localStorage.getItem('token');
      if (!user || !token) {
        setLoading(false);
        return;
      }
      try {
        const res = await roommateApi.mine(user.id, token);
        setItems(res.data.data || []);
      } catch (error) {
        console.error(error);
        toast.error("Không tải được danh sách tin");
      } finally {
        setLoading(false);
      }
    };
    fetchMine();
  }, [user]);

  // Xử lý Xóa
  const handleDelete = async (id) => {
    if (!window.confirm("Bạn có chắc muốn xóa tin này không?")) return;
    try {
      const token = localStorage.getItem('token');
      await roommateApi.remove(id, token);
      setItems((prev) => prev.filter((p) => p.post_id !== id));
      toast.success("Đã xóa tin đăng");
    } catch (error) {
      toast.error(error.response?.data?.message || "Lỗi xóa tin");
    }
  };

  // Xử lý Ẩn/Hiện (Tìm thấy / Đang tìm)
  const handleToggleStatus = async (item) => {
    try {
      const token = localStorage.getItem('token');
      // Logic: Nếu đang AVAILABLE thì chuyển sang HIDDEN (Đã tìm thấy) và ngược lại
      const newStatus = item.status === 'AVAILABLE' ? 'HIDDEN' : 'AVAILABLE';
      
      await roommateApi.updateStatus(item.post_id, newStatus, token);
      
      setItems((prev) => prev.map((p) => (p.post_id === item.post_id ? { ...p, status: newStatus } : p)));
      toast.success(newStatus === 'AVAILABLE' ? "Đã bật hiển thị tin" : "Đã ẩn tin (Đã tìm được)");
    } catch (error) {
      toast.error("Lỗi cập nhật trạng thái");
    }
  };

  if (loading) return <div className="rm-wrapper" style={{alignItems:'center'}}>Đang tải dữ liệu...</div>;

  return (
    <div className="rm-wrapper">
      <Toaster position="top-center" />
      
      <div className="rm-container">
        {/* HEADER */}
        <div className="rm-header">
            <div>
                <div className="rm-header-title">
                    <h1>Quản lý tìm bạn ở ghép</h1>
                    <p>Theo dõi và quản lý các bài đăng tìm bạn của bạn</p>
                </div>
                <div style={{marginTop: 15}} className="rm-stats">
                    <div className="rm-stat-item"><FaLayerGroup/> Tổng: <strong>{stats.total}</strong></div>
                    <div className="rm-stat-item"><FaCheckCircle/> Đang tìm: <strong>{stats.active}</strong></div>
                    <div className="rm-stat-item"><FaUserFriends/> Đã tìm được: <strong>{stats.found}</strong></div>
                </div>
            </div>
            
            <button className="rm-btn-create" onClick={() => navigate("/roommate/post")}>
                <FaPlus /> Đăng tin mới
            </button>
        </div>

        {/* EMPTY STATE */}
        {items.length === 0 ? (
            <div style={{textAlign:'center', padding: 60, background:'white', borderRadius:16, border:'1px dashed #cbd5e1'}}>
                <img src="https://cdn-icons-png.flaticon.com/512/7486/7486744.png" width="80" alt="empty" style={{opacity:0.5, marginBottom:15}}/>
                <h3 style={{color:'#64748b'}}>Bạn chưa có tin đăng nào</h3>
                <button className="rm-btn-create" style={{margin:'20px auto', background:'#4f46e5', color:'white'}} onClick={() => navigate("/roommate/post")}>
                    Đăng tin ngay
                </button>
            </div>
        ) : (
            <div className="rm-grid">
            {items.map((item) => {
                const daysLeft = getDaysLeft(item.expired_at);
                const isExpired = daysLeft !== null && daysLeft < 0;
                // Lấy thông tin chi tiết từ bảng phụ
                const details = item.roommate_details || {}; 
                const image = (item.images && item.images.length > 0) ? item.images[0].image_url : "https://via.placeholder.com/400x300?text=RoomSafe";

                return (
                <div key={item.post_id} className="rm-card">
                    {/* THUMBNAIL */}
                    <div className="rm-thumb">
                        <img src={image} alt={item.post_title} style={item.status !== 'AVAILABLE' ? {filter:'grayscale(100%)'} : {}} />
                        
                        <div className={`rm-badge-status ${item.status === 'AVAILABLE' ? 'active' : 'hidden'}`}>
                            {item.status === 'AVAILABLE' ? 'Đang hiển thị' : 'Đã ẩn / Tìm được'}
                        </div>

                        {daysLeft !== null && (
                            <div className={`rm-badge-expiry ${isExpired ? 'expired' : ''}`}>
                                <FaClock size={10}/> {isExpired ? "Hết hạn" : `${daysLeft} ngày`}
                            </div>
                        )}
                    </div>

                    {/* BODY */}
                    <div className="rm-body">
                        <h3 className="rm-title" title={item.post_title}>{item.post_title}</h3>
                        <div className="rm-price">{formatPrice(item.post_price)} / tháng</div>
                        
                        <div className="rm-info-row">
                            <FaMapMarkerAlt size={12}/> 
                            <span className="truncate">{item.post_district}, {item.post_city}</span>
                        </div>

                        {/* ROOMMATE TAGS (Giới tính, Tuổi, Nghề nghiệp) */}
                        <div className="rm-tags">
                            <div className="rm-tag gender">
                                <FaVenusMars/> 
                                {details.gender_partner === 'MALE' ? 'Tìm Nam' : 
                                 details.gender_partner === 'FEMALE' ? 'Tìm Nữ' : 'Nam/Nữ'}
                            </div>
                            
                            {(details.age_range_min || details.age_range_max) && (
                                <div className="rm-tag age">
                                    <FaUserFriends/> 
                                    {details.age_range_min || '..'} - {details.age_range_max || '..'} tuổi
                                </div>
                            )}

                            {details.career && (
                                <div className="rm-tag" style={{background:'#f3f4f6', color:'#4b5563'}}>
                                    <FaBriefcase/> 
                                    {details.career === 'SINH_VIEN' ? 'Sinh viên' : 'Người đi làm'}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* FOOTER ACTIONS */}
                    <div className="rm-footer">
                        <div 
                            className={`rm-toggle ${item.status === 'AVAILABLE' ? 'active' : 'hidden'}`}
                            onClick={() => handleToggleStatus(item)}
                            title="Bấm để Ẩn/Hiện tin"
                        >
                            <div className="rm-dot"></div>
                            <span>{item.status === 'AVAILABLE' ? 'Đang tìm' : 'Đã tìm được'}</span>
                        </div>

                        <div className="rm-actions">
                            <button className="rm-btn-icon" title="Sửa tin" onClick={() => navigate(`/roommate/edit/${item.post_id}`)}>
                                <FaEdit />
                            </button>
                            <button className="rm-btn-icon delete" title="Xóa tin" onClick={() => handleDelete(item.post_id)}>
                                <FaTrash />
                            </button>
                        </div>
                    </div>
                </div>
                );
            })}
            </div>
        )}
      </div>
    </div>
  );
};

export default RoommateManagePage;