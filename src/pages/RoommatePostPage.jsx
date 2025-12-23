import React, { useState, useEffect, useRef, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, Toaster } from 'react-hot-toast';
import { UserContext } from '../contexts/UserContext.jsx';
import '../css/RoommatePost.css';

// Icons
import { 
    FaMapMarked, FaDollarSign, FaImages, FaInfoCircle, FaHome, FaCloudUploadAlt, FaTrash, 
    FaVenusMars, FaBriefcase, FaHeart, FaPaperPlane, FaLightbulb, FaMapPin, FaRulerCombined,
    FaGamepad, FaHandHoldingUsd, FaBolt, FaTint, FaWifi, FaClock, FaCheckCircle
} from 'react-icons/fa';

const RoommatePostPage = () => {
    const { user } = useContext(UserContext);
    const navigate = useNavigate();
    const fileInputRef = useRef(null);

    // --- STATES ---
    const [loading, setLoading] = useState(false);
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [previewImages, setPreviewImages] = useState([]);
    const [isDragging, setIsDragging] = useState(false);
    
    // Data Tỉnh/Huyện/Xã
    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);

    // Form Data (Full Option từ DB)
    const [formData, setFormData] = useState({
        title: '', description: '', price: '', area: '', 
        
        // Dịch vụ
        priceElectricity: '', priceWater: '', priceInternet: '',
        
        // Địa điểm
        city: '', district: '', ward: '', address: '',
        
        // Cấu hình tin
        duration: '30', // Mặc định 30 ngày

        // Chi tiết tìm bạn (Bảng RoommateDetails)
        genderPartner: 'ALL', ageMin: '', ageMax: '', career: '', 
        habits: '', hobbies: '', sharedCost: '',
        
        contactName: user?.name || '', 
        contactPhone: user?.phone || '',
    });

    // --- EFFECTS: LOAD LOCATION ---
    useEffect(() => {
        const fetchProvinces = async () => {
            try {
                const res = await axios.get('https://esgoo.net/api-tinhthanh/1/0.htm');
                if(res.data.error === 0) setProvinces(res.data.data);
            } catch (error) { console.error("Lỗi API Tỉnh:", error); }
        };
        fetchProvinces();
    }, []);

    // --- HANDLERS: LOCATION ---
    const handleProvinceChange = async (e) => {
        const idx = e.target.selectedIndex;
        const pId = e.target.value;
        const pName = e.target.childNodes[idx].getAttribute('data-name');
        
        setFormData(prev => ({ ...prev, city: pName, district: '', ward: '' }));
        setDistricts([]); setWards([]);

        if (pId) {
            try {
                const res = await axios.get(`https://esgoo.net/api-tinhthanh/2/${pId}.htm`);
                if(res.data.error === 0) setDistricts(res.data.data);
            } catch (error) { console.error(error); }
        }
    };

    const handleDistrictChange = async (e) => {
        const idx = e.target.selectedIndex;
        const dId = e.target.value;
        const dName = e.target.childNodes[idx].getAttribute('data-name');

        setFormData(prev => ({ ...prev, district: dName, ward: '' }));
        setWards([]);

        if (dId) {
            try {
                const res = await axios.get(`https://esgoo.net/api-tinhthanh/3/${dId}.htm`);
                if(res.data.error === 0) setWards(res.data.data);
            } catch (error) { console.error(error); }
        }
    };

    const handleWardChange = (e) => {
        const idx = e.target.selectedIndex;
        const wName = e.target.childNodes[idx].getAttribute('data-name');
        setFormData(prev => ({ ...prev, ward: wName }));
    };

    // --- HANDLERS: FORM INPUT ---
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const formatPrice = (price) => {
        if(!price) return 0;
        return Number(price).toLocaleString('vi-VN');
    };

    // --- HANDLERS: FILES (DRAG & DROP) ---
    const processFiles = (files) => {
        if (selectedFiles.length + files.length > 5) {
            toast.error("Chỉ được chọn tối đa 5 ảnh!");
            return;
        }
        setSelectedFiles(prev => [...prev, ...files]);
        const newPreviews = files.map(file => URL.createObjectURL(file));
        setPreviewImages(prev => [...prev, ...newPreviews]);
    };

    const handleFileChange = (e) => {
        processFiles(Array.from(e.target.files));
        e.target.value = ''; 
    };

    const onDragOver = (e) => { e.preventDefault(); setIsDragging(true); };
    const onDragLeave = (e) => { e.preventDefault(); setIsDragging(false); };
    const onDrop = (e) => {
        e.preventDefault(); setIsDragging(false);
        const files = Array.from(e.dataTransfer.files).filter(f => f.type.startsWith('image/'));
        if(files.length > 0) processFiles(files);
        else toast.error("Vui lòng chỉ thả file ảnh!");
    };

    const removeImage = (index) => {
        setSelectedFiles(prev => prev.filter((_, i) => i !== index));
        setPreviewImages(prev => {
            URL.revokeObjectURL(prev[index]); 
            return prev.filter((_, i) => i !== index);
        });
    };

    // --- SUBMIT ---
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // 1. Lấy Token chuẩn
        let token = localStorage.getItem('token');
        if (token && token.startsWith('"') && token.endsWith('"')) {
            token = token.slice(1, -1);
        }

        if (!user || !token) {
            toast.error("Vui lòng đăng nhập để đăng bài");
            return navigate("/login");
        }

        if (selectedFiles.length === 0) {
            toast.error("Vui lòng tải lên ít nhất 1 ảnh!");
            return;
        }

        setLoading(true);

        try {
            const data = new FormData();
            // Append User ID
            data.append("user_id", user.id);
            
            // Append Text Fields
            Object.keys(formData).forEach(key => {
                data.append(key, formData[key]);
            });

            // Append Files
            selectedFiles.forEach(file => {
                data.append('images', file);
            });

            // Gọi API (Direct Call)
            await axios.post('http://localhost:5000/api/roommates/create', data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`,
                },
            });

            toast.success("Đăng tin thành công!");
            setTimeout(() => navigate("/roommate/manage"), 1500);

        } catch (error) {
            console.error("Submit Error:", error);
            toast.error(error.response?.data?.message || "Lỗi khi đăng bài");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="rp-container">
            <Toaster position="top-center" />
            
            <div className="rp-content-width">
                {/* HERO HEADER */}
                <div className="rp-header">
                    <h1>Tìm Bạn Cùng Phòng Lý Tưởng</h1>
                    <p>Kết nối, chia sẻ không gian sống và giảm bớt gánh nặng chi phí cùng cộng đồng RoomSafe.</p>
                </div>

                <form onSubmit={handleSubmit} className="rp-grid">
                    {/* --- CỘT TRÁI: NHẬP LIỆU --- */}
                    <div className="rp-col-left">
                        
                        {/* 1. THÔNG TIN CƠ BẢN */}
                        <div className="rp-card">
                            <div className="rp-section-header">
                                <div className="rp-icon-box"><FaHome /></div>
                                <h3>Thông tin bài đăng</h3>
                            </div>
                            
                            <div className="rp-group">
                                <label>Tiêu đề tin <span className="rp-required">*</span></label>
                                <input className="rp-input" name="title" placeholder="VD: Tìm nữ ở ghép chung cư Vinhome Grand Park, sạch sẽ..." value={formData.title} onChange={handleChange} required />
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
                                <label>Cách chia tiền (Ghi chú chi tiết)</label>
                                <input className="rp-input" name="sharedCost" placeholder="VD: Tiền phòng chia đôi, điện nước theo công tơ..." value={formData.sharedCost} onChange={handleChange} />
                            </div>
                        </div>

                        {/* 3. ĐỊA ĐIỂM */}
                        <div className="rp-card">
                            <div className="rp-section-header">
                                <div className="rp-icon-box"><FaMapMarked /></div>
                                <h3>Địa điểm</h3>
                            </div>
                            <div className="rp-row rp-cols-3">
                                <div className="rp-group">
                                    <label>Tỉnh / Thành phố <span className="rp-required">*</span></label>
                                    <select className="rp-select" onChange={handleProvinceChange} required>
                                        <option value="">-- Chọn --</option>
                                        {provinces.map(p => <option key={p.id} value={p.id} data-name={p.full_name}>{p.full_name}</option>)}
                                    </select>
                                </div>
                                <div className="rp-group">
                                    <label>Quận / Huyện <span className="rp-required">*</span></label>
                                    <select className="rp-select" onChange={handleDistrictChange} disabled={!districts.length} required>
                                        <option value="">-- Chọn --</option>
                                        {districts.map(d => <option key={d.id} value={d.id} data-name={d.full_name}>{d.full_name}</option>)}
                                    </select>
                                </div>
                                <div className="rp-group">
                                    <label>Phường / Xã <span className="rp-required">*</span></label>
                                    <select className="rp-select" onChange={handleWardChange} disabled={!wards.length} required>
                                        <option value="">-- Chọn --</option>
                                        {wards.map(w => <option key={w.id} value={w.id} data-name={w.full_name}>{w.full_name}</option>)}
                                    </select>
                                </div>
                            </div>
                            <div className="rp-group">
                                <label>Địa chỉ cụ thể (Số nhà, tên đường) <span className="rp-required">*</span></label>
                                <input className="rp-input" name="address" placeholder="VD: Số 123 đường Nguyễn Văn Linh..." value={formData.address} onChange={handleChange} required />
                            </div>
                        </div>

                        {/* 4. TIÊU CHÍ TÌM BẠN */}
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
                                {/* 2 Ô NHẬP TUỔI RIÊNG BIỆT */}
                                <div className="rp-group" style={{gridColumn: 'span 2'}}>
                                    <label>Độ tuổi mong muốn</label>
                                    <div style={{display:'flex', gap:'10px', alignItems:'center'}}>
                                        <input className="rp-input" type="number" name="ageMin" placeholder="Từ (18)" value={formData.ageMin} onChange={handleChange} style={{flex:1}}/>
                                        <span style={{fontWeight:'bold', color:'#94a3b8'}}>-</span>
                                        <input className="rp-input" type="number" name="ageMax" placeholder="Đến (30)" value={formData.ageMax} onChange={handleChange} style={{flex:1}}/>
                                    </div>
                                </div>
                            </div>
                            <div className="rp-row rp-cols-2">
                                <div className="rp-group">
                                    <label>Nghề nghiệp</label>
                                    <select className="rp-select" name="career" value={formData.career} onChange={handleChange}>
                                        <option value="">Tất cả</option>
                                        <option value="SINH_VIEN">Sinh viên</option>
                                        <option value="DA_DI_LAM">Người đi làm</option>
                                    </select>
                                </div>
                                <div className="rp-group">
                                    <label><FaHeart/> Thói quen sinh hoạt</label>
                                    <input className="rp-input" name="habits" placeholder="VD: Ngủ sớm, gọn gàng, không hút thuốc..." value={formData.habits} onChange={handleChange}/>
                                </div>
                            </div>
                            <div className="rp-group">
                                <label><FaGamepad/> Sở thích cá nhân</label>
                                <input className="rp-input" name="hobbies" placeholder="VD: Thích nấu ăn, yêu chó mèo, xem phim..." value={formData.hobbies} onChange={handleChange}/>
                            </div>
                        </div>

                        {/* 5. HÌNH ẢNH */}
                        <div className="rp-card">
                            <div className="rp-section-header">
                                <div className="rp-icon-box"><FaImages /></div>
                                <h3>Hình ảnh thực tế ({selectedFiles.length}/5)</h3>
                            </div>
                            
                            <div 
                                className={`rp-upload-box ${isDragging ? 'dragging' : ''}`}
                                onDragOver={onDragOver} onDragLeave={onDragLeave} onDrop={onDrop}
                                onClick={() => fileInputRef.current.click()}
                            >
                                <input 
                                    type="file" multiple accept="image/*" 
                                    ref={fileInputRef} onChange={handleFileChange} hidden 
                                />
                                <div className="rp-upload-label">
                                    <div className="rp-upload-icon"><FaCloudUploadAlt/></div>
                                    <span style={{fontWeight: 700}}>Kéo thả ảnh vào đây hoặc Bấm để chọn</span>
                                    <small style={{color: '#94a3b8'}}>Hỗ trợ JPG, PNG (Tối đa 5 ảnh)</small>
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
                            <textarea 
                                className="rp-textarea" name="description" rows="5"
                                placeholder="Mô tả kỹ hơn về phòng, nội thất có sẵn, an ninh khu vực, giờ giấc đi lại..." 
                                value={formData.description} onChange={handleChange} required 
                            />
                        </div>
                    </div>

                    {/* --- CỘT PHẢI: PREVIEW & ACTIONS --- */}
                    <div className="rp-col-right">
                        <div className="rp-preview-header">Xem trước tin đăng</div>
                        
                        {/* LIVE PREVIEW CARD */}
                        <div className="rp-live-card">
                            <div className="rp-live-img">
                                {previewImages.length > 0 ? <img src={previewImages[0]} alt="cover" /> : <FaImages size={40}/>}
                                <div className="rp-live-badge">Tìm người ở ghép</div>
                            </div>
                            <div className="rp-live-body">
                                <h4 className="rp-live-title">{formData.title || 'Tiêu đề tin sẽ hiện ở đây...'}</h4>
                                <div className="rp-live-price">{formatPrice(formData.price)} <span>VNĐ/tháng</span></div>
                                <div className="rp-live-row">
                                    <FaMapPin /> 
                                    <span className="truncate">
                                        {formData.district || 'Quận'}, {formData.city || 'Thành phố'}
                                    </span>
                                </div>
                                <div className="rp-live-row">
                                    <FaVenusMars /> 
                                    <span>
                                        {formData.genderPartner === 'MALE' ? 'Tìm Nam' : 
                                         formData.genderPartner === 'FEMALE' ? 'Tìm Nữ' : 'Nam/Nữ'}
                                    </span>
                                </div>
                                {(formData.ageMin || formData.ageMax) && (
                                    <div className="rp-live-row" style={{color: '#6366f1'}}>
                                        <FaCheckCircle size={12}/> Tuổi: {formData.ageMin || '..'} - {formData.ageMax || '..'}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* TIPS WIDGET */}
                        <div className="rp-tips">
                            <h4><FaLightbulb /> Mẹo đăng tin</h4>
                            <ul>
                                <li><FaCheckCircle size={10}/> Ảnh thật giúp tăng 40% độ tin cậy.</li>
                                <li><FaCheckCircle size={10}/> Ghi rõ chi phí để tránh hiểu lầm.</li>
                                <li><FaCheckCircle size={10}/> Nêu rõ thói quen để tìm người hợp cạ.</li>
                            </ul>
                        </div>

                        {/* ACTIONS BUTTONS */}
                        <div className="rp-actions">
                            <button type="submit" className="rp-btn-submit" disabled={loading}>
                                {loading ? 'Đang xử lý...' : <><FaPaperPlane /> Đăng tin ngay</>}
                            </button>
                            <button type="button" className="rp-btn-cancel" onClick={() => window.history.back()}>Hủy bỏ</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RoommatePostPage;