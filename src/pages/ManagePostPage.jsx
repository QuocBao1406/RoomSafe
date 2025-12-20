import React, {useEffect, useState, useContext} from 'react';
import axios from 'axios';
import { UserContext } from '../contexts/UserContext.jsx';
import { useNavigate } from 'react-router-dom';
import { FaEdit, FaTrash, FaEye, FaClock, FaMapMarkedAlt, FaBed, FaRulerCombined, FaHistory, FaCheckCircle, FaLayerGroup, FaPlus, FaExpandArrowsAlt, FaMapMarkerAlt } from 'react-icons/fa';
import '../css/ManagePostPage.css';
import { toast, Toaster } from 'react-hot-toast';
import RoomDetailModal from '../components/RoomDetailModal.jsx';

const ManagePostPage = () => {
    const { user } = useContext(UserContext);
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedRoom, setSelectedRoom] = useState(null);

    const stats = {
        total: posts.length,
        rented: posts.filter(p => p.status === 'RENTED').length,
        available: posts.filter(p => p.status === 'AVAILABLE').length,
    }

    const getCategoryName = (cat) => {
        const map = {'PHONG_TRO': 'Phòng trọ', 'CHUNG_CU': 'Chung cư', 'NHA_NGUYEN_CAN': 'Nhà nguyên căn'};
        return map[cat] || 'Phòng trọ';
    }

    const handleToggleStatus = async (post) => {
        const newStatus = post.status === 'RENTED' ? 'AVAILABLE' : 'RENTED';
        const confirmMsg = newStatus === 'RENTED'
        ? "Xác nhận phòng này đã có khách thuê?"
        : "Xác nhận phòng này hiện còn trống?";

        if(!window.confirm(confirmMsg)) return;

        try {
            await axios.put(`http://localhost:5000/api/posts/update-status/${post.post_id}`, {status: newStatus});
            setPosts(prev => prev.map(p => p.post_id === post.post_id ? { ...p, status: newStatus } : p));
            toast.success("Đã cập nhật tình trạng phòng!");
        } catch (error) {
            toast.error("Lỗi cập nhật");
        }
    }

    const handleViewRoom = (post) => {
        const fmt = (price) => {
            if (price === null || price === undefined || price === 0) return "Miễn phí";
            return new Intl.NumberFormat('vi-VN', {style: 'currency', currency: 'VND'}).format(price);
        }

        const modalData = {
            id: post.post_id,
            title: post.post_title,
            price: formatPrice(post.post_price),
            category: post.category,
            address: `${post.post_address}, ${post.post_ward}, ${post.post_district}, ${post.post_city}`,
            area: post.post_area,
            image: post.thumbnail,
            images: post.images || [],
            description: post.post_description || "Chưa có mô tả chi tiết",

            elecPrice: post.price_electricity ? `${fmt(post.price_electricity)} / kwh` : "Miễn phí",
            waterPrice: post.price_water ? `${fmt(post.price_water)} / khối` : "Miễn phí",
            internetPrice: post.price_internet ? `${fmt(post.price_internet)} / tháng` : "Miễn phí",

            status: post.status,
            created_at: post.created_at,
            expired_at: post.expired_at,
        };

        setSelectedRoom(modalData);
        setIsModalOpen(true);
    }

    const formatPrice = (price) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
    };

    const getStatusLabel = (status) => {
        switch(status) {
            case 'AVAILABLE': return <span className="badge badge-success">Đang hiển thị</span>
            case 'RENTED': return <span className="badge badge-secondery">Đã thuê</span>
            case 'HIDDEN': return <span className="badge badge-warning">Đang ẩn</span>
            default: return <span className="badge badge-default">{status}</span>
        }
    };

    const getDaysLeft = (expiredDate) => {
        if (!expiredDate) return "Vô thời hạn";
        const today = new Date();
        const end = new Date(expiredDate);
        const diffTime = end - today;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays < 0) return "Đã hết hạn";
        return `${diffDays} ngày nữa`
    };

    const handleDelete = async (postId) => {
        if(window.confirm("Bạn có chắc chắn muốn xóa tin này?")) {
            try {
                await axios.delete(`http://localhost:5000/api/posts/delete/${postId}`);

                toast.success("Xóa thành công!");

                setPosts(prevPosts => prevPosts.filter(post => post.post_id !== postId));
            } catch (error) {
                console.error("Lỗi xóa bài:", error);
                toast.error("Xóa thất bại: " + (error.response?.data?.message || "Lỗi server"));
            }
        }
    }

    useEffect(() => {
        const fetchMyPost = async () => {
            if (!user || !user.id) return;

            try {
                // goi API lay bai dang cua user hien tai
                const res = await axios.get(`http://localhost:5000/api/posts/user/${user.id}`);
                
                setPosts(res.data.data);
            } catch (error) {
                console.error("Lỗi tải bài đăng:", error);
                toast.error("Không thể tải danh sách bài viết");
            } finally {
                setLoading(false);
            }
        }

        fetchMyPost();
    }, [user]);

    if (loading) return <div className="loading-container"><span  className="loader"></span></div>

    return (
        <div className="manage-page-wrapper">
            <Toaster position="top-center" />
            <div className="manage-container">

                <div className="manage-header">
                    <div className="header-left">
                        <div className="header-title">
                            <h1>Quản lý phòng trọ</h1>
                        </div>
                    </div>

                    <div className="header-stats">
                        <div className="stat-item" title="Tổng số tin">
                                <FaLayerGroup size={14}/> 
                                <span>Tổng: <strong>{stats.total}</strong></span>
                            </div>
                            
                            <span className="stat-divider"></span>
                            
                            <div className="stat-item" title="Đang hiển thị">
                                <FaCheckCircle size={14}/> 
                                <span>Trống: <strong>{stats.available}</strong></span>
                            </div>

                            <span className="stat-divider"></span>

                            <div className="stat-item" title="Đã cho thuê">
                                <FaHistory size={14}/> 
                                <span>Đã thuê: <strong>{stats.rented}</strong></span>
                            </div>
                    </div>

                    <button className="btn-create-compact" onClick={() => navigate('/post-room')}>
                        <FaPlus style={{color: '#2563eb'}} /> Đăng tin mới
                    </button>
                </div>

                {posts.length === 0 ? (
                    <div className="empty-state" style={{textAlign:'center', padding:60, background:'white', borderRadius:16, border:'1px dashed #cbd5e1'}}>
                        <img src="https://cdn-icons-png.flaticon.com/512/7486/7486744.png" width="80" alt="empty" style={{opacity:0.5, marginBottom: 15}}/>
                        <h3 style={{color:'#1e293b', margin:'0 0 8px 0'}}>Chưa có tin đăng nào</h3>
                        <p style={{color:'#64748b', margin:'0 0 20px 0'}}>Đăng tin ngay để tiếp cận hàng ngàn người thuê.</p>
                        <button className="btn-create-compact" style={{margin:'0 auto', background:'#2563eb', color:'white'}} onClick={() => navigate('/post-room')}>Đăng ngay</button>
                    </div>
                ) : (
                    <div className="post-grid">
                        {posts.map((post) => (
                            <div key={post.post_id} className={`post-card ${post.status === 'RENTED' ? 'is-rented' : ''}`}>
                                <div className="card-thumb" onClick={() => handleViewRoom(post)}>
                                    <img
                                        src={post.thumbnail || "https://via.placeholder.com/400x300?text=RoomSafe" }
                                        alt={post.post_title}
                                        style={post.status === 'RENTED' ? {filter: 'grayscale(100%', opacity: 0.8} : {}}
                                    />
                                    <div className={`status-badge-on-img ${post.status === 'RENTED' ? 'rented' : 'available'}`}>
                                        {post.status === 'RENTED' ? 'Đã chốt' : 'Còn trống'}
                                    </div>
                                </div>

                                <div className="card-body">
                                    <div className="card-top-row">
                                        <span className="category-text">{getCategoryName(post.category)}</span>
                                        <span>{new Date(post.created_at).toLocaleDateString('vi-VN')}</span>
                                    </div>

                                    <h3 className="post-title" title={post.post_title} onClick={() => handleViewRoom(post)}>{post.post_title}</h3>
                                    
                                    <div className="specs-row">
                                        <span className="price-text">{formatPrice(post.post_price)}/tháng</span>
                                        <span className="area-text">
                                            <FaExpandArrowsAlt size={10} /> {post.post_area} m²
                                        </span>
                                    </div>

                                    <div className="address-row">
                                        <FaMapMarkerAlt style={{color:'#64748b', marginTop: 3, flexShrink: 0}}/>
                                        <span className="address-text" title={`${post.post_address}, ${post.post_ward}, ${post.post_district}, ${post.post_city}`}>
                                            {`${post.post_address}, ${post.post_ward}, ${post.post_district}, ${post.post_city}`}
                                        </span>

                                    </div>
                                </div>

                                <div className="card-footer">
                                    <div className={`status-toggle ${post.status === 'RENTED' ? 'rented' : 'available'}`} onClick={() => handleToggleStatus(post)}>
                                        <div className="toggle-dot"></div>
                                        <span className="status-label">
                                            {post.status === 'RENTED' ? 'Đã cho thuê' : 'Còn trống'}
                                        </span>
                                    </div>

                                    <div style={{display: 'flex', gap: 8}}>
                                        <button 
                                            className="action-btn-small" 
                                            title="Sửa tin"
                                            onClick={() => navigate(`/edit-room/${post.post_id}`)}
                                        >
                                            <FaEdit /> Sửa
                                        </button>
                                        <button
                                            className="action-btn-small"
                                            title="Xóa tin"
                                            onClick={() => handleDelete(post.post_id)}
                                        >
                                            <FaTrash /> Xóa
                                        </button>
                                    </div>
                                </div>
                            </div> 
                        ))}
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
}

export default ManagePostPage;