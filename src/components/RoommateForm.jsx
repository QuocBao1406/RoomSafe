import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { 
    FaMapMarked, FaDollarSign, FaImages, FaInfoCircle, FaHome, FaCloudUploadAlt, FaTrash, 
    FaVenusMars, FaBriefcase, FaHeart, FaPaperPlane, FaLightbulb, FaMapPin, FaRulerCombined,
    FaGamepad, FaHandHoldingUsd, FaBolt, FaTint, FaWifi, FaClock
} from 'react-icons/fa';

const RoommateForm = ({ onSubmit, loading, initialData = {} }) => {
    const fileInputRef = useRef(null);
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [previewImages, setPreviewImages] = useState([]);
    const [isDragging, setIsDragging] = useState(false);
    
    // Data Location
    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]); // <-- Thêm state xã

    const [formData, setFormData] = useState({
        title: '', description: '', price: '', area: '', 
        priceElectricity: '', priceWater: '', priceInternet: '',
        
        // Location
        city: '', district: '', ward: '', address: '', // <-- Thêm ward
        
        // Duration
        duration: '30', // <-- Mặc định 30 ngày

        genderPartner: 'ALL', ageRange: '', career: '', 
        habits: '', hobbies: '', sharedCost: '',
        
        contactName: initialData.contactName || '', 
        contactPhone: initialData.contactPhone || '',
    });

    // Load Tỉnh
    useEffect(() => {
        axios.get('https://esgoo.net/api-tinhthanh/1/0.htm').then(res => {
            if(res.data.error === 0) setProvinces(res.data.data);
        });
    }, []);

    // Handle chọn Tỉnh -> Load Huyện
    const handleProvinceChange = (e) => {
        const idx = e.target.selectedIndex;
        const pId = e.target.value;
        const pName = e.target.childNodes[idx].getAttribute('data-name');
        
        setFormData({ ...formData, city: pName, district: '', ward: '' });
        setDistricts([]); 
        setWards([]);

        if (pId) {
            axios.get(`https://esgoo.net/api-tinhthanh/2/${pId}.htm`).then(res => {
                if(res.data.error === 0) setDistricts(res.data.data);
            });
        }
    };

    // Handle chọn Huyện -> Load Xã
    const handleDistrictChange = (e) => {
        const idx = e.target.selectedIndex;
        const dId = e.target.value;
        const dName = e.target.childNodes[idx].getAttribute('data-name');

        setFormData({ ...formData, district: dName, ward: '' });
        setWards([]);

        if (dId) {
            axios.get(`https://esgoo.net/api-tinhthanh/3/${dId}.htm`).then(res => {
                if(res.data.error === 0) setWards(res.data.data);
            });
        }
    };

    // Handle chọn Xã
    const handleWardChange = (e) => {
        const idx = e.target.selectedIndex;
        const wName = e.target.childNodes[idx].getAttribute('data-name');
        setFormData({ ...formData, ward: wName });
    };

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
    const formatPrice = (price) => !price ? 0 : Number(price).toLocaleString('vi-VN');

    // Drag & Drop (Giữ nguyên logic cũ)
    const processFiles = (files) => {
        if (selectedFiles.length + files.length > 5) return alert("Tối đa 5 ảnh!");
        setSelectedFiles(prev => [...prev, ...files]);
        setPreviewImages(prev => [...prev, ...files.map(file => URL.createObjectURL(file))]);
    };
    const handleFileChange = (e) => { processFiles(Array.from(e.target.files)); e.target.value = ''; };
    const onDragOver = (e) => { e.preventDefault(); setIsDragging(true); };
    const onDragLeave = (e) => { e.preventDefault(); setIsDragging(false); };
    const onDrop = (e) => {
        e.preventDefault(); setIsDragging(false);
        const files = Array.from(e.dataTransfer.files).filter(f => f.type.startsWith('image/'));
        if(files.length > 0) processFiles(files);
    };
    const removeImage = (idx) => {
        setSelectedFiles(prev => prev.filter((_, i) => i !== idx));
        setPreviewImages(prev => prev.filter((_, i) => i !== idx));
    };

    const handleSubmitLocal = (e) => {
        e.preventDefault();
        const data = new FormData();
        Object.keys(formData).forEach(key => data.append(key, formData[key]));
        selectedFiles.forEach(file => data.append('images', file));
        onSubmit(data);
    };

    return (
        <form onSubmit={handleSubmitLocal} className="rp-grid">
            <div className="rp-col-left">
                
                {/* 1. THÔNG TIN CƠ BẢN */}
                <div className="rp-card">
                    <div className="rp-section-header">
                        <div className="rp-icon-box"><FaHome /></div>
                        <h3>Thông tin bài đăng</h3>
                    </div>
                    <div className="rp-group">
                        <label>Tiêu đề bài đăng <span className="rp-required">*</span></label>
                        <input className="rp-input" name="title" placeholder="VD: Tìm nam ở ghép chung cư Vinhome..." value={formData.title} onChange={handleChange} required />
                    </div>
                    <div className="rp-row rp-cols-2">
                        <div className="rp-group">
                            <label><FaDollarSign/> Giá thuê (VNĐ/tháng) <span className="rp-required">*</span></label>
                            <input type="number" className="rp-input" name="price" placeholder="1500000" value={formData.price} onChange={handleChange} required />
                        </div>
                        <div className="rp-group">
                            <label><FaRulerCombined/> Diện tích (m²) <span className="rp-required">*</span></label>
                            <input type="number" className="rp-input" name="area" placeholder="25" value={formData.area} onChange={handleChange} required />
                        </div>
                    </div>
                    
                    {/* Thêm chọn thời hạn */}
                    <div className="rp-group">
                        <label><FaClock/> Thời hạn hiển thị tin</label>
                        <select className="rp-select" name="duration" value={formData.duration} onChange={handleChange}>
                            <option value="7">7 Ngày</option>
                            <option value="15">15 Ngày</option>
                            <option value="30">30 Ngày</option>
                            <option value="60">60 Ngày</option>
                        </select>
                    </div>
                </div>

                {/* 2. CHI PHÍ DỊCH VỤ */}
                <div className="rp-card">
                    <div className="rp-section-header">
                        <div className="rp-icon-box"><FaHandHoldingUsd /></div>
                        <h3>Chi phí dịch vụ (Bỏ trống nếu miễn phí)</h3>
                    </div>
                    <div className="rp-row rp-cols-3">
                        <div className="rp-group">
                            <label><FaBolt style={{color:'#eab308'}}/> Điện (đ/số)</label>
                            <input type="number" className="rp-input" name="priceElectricity" placeholder="3500" value={formData.priceElectricity} onChange={handleChange} />
                        </div>
                        <div className="rp-group">
                            <label><FaTint style={{color:'#3b82f6'}}/> Nước (đ/khối)</label>
                            <input type="number" className="rp-input" name="priceWater" placeholder="20000" value={formData.priceWater} onChange={handleChange} />
                        </div>
                        <div className="rp-group">
                            <label><FaWifi style={{color:'#8b5cf6'}}/> Mạng (đ/tháng)</label>
                            <input type="number" className="rp-input" name="priceInternet" placeholder="100000" value={formData.priceInternet} onChange={handleChange} />
                        </div>
                    </div>
                    <div className="rp-group">
                        <label>Cách chia tiền (Chi tiết)</label>
                        <input className="rp-input" name="sharedCost" placeholder="VD: Điện nước chia đều, tiền phòng đóng 3 tháng..." value={formData.sharedCost} onChange={handleChange} />
                    </div>
                </div>

                {/* 3. ĐỊA ĐIỂM (Full 3 cấp) */}
                <div className="rp-card">
                    <div className="rp-section-header">
                        <div className="rp-icon-box"><FaMapMarked /></div>
                        <h3>Địa điểm</h3>
                    </div>
                    <div className="rp-row rp-cols-3">
                        <div className="rp-group">
                            <label>Tỉnh / Thành phố <span className="rp-required">*</span></label>
                            <select className="rp-select" onChange={handleProvinceChange} required>
                                <option value="">-- Tỉnh/TP --</option>
                                {provinces.map(p => <option key={p.id} value={p.id} data-name={p.full_name}>{p.full_name}</option>)}
                            </select>
                        </div>
                        <div className="rp-group">
                            <label>Quận / Huyện <span className="rp-required">*</span></label>
                            <select className="rp-select" onChange={handleDistrictChange} disabled={!districts.length} required>
                                <option value="">-- Quận/Huyện --</option>
                                {districts.map(d => <option key={d.id} value={d.id} data-name={d.full_name}>{d.full_name}</option>)}
                            </select>
                        </div>
                        <div className="rp-group">
                            <label>Phường / Xã <span className="rp-required">*</span></label>
                            <select className="rp-select" onChange={handleWardChange} disabled={!wards.length} required>
                                <option value="">-- Phường/Xã --</option>
                                {wards.map(w => <option key={w.id} value={w.id} data-name={w.full_name}>{w.full_name}</option>)}
                            </select>
                        </div>
                    </div>
                    <div className="rp-group">
                        <label>Địa chỉ cụ thể <span className="rp-required">*</span></label>
                        <input className="rp-input" name="address" placeholder="Số nhà, tên đường, khu dân cư..." value={formData.address} onChange={handleChange} required />
                    </div>
                </div>

                {/* 4. YÊU CẦU NGƯỜI Ở GHÉP */}
                <div className="rp-card">
                    <div className="rp-section-header">
                        <div className="rp-icon-box"><FaVenusMars /></div>
                        <h3>Yêu cầu người ở ghép</h3>
                    </div>
                    <div className="rp-row rp-cols-3">
                        <div className="rp-group">
                            <label>Giới tính</label>
                            <select className="rp-select" name="genderPartner" value={formData.genderPartner} onChange={handleChange}>
                                <option value="ALL">Tất cả</option>
                                <option value="MALE">Nam</option>
                                <option value="FEMALE">Nữ</option>
                            </select>
                        </div>
                        <div className="rp-group">
                            <label>Độ tuổi (VD: 18-25)</label>
                            <input className="rp-input" name="ageRange" placeholder="18 - 25" value={formData.ageRange} onChange={handleChange}/>
                        </div>
                        <div className="rp-group">
                            <label>Nghề nghiệp</label>
                            <select className="rp-select" name="career" value={formData.career} onChange={handleChange}>
                                <option value="">Tất cả</option>
                                <option value="SINH_VIEN">Sinh viên</option>
                                <option value="DA_DI_LAM">Người đi làm</option>
                            </select>
                        </div>
                    </div>
                    <div className="rp-row rp-cols-2">
                        <div className="rp-group">
                            <label><FaHeart/> Thói quen sinh hoạt</label>
                            <input className="rp-input" name="habits" placeholder="VD: Sạch sẽ, không hút thuốc..." value={formData.habits} onChange={handleChange}/>
                        </div>
                        <div className="rp-group">
                            <label><FaGamepad/> Sở thích cá nhân</label>
                            <input className="rp-input" name="hobbies" placeholder="VD: Game, nấu ăn, yêu động vật..." value={formData.hobbies} onChange={handleChange}/>
                        </div>
                    </div>
                </div>

                {/* 5. HÌNH ẢNH */}
                <div className="rp-card">
                    <div className="rp-section-header">
                        <div className="rp-icon-box"><FaImages /></div>
                        <h3>Hình ảnh ({selectedFiles.length}/5)</h3>
                    </div>
                    <div className={`rp-upload-box ${isDragging ? 'dragging' : ''}`}
                        onDragOver={onDragOver} onDragLeave={onDragLeave} onDrop={onDrop}
                        onClick={() => document.getElementById('rp-file-input').click()}
                    >
                        <input type="file" multiple accept="image/*" id="rp-file-input" onChange={handleFileChange} hidden />
                        <div className="rp-upload-label">
                            <div className="rp-upload-icon"><FaCloudUploadAlt/></div>
                            <span style={{fontWeight: 700}}>Thả ảnh vào đây hoặc Bấm chọn</span>
                            <small style={{color: '#94a3b8'}}>JPG, PNG, WEBP (Max 5 ảnh)</small>
                        </div>
                    </div>
                    {previewImages.length > 0 && (
                        <div className="rp-preview-grid">
                            {previewImages.map((src, idx) => (
                                <div key={idx} className="rp-img-item">
                                    <img src={src} alt="preview" />
                                    <button type="button" className="rp-btn-remove" onClick={(e) => { e.stopPropagation(); removeImage(idx); }}>
                                        <FaTrash size={10}/>
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* 6. MÔ TẢ CHI TIẾT */}
                <div className="rp-card">
                    <div className="rp-section-header">
                        <div className="rp-icon-box"><FaInfoCircle /></div>
                        <h3>Mô tả chi tiết</h3>
                    </div>
                    <textarea className="rp-textarea" name="description" placeholder="Mô tả kỹ hơn về phòng, tiện ích, nội quy..." value={formData.description} onChange={handleChange} required />
                </div>
            </div>

            {/* CỘT PHẢI: PREVIEW */}
            <div className="rp-col-right">
                <div className="rp-preview-header">Xem trước tin đăng</div>
                <div className="rp-live-card">
                    <div className="rp-live-img">
                        {previewImages.length > 0 ? <img src={previewImages[0]} alt="cover" /> : <FaImages size={40}/>}
                        <div className="rp-live-badge">Tìm người ở ghép</div>
                    </div>
                    <div className="rp-live-body">
                        <h4 className="rp-live-title">{formData.title || 'Tiêu đề tin sẽ hiện ở đây...'}</h4>
                        <div className="rp-live-price">{formatPrice(formData.price)} <span>VNĐ/tháng</span></div>
                        <div className="rp-live-row"><FaMapPin /> <span className="truncate">{formData.district || 'Quận'}, {formData.city || 'TP'}</span></div>
                        <div className="rp-live-row"><FaVenusMars /> <span>{formData.genderPartner === 'MALE' ? 'Tìm Nam' : formData.genderPartner === 'FEMALE' ? 'Tìm Nữ' : 'Nam/Nữ'}</span></div>
                    </div>
                </div>
                <div className="rp-actions">
                    <button type="submit" className="rp-btn-submit" disabled={loading}>{loading ? 'Đang đăng...' : <><FaPaperPlane /> Đăng tin ngay</>}</button>
                    <button type="button" className="rp-btn-cancel" onClick={() => window.history.back()}>Hủy bỏ</button>
                </div>
            </div>
        </form>
    );
};

export default RoommateForm;