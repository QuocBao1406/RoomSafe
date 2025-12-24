import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, Toaster } from 'react-hot-toast';

// --- 1. IMPORT LEAFLET ---
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

import {
    FaMapMarkerAlt, FaBolt, FaTint, FaWifi, FaChevronRight,
    FaPhoneAlt, FaCommentDots, FaClock, FaExpandArrowsAlt,
    FaHome, FaExclamationTriangle, FaCheckCircle,
    FaImages, FaTimes, FaChevronLeft
} from 'react-icons/fa';
import '../css/RoomDetail.css';

// --- 2. FIX LỖI ICON MẶC ĐỊNH CỦA LEAFLET TRONG REACT ---
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const RoomDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);

    // --- STATE CHO LIGHTBOX ---
    const [isLightboxOpen, setIsLightboxOpen] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    // --- FETCH DATA ---
    useEffect(() => {
        const fetchDetail = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/posts/detail/${id}`);
                if (res.data && res.data.data) {
                    setPost(res.data.data);
                }
            } catch (error) {
                console.error("Lỗi fetch:", error);
                toast.error("Không tải được thông tin phòng!");
            } finally {
                setLoading(false);
            }
        };
        fetchDetail();
    }, [id]);

    // Bắt sự kiện bàn phím cho Lightbox
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (!isLightboxOpen) return;
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowRight') nextImage();
            if (e.key === 'ArrowLeft') prevImage();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isLightboxOpen]);

    if (loading) return <div style={{ padding: 50, textAlign: 'center' }}>Đang tải dữ liệu...</div>;
    if (!post) return <div style={{ padding: 50, textAlign: 'center' }}>Tin đăng không tồn tại.</div>;

    // --- XỬ LÝ DỮ LIỆU HIỂN THỊ ---
    const formatMoney = (val) => (!val || Number(val) === 0) ? "Miễn phí" : Number(val).toLocaleString('vi-VN');

    // Xử lý ảnh
    const placeholder = "https://via.placeholder.com/800x500?text=Dang+cap+nhat+anh";
    const rawImages = post.images && post.images.length > 0 ? post.images : [{ image_url: placeholder }];
    const totalImages = rawImages.length;

    // Lấy 3 ảnh đầu để hiển thị Grid
    const displayImages = rawImages.slice(0, 3);

    // Tên loại phòng
    const catName = {
        'PHONG_TRO': 'Phòng trọ',
        'CHUNG_CU': 'Chung cư',
        'NHA_NGUYEN_CAN': 'Nhà nguyên căn',
        'O_GHEP': 'Ở ghép'
    }[post.category] || 'Phòng cho thuê';

    // --- LOGIC LIGHTBOX ---
    const openLightbox = (index) => {
        setCurrentImageIndex(index);
        setIsLightboxOpen(true);
        document.body.style.overflow = 'hidden';
    };

    const closeLightbox = () => {
        setIsLightboxOpen(false);
        document.body.style.overflow = 'auto';
    };

    const nextImage = (e) => {
        if (e) e.stopPropagation();
        setCurrentImageIndex((prev) => (prev + 1) % totalImages);
    };

    const prevImage = (e) => {
        if (e) e.stopPropagation();
        setCurrentImageIndex((prev) => (prev - 1 + totalImages) % totalImages);
    };

    // Handleopenchat
    const handleOpenChat = () => {
        const userStr = localStorage.getItem("user");
        const userObj = userStr ? JSON.parse(userStr) : null;
        const token = userObj?.token;

        const CHAT_APP_URL = "http://localhost:3000";

        if (!token) {
            alert("Bạn cần đăng nhập để nhắn tin!");
            return;
        }

        // Mở tab mới kèm token trên URL
        window.open(`${CHAT_APP_URL}?token=${token}`, "_blank");
    };


    return (
        <div className="rd-wrapper">
            <Toaster position="top-center" />

            {/* --- LIGHTBOX COMPONENT --- */}
            {isLightboxOpen && (
                <div className="lightbox-overlay" onClick={closeLightbox}>
                    <button className="lb-close" onClick={closeLightbox}><FaTimes /> Đóng</button>

                    <div className="lightbox-content" onClick={e => e.stopPropagation()}>
                        <button className="lb-btn lb-prev" onClick={prevImage}><FaChevronLeft /></button>

                        <img
                            src={rawImages[currentImageIndex].image_url}
                            alt={`Slide ${currentImageIndex}`}
                            className="lightbox-img"
                        />

                        <button className="lb-btn lb-next" onClick={nextImage}><FaChevronRight /></button>

                        <div className="lb-counter">
                            Ảnh {currentImageIndex + 1} / {totalImages}
                        </div>
                    </div>
                </div>
            )}

            <div className="rd-container">
                {/* 1. BREADCRUMB */}
                <div className="rd-breadcrumb">
                    <span onClick={() => navigate('/')}>Trang chủ</span> <FaChevronRight size={10} />
                    <span onClick={() => navigate('/')}>Tìm phòng</span> <FaChevronRight size={10} />
                    <span className="active">{catName} tại {post.post_district}</span>
                </div>

                {/* 2. GALLERY GRID */}
                <div className="rd-gallery-container">
                    <div className={`gallery-grid grid-${displayImages.length >= 3 ? '3' : displayImages.length}`}>
                        {displayImages.map((img, index) => (
                            <img
                                key={index}
                                src={img.image_url}
                                alt={`Room ${index}`}
                                className="img-item"
                                onClick={() => openLightbox(index)}
                            />
                        ))}
                    </div>

                    <button className="btn-show-all" onClick={() => openLightbox(0)}>
                        <FaImages /> Xem tất cả {totalImages} ảnh
                    </button>
                </div>

                {/* 3. MAIN BODY */}
                <div className="rd-body">

                    {/* --- CỘT TRÁI --- */}
                    <div className="rd-left">
                        <div className="rd-header">
                            <h1>{post.post_title}</h1>
                            <div className="rd-address">
                                <FaMapMarkerAlt color="#ef4444" style={{ marginTop: 3, flexShrink: 0 }} />
                                <span>{post.post_address}, {post.post_ward}, {post.post_district}, {post.post_city}</span>
                            </div>
                        </div>

                        {/* Overview Stats */}
                        <div className="rd-overview">
                            <div className="rd-ov-item">
                                <span className="rd-ov-label"><FaExpandArrowsAlt /> Diện tích</span>
                                <span className="rd-ov-value">{post.post_area} m²</span>
                            </div>
                            <div className="rd-ov-item">
                                <span className="rd-ov-label"><FaHome /> Loại phòng</span>
                                <span className="rd-ov-value">{catName}</span>
                            </div>
                            <div className="rd-ov-item">
                                <span className="rd-ov-label"><FaCheckCircle /> Trạng thái</span>
                                <span className="rd-ov-value" style={{ color: post.status === 'AVAILABLE' ? '#00b98e' : 'red' }}>
                                    {post.status === 'AVAILABLE' ? 'Còn trống' : 'Đã thuê'}
                                </span>
                            </div>
                            <div className="rd-ov-item">
                                <span className="rd-ov-label"><FaClock /> Ngày đăng</span>
                                <span className="rd-ov-value">{new Date(post.created_at).toLocaleDateString('vi-VN')}</span>
                            </div>
                        </div>

                        {/* Mô tả */}
                        <div className="rd-section">
                            <h3>Thông tin mô tả</h3>
                            <div className="rd-desc-text">{post.post_description}</div>
                        </div>

                        {/* Bảng giá dịch vụ */}
                        <div className="rd-section">
                            <h3>Chi phí dịch vụ</h3>
                            <div className="rd-service-grid">
                                <div className="rd-service-card">
                                    <FaBolt size={24} color="#f59e0b" />
                                    <span className="rd-sv-price">{formatMoney(post.price_electricity)}</span>
                                    <span className="rd-sv-unit">{post.price_electricity > 0 ? 'đ / kwh' : 'Theo giá nhà nước'}</span>
                                </div>
                                <div className="rd-service-card">
                                    <FaTint size={24} color="#3b82f6" />
                                    <span className="rd-sv-price">{formatMoney(post.price_water)}</span>
                                    <span className="rd-sv-unit">{post.price_water > 0 ? 'đ / khối' : 'Theo giá nhà nước'}</span>
                                </div>
                                <div className="rd-service-card">
                                    <FaWifi size={24} color="#8b5cf6" />
                                    <span className="rd-sv-price">{formatMoney(post.price_internet)}</span>
                                    <span className="rd-sv-unit">{post.price_internet > 0 ? 'đ / tháng' : 'Đã bao gồm'}</span>
                                </div>
                            </div>
                        </div>

                        {/* --- KHU VỰC BẢN ĐỒ (NEW) --- */}
                        <div className="rd-section">
                            <h3>Vị trí</h3>

                            {/* Kiểm tra có tọa độ hay không để render Map */}
                            {post.post_latitude && post.post_longitude ? (
                                <div className="rd-map-box">
                                    <MapContainer
                                        center={[post.post_latitude, post.post_longitude]}
                                        zoom={15}
                                        scrollWheelZoom={false} // Tắt lăn chuột zoom để đỡ bị kẹt khi cuộn trang
                                        style={{ height: "100%", width: "100%" }}
                                    >
                                        <TileLayer
                                            attribution='&copy; <a href="https://carto.com/attributions">CARTO</a>'
                                            url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
                                        />
                                        <Marker position={[post.post_latitude, post.post_longitude]}>
                                            <Popup>
                                                <div style={{ fontWeight: '600', fontSize: '13px', color: '#333' }}>
                                                    {post.post_title}
                                                </div>
                                                <div style={{ fontSize: '11px', color: '#666' }}>
                                                    {post.post_address}
                                                </div>
                                            </Popup>
                                        </Marker>
                                    </MapContainer>
                                </div>
                            ) : (
                                // Fallback cho tin cũ chưa có tọa độ
                                <div className="rd-map-placeholder">
                                    <FaMapMarkerAlt size={40} style={{ marginBottom: 10 }} />
                                    <span>Bản đồ khu vực chưa được cập nhật</span>
                                    <span style={{ fontSize: 13, fontWeight: 400 }}>Vui lòng liên hệ chủ trọ để xem vị trí chính xác</span>
                                </div>
                            )}

                            {/* Địa chỉ text hiển thị bên dưới */}
                            <div style={{ marginTop: 15, display: 'flex', gap: 10, alignItems: 'center', color: '#475569' }}>
                                <FaMapMarkerAlt color="#ef4444" />
                                <span style={{ fontSize: '0.95rem' }}>{post.post_address}, {post.post_ward}, {post.post_district}, {post.post_city}</span>
                            </div>
                        </div>
                    </div>

                    {/* --- CỘT PHẢI (SIDEBAR) --- */}
                    <div className="rd-right">
                        <div className="rd-sidebar-inner">
                            <div className="rd-host-card">
                                <div className="rd-host-info">
                                    <img
                                        src={post.user?.user_avatar || "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
                                        alt="Host" className="rd-avatar"
                                    />
                                    <div>
                                        <div className="rd-host-name">{`${post.user?.user_last_name || ""} ${post.user?.user_first_name || ""}`.trim() || "Chủ trọ"}</div>
                                        <div style={{ fontSize: 13, color: '#888' }}>Đã tham gia: Mới đây</div>
                                    </div>
                                </div>

                                <div className="rd-price-display">
                                    {formatMoney(post.post_price)}
                                    <span>/tháng</span>
                                </div>

                                <button
                                    className="rd-btn-action btn-call"
                                    onClick={() => window.open(`tel:${post.user?.phone_number || ''}`)}
                                >
                                    <FaPhoneAlt /> {post.user?.user_phone || 'Hiện số điện thoại'}
                                </button>

                                <button onClick={handleOpenChat} className="rd-btn-action btn-zalo">
                                    <FaCommentDots size={18} /> Chat ngay
                                </button>
                            </div>

                            <div className="rd-safety-box">
                                <FaExclamationTriangle size={24} style={{ flexShrink: 0 }} />
                                <div>
                                    <strong>Lưu ý an toàn:</strong><br />
                                    Không đặt cọc khi chưa xem phòng trực tiếp. Kiểm tra kỹ hợp đồng trước khi ký.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RoomDetailPage;