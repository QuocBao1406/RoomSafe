import React, { useEffect } from 'react';
import '../css/RoomDetailModal.css';

const RoomDetailModal = ({ isOpen, onClose, roomData }) => {
  if (!isOpen) return null;

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  // Helper render trạng thái
  const renderStatus = (status) => {
      const map = {
          'AVAILABLE': { text: 'Đang hiển thị', color: '#16a34a' },
          'HIDDEN': { text: 'Đang ẩn', color: '#d97706' },
          'RENTED': { text: 'Đã cho thuê', color: '#4b5563' }
      };
      const curr = map[status] || { text: status, color: '#000' };
      return <span style={{color: curr.color, fontWeight: 'bold'}}>● {curr.text}</span>;
  };

  const formatDate = (date) => date ? new Date(date).toLocaleDateString('vi-VN') : "Vô thời hạn";

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        
        {/* HEADER */}
        <div className="modal-header">
          <h3>Chi tiết tin đăng (ID: {roomData.id || '#'})</h3>
          <button className="btn-close" onClick={onClose}>&times;</button>
        </div>

        {/* BODY */}
        <div className="modal-body">
            
            {/* --- PHẦN ẢNH (ĐÃ SỬA) --- */}
            {/* Logic: Nếu có album nhiều ảnh thì hiện lưới, nếu không thì hiện 1 ảnh to */}
            {roomData.images && roomData.images.length > 0 ? (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px', marginBottom: '15px' }}>
                    {/* Ảnh đầu tiên to (chiếm 2 cột) */}
                    <div style={{ gridColumn: 'span 2' }}>
                         <img 
                            src={roomData.images[0].image_url || roomData.images[0].url || roomData.image} 
                            alt="Main" 
                            className="modal-image" 
                            style={{ height: '250px', marginBottom: '0', width: '100%', objectFit: 'cover' }}
                        />
                    </div>
                    {/* Các ảnh phụ bên dưới */}
                    {roomData.images.slice(1).map((img, index) => (
                        <img 
                            key={index}
                            src={img.image_url || img.url} 
                            alt={`Sub ${index}`}
                            className="modal-image"
                            style={{ height: '120px', marginBottom: '0', width: '100%', objectFit: 'cover' }}
                        />
                    ))}
                </div>
            ) : (
                // Nếu không có album thì hiện ảnh thumbnail cũ
                <img 
                    src={roomData.image || "https://via.placeholder.com/600x300?text=No+Image"} 
                    alt="Room" 
                    className="modal-image"
                />
            )}
            {/* --------------------------- */}
            
            {/* Tiêu đề & Giá thuê */}
            <div style={{marginBottom: '20px'}}>
                <span style={{
                    background: '#dbeafe', color: '#1e40af', 
                    padding: '4px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: 'bold'
                }}>
                    {roomData.category}
                </span>
                <h2 className="modal-title" style={{marginTop: '8px'}}>{roomData.title}</h2>
                <div style={{display: 'flex', alignItems: 'center', gap: '15px'}}>
                    <p className="modal-price" style={{marginBottom: 0}}>{roomData.price} /tháng</p>
                    <span style={{color: '#666'}}>• {roomData.area} m²</span>
                </div>
                <p style={{marginTop: '5px', color: '#555', fontSize: '14px'}}>📍 {roomData.address}</p>
            </div>

            {/* Bảng giá dịch vụ */}
            <h4 style={{margin: '0 0 10px', color: '#333'}}>💰 Chi phí dịch vụ</h4>
            <div className="modal-info-grid" style={{gridTemplateColumns: '1fr 1fr 1fr', background: '#f0fdf4', border: '1px solid #bbf7d0'}}>
                <div style={{textAlign: 'center'}}>
                    <div style={{fontSize: '12px', color: '#666'}}>Điện</div>
                    <div style={{fontWeight: 'bold', color: '#166534'}}>{roomData.elecPrice}</div>
                </div>
                <div style={{textAlign: 'center', borderLeft: '1px solid #bbf7d0', borderRight: '1px solid #bbf7d0'}}>
                    <div style={{fontSize: '12px', color: '#666'}}>Nước</div>
                    <div style={{fontWeight: 'bold', color: '#0369a1'}}>{roomData.waterPrice}</div>
                </div>
                <div style={{textAlign: 'center'}}>
                    <div style={{fontSize: '12px', color: '#666'}}>Internet</div>
                    <div style={{fontWeight: 'bold', color: '#7c3aed'}}>{roomData.internetPrice}</div>
                </div>
            </div>

            {/* Thông tin quản lý */}
            <h4 style={{margin: '15px 0 10px', color: '#333'}}>⚙️ Trạng thái tin</h4>
            <div className="modal-info-grid" style={{background: '#fff7ed', border: '1px solid #fed7aa'}}>
                <div>Trạng thái: {renderStatus(roomData.status)}</div>
                <div>Ngày tạo: {formatDate(roomData.created_at)}</div>
                <div>Hết hạn: <strong style={{color: '#c2410c'}}>{formatDate(roomData.expired_at)}</strong></div>
            </div>

            {/* Mô tả */}
            <h4 style={{margin: '15px 0 5px', color: '#333'}}>📝 Mô tả chi tiết</h4>
            <div style={{
                background: '#f9fafb', padding: '12px', borderRadius: '8px', 
                fontSize: '14px', lineHeight: '1.6', color: '#374151', whiteSpace: 'pre-wrap'
            }}>
                {roomData.description}
            </div>
        </div>

        {/* FOOTER */}
        <div className="modal-footer" style={{justifyContent: 'flex-end'}}>
          <button 
            onClick={onClose}
            style={{
                padding: '8px 24px',
                backgroundColor: '#374151', color: 'white',
                border: 'none', borderRadius: '6px',
                cursor: 'pointer', fontWeight: '500'
            }}
          >
            Đóng
          </button>
        </div>

      </div>
    </div>
  );
};

export default RoomDetailModal;