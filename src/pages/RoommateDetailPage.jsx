import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";
import roommateApi from "../services/roommateApi.js";
import { 
    FaMapMarkerAlt, FaBolt, FaTint, FaWifi, FaChevronRight, 
    FaPhoneAlt, FaCommentDots, FaExpandArrowsAlt, 
    FaExclamationTriangle, FaImages, FaTimes, FaChevronLeft, 
    FaVenusMars, FaBriefcase, FaHeart, FaGamepad, FaHandHoldingUsd, FaUserCircle,
    FaCalendarAlt, FaClock, FaCheckCircle
} from 'react-icons/fa';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

import '../css/RoommateDetail.css'; 

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const RoommateDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);

    // --- LIGHTBOX STATE ---
    const [isLightboxOpen, setIsLightboxOpen] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    // --- HELPER ---
    const formatMoney = (val) => (!val || Number(val) === 0) ? "Thỏa thuận" : Number(val).toLocaleString('vi-VN');
    const formatDate = (date) => date ? new Date(date).toLocaleDateString('vi-VN') : "...";

    // Tính ngày còn lại
    const getDaysLeft = (expiredDate) => {
        if (!expiredDate) return { text: "Vô thời hạn", color: "#64748b" };
        const end = new Date(expiredDate);
        const now = new Date();
        const diff = Math.ceil((end - now) / (1000 * 60 * 60 * 24));
        if (diff < 0) return { text: "Đã hết hạn", color: "#ef4444" };
        return { text: `Còn ${diff} ngày`, color: "#16a34a" };
    };

    // --- FETCH DATA ---
    useEffect(() => {
        const load = async () => {
            try {
                setLoading(true);
                const res = await roommateApi.detail(id);
                if(res.data && res.data.data) {
                    setPost(res.data.data);
                }
            } catch (error) {
                console.error(error);
                toast.error("Không tìm thấy bài viết");
            } finally {
                setLoading(false);
            }
        };
        load();
    }, [id]);

    // Keyboard event cho Lightbox
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

    if (loading) return <div style={{padding: 50, textAlign:'center'}}>Đang tải dữ liệu...</div>;
    if (!post) return <div style={{padding: 50, textAlign:'center'}}>Tin đăng không tồn tại.</div>;

    // --- XỬ LÝ ẢNH ---
    const placeholder = "https://via.placeholder.com/800x500?text=RoomSafe+Roommate";
    let rawImages = [];
    if (Array.isArray(post.photos) && post.photos.length > 0) {
        rawImages = post.photos.map(url => ({ image_url: url }));
    } else {
        rawImages = [{ image_url: placeholder }];
    }
    const totalImages = rawImages.length;
    const displayImages = rawImages.slice(0, 3);

    // --- LIGHTBOX ACTIONS ---
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
        if(e) e.stopPropagation();
        setCurrentImageIndex((prev) => (prev + 1) % totalImages);
    };
    const prevImage = (e) => {
        if(e) e.stopPropagation();
        setCurrentImageIndex((prev) => (prev - 1 + totalImages) % totalImages);
    };

    // --- LABELS MAPPING ---
    const genderLabel = { 'MALE': "Nam", 'FEMALE': "Nữ", 'ANY': "Nam/Nữ (Tùy ý)" };
    const careerLabel = { 'SINH_VIEN': "Sinh viên", 'DA_DI_LAM': "Người đi làm" };
    const daysLeft = getDaysLeft(post.expired_at);

    return (
        <div className="rmd-wrapper">
            <Toaster position="top-center"/>
            
            {/* LIGHTBOX POPUP */}
            {isLightboxOpen && (
                <div className="rmd-lightbox" onClick={closeLightbox}>
                    <button className="rmd-lb-close" onClick={closeLightbox}><FaTimes/> Đóng</button>
                    <button className="rmd-lb-btn rmd-lb-prev" onClick={prevImage}><FaChevronLeft/></button>
                    <img src={rawImages[currentImageIndex].image_url} alt="Slide" className="rmd-lb-img" onClick={e => e.stopPropagation()}/>
                    <button className="rmd-lb-btn rmd-lb-next" onClick={nextImage}><FaChevronRight/></button>
                </div>
            )}

            <div className="rmd-container">
                {/* 1. BREADCRUMB */}
                <div className="rmd-breadcrumb">
                    <span onClick={() => navigate('/')}>Trang chủ</span> <FaChevronRight size={10}/>
                    <span onClick={() => navigate('/roommate/list')}>Tìm bạn ở ghép</span> <FaChevronRight size={10}/>
                    <span className="active">{post.district}, {post.city}</span>
                </div>

                {/* 2. GALLERY */}
                <div className="rmd-gallery-box">
                    <div className={`rmd-grid rmd-grid-${displayImages.length >= 3 ? '3' : displayImages.length}`}>
                        {displayImages.map((img, index) => (
                            <img key={index} src={img.image_url} alt={`Room ${index}`} className="rmd-img" onClick={() => openLightbox(index)}/>
                        ))}
                    </div>
                    <button className="rmd-btn-show-all" onClick={() => openLightbox(0)}>
                        <FaImages /> Xem tất cả {totalImages} ảnh
                    </button>
                </div>

                {/* 3. MAIN BODY */}
                <div className="rmd-body">
                    
                    {/* CỘT TRÁI */}
                    <div className="rmd-left">
                        <div className="rmd-header">
                            <h1>{post.title}</h1>
                            
                            {/* HIỂN THỊ ĐỊA CHỈ ĐẦY ĐỦ */}
                            <div className="rmd-address">
                                <FaMapMarkerAlt color="#ef4444" style={{marginTop: 3, flexShrink: 0}}/>
                                <span>{post.full_address}</span>
                            </div>
                        </div>

                        {/* OVERVIEW STATS */}
                        <div className="rmd-overview">
                            <div className="rmd-ov-item">
                                <span className="rmd-ov-label"><FaVenusMars/> Tìm giới tính</span>
                                <span className="rmd-ov-val" style={{color: '#6366f1'}}>
                                    {genderLabel[post.gender_preference] || "Tất cả"}
                                </span>
                            </div>
                            <div className="rmd-ov-item">
                                <span className="rmd-ov-label"><FaUserCircle/> Độ tuổi</span>
                                <span className="rmd-ov-val">
                                    {post.age_min && post.age_max ? `${post.age_min} - ${post.age_max} tuổi` : "Thỏa thuận"}
                                </span>
                            </div>
                            <div className="rmd-ov-item">
                                <span className="rmd-ov-label"><FaBriefcase/> Nghề nghiệp</span>
                                <span className="rmd-ov-val">{careerLabel[post.career] || "Tự do"}</span>
                            </div>
                            <div className="rmd-ov-item">
                                <span className="rmd-ov-label"><FaExpandArrowsAlt/> Diện tích</span>
                                <span className="rmd-ov-val">{post.area ? `${post.area} m²` : "??"}</span>
                            </div>
                        </div>

                        {/* MÔ TẢ CHI TIẾT */}
                        <div className="rmd-section">
                            <h3>Mô tả chi tiết</h3>
                            <div className="rmd-text">{post.description}</div>
                        </div>

                        {/* THÔNG TIN LỐI SỐNG (Hiển thị đầy đủ từ Schema RoommateDetails) */}
                        <div className="rmd-section">
                            <h3>Yêu cầu & Lối sống</h3>
                            <div className="rmd-lifestyle-grid">
                                <div className="rmd-ls-item">
                                    <div className="rmd-ls-icon-box"><FaHeart color="#ef4444" size={20}/></div>
                                    <div className="rmd-ls-content">
                                        <strong>Thói quen sinh hoạt</strong>
                                        <p>{post.habits || "Chưa cập nhật thông tin thói quen."}</p>
                                    </div>
                                </div>

                                <div className="rmd-ls-item">
                                    <div className="rmd-ls-icon-box"><FaGamepad color="#8b5cf6" size={20}/></div>
                                    <div className="rmd-ls-content">
                                        <strong>Sở thích cá nhân</strong>
                                        <p>{post.hobbies || "Chưa cập nhật sở thích."}</p>
                                    </div>
                                </div>

                                <div className="rmd-ls-item">
                                    <div className="rmd-ls-icon-box"><FaHandHoldingUsd color="#10b981" size={20}/></div>
                                    <div className="rmd-ls-content">
                                        <strong>Chia sẻ chi phí</strong>
                                        <p>{post.shared_cost || "Thỏa thuận trực tiếp."}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* CHI PHÍ DỊCH VỤ */}
                        {(post.price_electricity || post.price_water || post.price_internet) && (
                            <div className="rmd-section">
                                <h3>Chi phí dịch vụ (Dự kiến)</h3>
                                <div className="rmd-sv-grid">
                                    <div className="rmd-sv-card">
                                        <FaBolt size={24} color="#f59e0b"/>
                                        <span className="rmd-sv-price">{formatMoney(post.price_electricity)}</span>
                                        <span className="rmd-sv-unit">đ/số</span>
                                    </div>
                                    <div className="rmd-sv-card">
                                        <FaTint size={24} color="#3b82f6"/>
                                        <span className="rmd-sv-price">{formatMoney(post.price_water)}</span>
                                        <span className="rmd-sv-unit">đ/khối</span>
                                    </div>
                                    <div className="rmd-sv-card">
                                        <FaWifi size={24} color="#8b5cf6"/>
                                        <span className="rmd-sv-price">{formatMoney(post.price_internet)}</span>
                                        <span className="rmd-sv-unit">đ/tháng</span>
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className="rmd-section">
                            <h3>Vị trí</h3>
                            {post.latitude && post.longitude ? (
                                <div className="rmd-map-box">
                                    <MapContainer 
                                        center={[post.latitude, post.longitude]} 
                                        zoom={15} 
                                        scrollWheelZoom={false}
                                        style={{ height: "100%", width: "100%" }}
                                    >
                                        <TileLayer
                                            attribution='&copy; CARTO'
                                            url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
                                        />
                                        <Marker position={[post.latitude, post.longitude]}>
                                            <Popup>
                                                <div style={{fontWeight: '600', fontSize: '13px'}}>
                                                    {post.title}
                                                </div>
                                                <div style={{fontSize: '11px', color: '#666'}}>
                                                    {post.full_address}
                                                </div>
                                            </Popup>
                                        </Marker>
                                    </MapContainer>
                                </div>
                            ) : (
                                <div className="rmd-map-placeholder">
                                    <FaMapMarkerAlt size={40} style={{marginBottom: 10}}/>
                                    <span>Chưa có dữ liệu bản đồ cho tin đăng này</span>
                                    <span style={{fontSize: 13, fontWeight: 400}}>Vui lòng liên hệ chủ trọ để xem vị trí</span>
                                </div>
                            )}
                            
                            <div style={{marginTop: 15, display: 'flex', gap: 10, alignItems: 'center', color: '#475569', fontSize: '14px'}}>
                                <FaMapMarkerAlt color="#ef4444"/>
                                <span>{post.full_address}</span>
                            </div>
                        </div>
                    </div>

                    {/* CỘT PHẢI: SIDEBAR */}
                    <div className="rmd-right">
                        <div className="rmd-sidebar">
                            <div className="rmd-host-card">
                                <img 
                                    src={post.user?.user_avatar || "https://cdn-icons-png.flaticon.com/512/149/149071.png"} 
                                    alt="User" className="rmd-avatar"
                                />
                                <span className="rmd-host-name">{`${post.user?.user_first_name || ""} ${post.user?.user_last_name || ""}`.trim() || 'Người tìm bạn'}</span>
                                <span className="rmd-host-sub">
                                    Đã tham gia: {new Date(post.user?.user_joined || post.created_at).getFullYear()}
                                </span>

                                <div className="rmd-budget-box">
                                    <span className="rmd-budget-label">Ngân sách dự kiến</span>
                                    <span className="rmd-budget-val">{formatMoney(post.budget)}</span>
                                    <span className="rmd-budget-unit">VNĐ / người / tháng</span>
                                </div>

                                <div style={{marginBottom: 15, fontSize: 13, color: '#666', borderTop: '1px dashed #ddd', paddingTop: 10}}>
                                    <div style={{display:'flex', justifyContent:'space-between', marginBottom:5}}>
                                        <span><FaClock/> Ngày đăng:</span>
                                        <strong>{formatDate(post.created_at)}</strong>
                                    </div>
                                    <div style={{display:'flex', justifyContent:'space-between'}}>
                                        <span><FaCalendarAlt/> Hết hạn:</span>
                                        <strong style={{color: daysLeft.color}}>{daysLeft.text}</strong>
                                    </div>
                                </div>

                                <button 
                                    className="rmd-btn rmd-btn-call"
                                    onClick={() => post.contact_phone ? window.open(`tel:${post.contact_phone}`) : toast.error("Không có SĐT")}
                                >
                                    <FaPhoneAlt/> {post.contact_phone || 'Hiện số điện thoại'}
                                </button>

                                <button className="rmd-btn rmd-btn-zalo" onClick={() => toast("Tính năng đang phát triển")}>
                                    <FaCommentDots size={18}/> Nhắn tin Zalo
                                </button>
                            </div>

                            <div className="rmd-safety">
                                <FaExclamationTriangle size={24} style={{flexShrink: 0, marginTop: 2}}/>
                                <div>
                                    <strong>Lưu ý an toàn:</strong><br/>
                                    Hãy gặp mặt trực tiếp tại nơi công cộng trước khi quyết định dọn về ở chung.
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default RoommateDetailPage;