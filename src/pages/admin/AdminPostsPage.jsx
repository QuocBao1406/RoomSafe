import React, { useEffect, useState, useContext } from "react";
import { toast, Toaster } from "react-hot-toast";
import AdminLayout from "../../components/admin/AdminLayout.jsx";
import adminApi from "../../services/adminApi.js";
import { UserContext } from "../../contexts/UserContext.jsx";
import { useNavigate } from "react-router-dom";
import { 
    FaSearch, FaTrash, FaEye, FaMapMarkerAlt, FaHome, FaUserFriends, FaEyeSlash 
} from "react-icons/fa";
import "../../css/AdminPosts.css"; // CSS Mới

const AdminPostsPage = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [activeTab, setActiveTab] = useState("RENTAL"); // RENTAL hoặc ROOMMATE
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  // Load tất cả bài đăng
  const loadPosts = async () => {
    try {
      setLoading(true);
      if (!user?.token) return;
      
      const res = await adminApi.listPosts(user.token);
      const allPosts = res.data.data || [];
      
      setPosts(allPosts);
      filterData(allPosts, activeTab, search);
      
    } catch (error) {
      toast.error("Không tải được danh sách bài đăng");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!user || user.role !== "ADMIN") { navigate("/login"); return; }
    loadPosts();
  }, [user]);

  // Logic lọc dữ liệu
  const filterData = (data, tab, keyword) => {
    let result = data;

    // 1. Lọc theo Tab (Loại tin)
    if (tab === "RENTAL") {
        result = result.filter(p => p.category !== 'O_GHEP');
    } else {
        result = result.filter(p => p.category === 'O_GHEP');
    }

    // 2. Lọc theo Search
    if (keyword) {
        const lower = keyword.toLowerCase();
        result = result.filter(p => 
            (p.title && p.title.toLowerCase().includes(lower)) ||
            (p.author && p.author.toLowerCase().includes(lower))
        );
    }

    setFilteredPosts(result);
  };

  // Khi search hoặc tab thay đổi
  useEffect(() => {
    filterData(posts, activeTab, search);
  }, [search, activeTab, posts]);

  // Hành động: Xóa
  const deletePost = async (id) => {
    if (!window.confirm("Xóa bài đăng này? Hành động không thể hoàn tác.")) return;
    try {
      await adminApi.deletePost(id, user.token);
      toast.success("Đã xóa bài đăng");
      setPosts(prev => prev.filter(p => p.post_id !== id));
    } catch (error) { toast.error("Xóa thất bại"); }
  };

  // Hành động: Ẩn/Hiện
  const toggleStatus = async (post) => {
      try {
          const newStatus = post.status === 'AVAILABLE' ? 'HIDDEN' : 'AVAILABLE';
          await adminApi.updatePostStatus(post.post_id, newStatus, user.token);
          
          setPosts(prev => prev.map(p => 
              p.post_id === post.post_id ? { ...p, status: newStatus } : p
          ));
          toast.success(`Đã chuyển sang: ${newStatus}`);
      } catch (error) { toast.error("Lỗi cập nhật trạng thái"); }
  };

  const formatPrice = (val) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(val || 0);
  const formatDate = (val) => val ? new Date(val).toLocaleDateString('vi-VN') : "-";

  // Đếm số lượng cho Badge
  const countRental = posts.filter(p => p.category !== 'O_GHEP').length;
  const countRoommate = posts.filter(p => p.category === 'O_GHEP').length;

  return (
    <AdminLayout>
      <Toaster position="top-center" />
      <div className="ap-container">
        {/* TABS */}
        <div className="ap-tabs">
            <button 
                className={`ap-tab ${activeTab === 'RENTAL' ? 'active' : ''}`}
                onClick={() => setActiveTab('RENTAL')}
            >
                <FaHome/> Tin Cho thuê 
                <span className="ap-count-badge">{countRental}</span>
            </button>
            <button 
                className={`ap-tab ${activeTab === 'ROOMMATE' ? 'active' : ''}`}
                onClick={() => setActiveTab('ROOMMATE')}
            >
                <FaUserFriends/> Tin Tìm bạn
                <span className="ap-count-badge">{countRoommate}</span>
            </button>
        </div>

        {/* TOOLBAR */}
        <div className="ap-toolbar">
            <div className="ap-search-box">
                <FaSearch className="ap-search-icon"/>
                <input 
                    className="ap-search-input" 
                    placeholder="Tìm theo tiêu đề, người đăng..." 
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                />
            </div>
        </div>

        {/* TABLE */}
        <div className="ap-card">
            <table className="ap-table">
                <thead>
                    <tr>
                        <th width="40%">Thông tin bài đăng</th>
                        <th>Giá & Ngày tạo</th>
                        <th>Người đăng</th>
                        <th>Trạng thái</th>
                        <th>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredPosts.map(p => (
                        <tr key={p.post_id}>
                            <td>
                                <div className="ap-main-cell">
                                    <img 
                                        src={p.thumbnail || "https://via.placeholder.com/150?text=No+Img"} 
                                        className="ap-thumb" alt="thumb"
                                    />
                                    <div className="ap-info">
                                        <div className="ap-post-title" title={p.title}>{p.title}</div>
                                        <div className="ap-post-addr">
                                            <FaMapMarkerAlt size={10}/> {p.district}, {p.city}
                                        </div>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div className="ap-price">{formatPrice(p.price)}</div>
                                <div className="ap-sub-text">{formatDate(p.created_at)}</div>
                            </td>
                            <td>
                                <div style={{fontWeight:600, fontSize:13}}>{p.author}</div>
                                <div className="ap-sub-text">{p.author_email}</div>
                            </td>
                            <td>
                                <span className={`ap-badge status-${(p.status || "").toLowerCase()}`}>
                                    {p.status === 'AVAILABLE' ? 'Hiển thị' : 
                                     p.status === 'HIDDEN' ? 'Đã ẩn' : 
                                     p.status === 'RENTED' ? 'Đã thuê' : p.status}
                                </span>
                            </td>
                            <td>
                                <div className="ap-actions">
                                    <button 
                                        className="ap-btn-icon btn-toggle" 
                                        title={p.status === 'AVAILABLE' ? "Ẩn tin" : "Hiện tin"}
                                        onClick={() => toggleStatus(p)}
                                    >
                                        {p.status === 'AVAILABLE' ? <FaEyeSlash/> : <FaEye/>}
                                    </button>
                                    <button 
                                        className="ap-btn-icon btn-del" 
                                        title="Xóa vĩnh viễn"
                                        onClick={() => deletePost(p.post_id)}
                                    >
                                        <FaTrash/>
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                    {filteredPosts.length === 0 && (
                        <tr><td colSpan="5" style={{textAlign:'center', padding:30, color:'#94a3b8'}}>Không có tin đăng nào</td></tr>
                    )}
                </tbody>
            </table>
        </div>

      </div>
    </AdminLayout>
  );
};

export default AdminPostsPage;