import React, { useEffect } from 'react';
import '../css/RoomDetailModal.css';
import { 
    FaMapMarkerAlt, FaBolt, FaTint, FaWifi, FaInfoCircle, 
    FaExpandArrowsAlt, FaClock, FaCalendarAlt 
} from 'react-icons/fa';

const RoomDetailModal = ({ isOpen, onClose, roomData }) => {
    useEffect(() => {
        if (isOpen) document.body.style.overflow = 'hidden';
        else document.body.style.overflow = 'auto';
        return () => { document.body.style.overflow = 'auto'; };
    }, [isOpen]);

    if (!isOpen || !roomData) return null;

    // --- HELPER ---
    const formatDate = (date) => date ? new Date(date).toLocaleDateString('vi-VN') : "...";
    
    const formatMoney = (val) => {
        if (!val || val == 0) return "Miễn phí";
        if (typeof val === 'string' && val.includes('tr')) return val; 
        return Number(val).toLocaleString('vi-VN');
    };

    // --- XỬ LÝ ẢNH ---
    const placeholder = "https://via.placeholder.com/800x500?text=Chua+co+anh";
    let images = roomData.images && roomData.images.length > 0 ? roomData.images : [];
    
    if (images.length === 0 && (roomData.image || roomData.thumbnail)) {
        images = [{ image_url: roomData.image || roomData.thumbnail }];
    }
    if (images.length === 0) images = [{ image_url: placeholder }];

    const mainImg = images[0].image_url || images[0].url;
    const subImg1 = images[1]?.image_url || images[1]?.url || mainImg;
    const subImg2 = images[2]?.image_url || images[2]?.url || subImg1;
    const isSingleMode = images.length < 2;

    return (
        <div className="rdm-overlay" onClick={onClose}>
            <div className="rdm-container" onClick={e => e.stopPropagation()}>
                
                {/* HEADER */}
                <div className="rdm-header">
                    <h3><FaInfoCircle color="#2563eb"/> Chi tiết bài đăng</h3>
                    <button className="rdm-close-btn" onClick={onClose}>&times;</button>
                </div>

                {/* BODY */}
                <div className="rdm-body">
                    
                    {/* GALLERY */}
                    <div className={`rdm-gallery ${isSingleMode ? 'single' : ''}`}>
                        <img src={mainImg} alt="Main" className="rdm-img-main" />
                        {!isSingleMode && (
                            <div className="rdm-img-col">
                                <img src={subImg1} alt="Sub 1" className="rdm-img-sub" />
                                <img src={subImg2} alt="Sub 2" className="rdm-img-sub" />
                            </div>
                        )}
                    </div>

                    {/* CONTENT GRID */}
                    <div className="rdm-content-grid">
                        
                        {/* CỘT TRÁI */}
                        <div className="rdm-col-left">
                            <span className="rdm-category-badge">
                                {roomData.category === 'PHONG_TRO' ? 'Phòng trọ' : 
                                 roomData.category === 'CHUNG_CU' ? 'Căn hộ' : 'Nhà nguyên căn'}
                            </span>

                            <h2>{roomData.title}</h2>
                            
                            <div className="rdm-address">
                                <FaMapMarkerAlt color="#ef4444" style={{marginTop:3}}/>
                                <span>{roomData.address}</span>
                            </div>

                            <div className="rdm-desc-box">
                                <strong>Mô tả:</strong><br/>
                                {roomData.description || "Chưa có mô tả chi tiết."}
                            </div>
                        </div>

                        {/* CỘT PHẢI */}
                        <div className="rdm-col-right">
                            <div className="rdm-info-card">
                                <div className="rdm-price-row">
                                    {roomData.price} <small style={{fontSize:14, fontWeight:500, color:'#64748b'}}>/tháng</small>
                                </div>

                                <div className="rdm-status-row">
                                    <span><FaExpandArrowsAlt color="#94a3b8"/> Diện tích:</span>
                                    <strong>{roomData.area} m²</strong>
                                </div>
                                <div className="rdm-status-row">
                                    <span><FaClock color="#94a3b8"/> Ngày đăng:</span>
                                    <strong>{formatDate(roomData.created_at)}</strong>
                                </div>
                                <div className="rdm-status-row">
                                    <span><FaCalendarAlt color="#94a3b8"/> Hết hạn:</span>
                                    <strong style={{color: '#d97706'}}>{formatDate(roomData.expired_at)}</strong>
                                </div>
                                <div className="rdm-status-row">
                                    <span>Trạng thái:</span>
                                    <strong style={{
                                        color: roomData.status === 'AVAILABLE' ? '#16a34a' : 
                                               roomData.status === 'RENTED' ? '#64748b' : '#ca8a04'
                                    }}>
                                        {roomData.status === 'AVAILABLE' ? 'Đang hiện' : 
                                         roomData.status === 'RENTED' ? 'Đã thuê' : 'Đang ẩn'}
                                    </strong>
                                </div>

                                <div style={{height:1, background:'#f1f5f9', margin:'15px 0'}}></div>

                                <div style={{fontSize:12, fontWeight:700, color:'#94a3b8', textTransform:'uppercase'}}>Dịch vụ</div>
                                <div className="rdm-service-grid">
                                    <div className="rdm-sv-item">
                                        <FaBolt color="#eab308" style={{fontSize:16, marginBottom:4}}/>
                                        <span className="rdm-sv-val">{roomData.elecPrice}</span>
                                        <span className="rdm-sv-lbl">Điện</span>
                                    </div>
                                    <div className="rdm-sv-item">
                                        <FaTint color="#3b82f6" style={{fontSize:16, marginBottom:4}}/>
                                        <span className="rdm-sv-val">{roomData.waterPrice}</span>
                                        <span className="rdm-sv-lbl">Nước</span>
                                    </div>
                                    <div className="rdm-sv-item">
                                        <FaWifi color="#8b5cf6" style={{fontSize:16, marginBottom:4}}/>
                                        <span className="rdm-sv-val">{roomData.internetPrice}</span>
                                        <span className="rdm-sv-lbl">Net</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* FOOTER */}
                <div className="rdm-footer">
                    <button className="rdm-btn-sec" onClick={onClose}>Đóng</button>
                    <button className="rdm-btn-pri" onClick={() => window.open(`/room/${roomData.id}`, '_blank')}>
                        Xem trang thực tế
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RoomDetailModal;