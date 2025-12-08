import React, {useEffect, useState, useContext} from 'react';
import axios from 'axios';
import { UserContext } from '../contexts/UserContext.jsx';
import { useNavigate } from 'react-router-dom';
import { FaEdit, FaTrash, FaEye, FaClock, FaMapMarkedAlt, FaBed, FaRulerCombined } from 'react-icons/fa';
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
                    <div>
                        <h1>Quản lý phòng trọ</h1>
                        <p>Xem và quản lý các phòng trọ bạn đang cho thuê</p>
                    </div>
                    <button className="btn-create-new" onClick={() => navigate('/post-room')}>
                        + Đăng tin mới
                    </button>
                </div>

                {(!Array.isArray(posts)) || posts.length === 0 ? (
                    <div className="empty-state">
                        <img src="https://cdn-icons-png.flaticon.com/512/4076/4076432.png" alt="Empty" />
                        <p>Bạn chưa có tin đăng nào</p>
                        <button className="btn-create-new" onClick={() => navigate('/post-room')}>Đăng ngay</button>
                    </div>
                ) : (
                    <div className="post-grid">
                        {posts.map((post) => (
                            <div key={post.post_id} className="post-card">
                                <div className="card-thumb">
                                    <img
                                        src={post.thumbnail || "https://via.placeholder.com/300x200?text=No+Image" }
                                        alt={post.post_title}
                                    />
                                    <div className="card-overlay-top">
                                        {getStatusLabel(post.status)}
                                    </div>
                                    <div className="card-overlay-bottom">
                                        <span className="price-tag">{formatPrice(post.post_price)}/tháng</span>
                                    </div>
                                </div>

                                <div className="card-body">
                                    <h3 className="post-title" title={post.post_title}>{post.post_title}</h3>
                                    
                                    <div className="post-meta">
                                        <div className="meta-row">
                                            <FaMapMarkedAlt className="icon" />
                                            <span>
                                                {post.post_address}, {post.post_ward}, {post.post_city}
                                            </span>
                                        </div>

                                        <div className="meta-row specs">
                                            <span><FaRulerCombined className="icon" />{post.post_area}</span>

                                            <span className={`expired-date ${new Date(post.expired_at)} < new Date() ? 'expired' : ''}`}>
                                                <FaClock className="icon" />
                                                {post.expired_at ? new Date(post.expired_at).toLocaleDateString('vi-VN') : "Vô thời hạn"}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="card-footer">
                                    <button 
                                        className="btn-action btn-view" 
                                        title="Xem chi tiết"
                                        onClick={() => handleViewRoom(post)}
                                    >
                                        <FaEye /> Xem
                                    </button>
                                    <button 
                                        className="btn-action btn-edit" 
                                        title="Sửa tin"
                                        onClick={() => navigate(`/edit-room/${post.post_id}`)}
                                    >
                                        <FaEdit /> Sửa
                                    </button>
                                    <button
                                        className="btn-action btn-delete"
                                        title="Xóa tin"
                                        onClick={() => handleDelete(post.post_id)}
                                    >
                                        <FaTrash /> Xóa
                                    </button>
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