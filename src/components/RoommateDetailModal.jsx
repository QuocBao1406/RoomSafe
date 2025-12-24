import React, { useEffect } from 'react';
import '../css/RoommateDetailModal.css'; // File CSS sẽ tạo ở bước 2
import { 
    FaMapMarkerAlt, FaBolt, FaTint, FaWifi, FaInfoCircle, 
    FaVenusMars, FaUserFriends, FaBriefcase, FaHeart, FaGamepad, 
    FaClock, FaCalendarAlt, FaTimes
} from 'react-icons/fa';

const RoommateDetailModal = ({ isOpen, onClose, postData }) => {
    // Chặn cuộn trang khi mở Modal
    useEffect(() => {
        if (isOpen) document.body.style.overflow = 'hidden';
        else document.body.style.overflow = 'auto';
        return () => { document.body.style.overflow = 'auto'; };
    }, [isOpen]);

    if (!isOpen || !postData) return null;

    // --- HELPER FUNCTIONS ---
    const formatDate = (date) => date ? new Date(date).toLocaleDateString('vi-VN') : "...";
    
    const formatPrice = (val) => {
        if (!val || Number(val) === 0) return "Miễn phí";
        return Number(val).toLocaleString('vi-VN') + " đ";
    };

    // --- XỬ LÝ DỮ LIỆU ---
    const details = postData.roommate_details || {};
    
    // Xử lý ảnh (Lấy ảnh đầu tiên làm Main, các ảnh sau làm Sub)
    const placeholder = "https://via.placeholder.com/800x500?text=RoomSafe";
    let images = postData.images && postData.images.length > 0 ? postData.images : [{ image_url: placeholder }];
    const mainImg = images[0].image_url;
    const subImages = images.slice(1, 3); // Lấy tối đa 2 ảnh phụ

    // Xử lý Tags (Habits & Hobbies lưu dạng chuỗi "A,B,C")
    const habits = details.habits ? details.habits.split(',') : [];
    const hobbies = details.hobbies ? details.hobbies.split(',') : [];

    return (
        <div className="rdm-overlay" onClick={onClose}>
            <div className="rdm-container" onClick={e => e.stopPropagation()}>
                
                {/* HEADER */}
                <div className="rdm-header">
                    <h3><FaInfoCircle /> Chi tiết tìm bạn</h3>
                    <button className="rdm-close-btn" onClick={onClose}><FaTimes/></button>
                </div>

                {/* BODY */}
                <div className="rdm-body">
                    
                    {/* GALLERY (Ảnh) */}
                    <div className="rdm-gallery">
                        <div className="rdm-main-img-box">
                            <img src={mainImg} alt="Main" className="rdm-img-main" />
                            <div className="rdm-price-tag">
                                {Number(postData.post_price).toLocaleString('vi-VN')} đ/tháng
                            </div>
                        </div>
                        {subImages.length > 0 && (
                            <div className="rdm-sub-list">
                                {subImages.map((img, idx) => (
                                    <img key={idx} src={img.image_url} alt="Sub" className="rdm-img-sub" />
                                ))}
                            </div>
                        )}
                    </div>

                    {/* INFO GRID */}
                    <div className="rdm-content-grid">
                        
                        {/* CỘT TRÁI: THÔNG TIN CHÍNH */}
                        <div className="rdm-col-left">
                            <h2 className="rdm-title">{postData.post_title}</h2>
                            
                            <div className="rdm-address">
                                <FaMapMarkerAlt className="text-red-500"/>
                                <span>{postData.post_address}, {postData.post_ward}, {postData.post_district}, {postData.post_city}</span>
                            </div>

                            {/* Section: Yêu cầu Partner */}
                            <div className="rdm-section">
                                <h4><FaUserFriends className="text-blue-500"/> Yêu cầu người ở ghép</h4>
                                <div className="rdm-specs-row">
                                    <div className="rdm-spec-item">
                                        <span className="lbl">Giới tính:</span>
                                        <span className="val">
                                            {details.gender_partner === 'MALE' ? 'Nam' : 
                                             details.gender_partner === 'FEMALE' ? 'Nữ' : 'Nam/Nữ'}
                                        </span>
                                    </div>
                                    <div className="rdm-spec-item">
                                        <span className="lbl">Độ tuổi:</span>
                                        <span className="val">{details.age_range_min || 18} - {details.age_range_max || 30} tuổi</span>
                                    </div>
                                    <div className="rdm-spec-item">
                                        <span className="lbl">Nghề nghiệp:</span>
                                        <span className="val">
                                            {details.career === 'SINH_VIEN' ? 'Sinh viên' : 'Đã đi làm'}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Section: Mô tả */}
                            <div className="rdm-section">
                                <h4>Mô tả chi tiết</h4>
                                <p className="rdm-desc-text">
                                    {postData.post_description || "Chưa có mô tả chi tiết."}
                                </p>
                            </div>

                            {/* Section: Tags (Thói quen & Sở thích) */}
                            <div className="rdm-section">
                                {habits.length > 0 && (
                                    <div className="rdm-tags-group">
                                        <span className="tag-lbl"><FaHeart className="text-pink-500"/> Thói quen:</span>
                                        <div className="rdm-tags-list">
                                            {habits.map((h, i) => <span key={i} className="rdm-tag habit">{h}</span>)}
                                        </div>
                                    </div>
                                )}
                                {hobbies.length > 0 && (
                                    <div className="rdm-tags-group mt-3">
                                        <span className="tag-lbl"><FaGamepad className="text-purple-500"/> Sở thích:</span>
                                        <div className="rdm-tags-list">
                                            {hobbies.map((h, i) => <span key={i} className="rdm-tag hobby">{h}</span>)}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* CỘT PHẢI: CHI PHÍ & TRẠNG THÁI */}
                        <div className="rdm-col-right">
                            <div className="rdm-info-card">
                                <div className="rdm-card-head">Thông tin dịch vụ</div>
                                
                                <div className="rdm-service-list">
                                    <div className="rdm-sv-row">
                                        <div className="sv-icon elec"><FaBolt/></div>
                                        <div className="sv-info">
                                            <span className="sv-name">Điện</span>
                                            <span className="sv-price">{formatPrice(postData.price_electricity)} /kwh</span>
                                        </div>
                                    </div>
                                    <div className="rdm-sv-row">
                                        <div className="sv-icon water"><FaTint/></div>
                                        <div className="sv-info">
                                            <span className="sv-name">Nước</span>
                                            <span className="sv-price">{formatPrice(postData.price_water)} /khối</span>
                                        </div>
                                    </div>
                                    <div className="rdm-sv-row">
                                        <div className="sv-icon net"><FaWifi/></div>
                                        <div className="sv-info">
                                            <span className="sv-name">Internet</span>
                                            <span className="sv-price">{formatPrice(postData.price_internet)} /tháng</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="rdm-divider"></div>

                                <div className="rdm-meta-info">
                                    <div className="meta-row">
                                        <FaClock/> Đăng: <b>{formatDate(postData.created_at)}</b>
                                    </div>
                                    <div className="meta-row">
                                        <FaCalendarAlt/> Hết hạn: <b className="text-orange">{formatDate(postData.expired_at)}</b>
                                    </div>
                                    <div className="meta-row">
                                        Trạng thái: 
                                        <span className={`status-badge ${postData.status}`}>
                                            {postData.status === 'AVAILABLE' ? 'Đang hiển thị' : 'Đã ẩn'}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* FOOTER */}
                <div className="rdm-footer">
                    <button className="rdm-btn-close" onClick={onClose}>Đóng cửa sổ</button>
                </div>
            </div>
        </div>
    );
};

export default RoommateDetailModal;