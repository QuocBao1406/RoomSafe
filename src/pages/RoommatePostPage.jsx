import React, { useState, useEffect, useRef, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, Toaster } from 'react-hot-toast';
import { UserContext } from '../contexts/UserContext.jsx';
import '../css/RoommatePost.css';
import { MapContainer, TileLayer, Marker, useMapEvents, useMap, ZoomControl } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Icons
import { 
    FaMapMarkedAlt, FaDollarSign, FaImages, FaInfoCircle, FaHome, FaCloudUploadAlt, FaTrash, 
    FaVenusMars, FaBriefcase, FaHeart, FaPaperPlane, FaLightbulb, FaMapPin, FaRulerCombined,
    FaGamepad, FaBolt, FaTint, FaWifi, FaClock, FaCheckCircle, FaStar
} from 'react-icons/fa';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const HABITS_LIST = [
    "Sạch sẽ", "Yên tĩnh", "Ngủ sớm", "Không hút thuốc", 
    "Thân thiện", "Nuôi thú cưng", "Nấu ăn", "Gọn gàng"
];

const HOBBIES_LIST = [
    "Game", "Thể thao", "Đọc sách", "Du lịch", 
    "Âm nhạc", "Xem phim", "Công nghệ", "Vẽ tranh"
];

const RoommatePostPage = () => {
    const { user } = useContext(UserContext);
    const navigate = useNavigate();
    const fileInputRef = useRef(null);

    // --- STATES ---
    const [loading, setLoading] = useState(false);
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [previewImages, setPreviewImages] = useState([]);
    const [isDragging, setIsDragging] = useState(false);
    
    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);

    const [coordinates, setCoordinates] = useState({ lat: 21.0285, lng: 105.8542 }); // Mặc định Hà Nội

    const [formData, setFormData] = useState({
        title: '', description: '', price: '', area: '', 
        priceElectricity: '', priceWater: '', priceInternet: '',
        city: '', district: '', ward: '', address: '',
        duration: '30', 
        genderPartner: 'ALL', ageMin: '', ageMax: '', career: '', 
        habits: '', hobbies: '', sharedCost: '',
        contactName: user?.name || '', 
        contactPhone: user?.phone || '',
    });

    const MapUpdater = ({ center }) => {
        const map = useMap();
        useEffect(() => {
            if (center) {
                map.flyTo(center, 13, { animate: true, duration: 1.5 });
            }
        }, [center, map]);
        return null;
    };

    const DraggableMarker = () => {
        const map = useMapEvents({
            click(e) { setCoordinates(e.latlng); },
        });
        return (
            <Marker
                draggable={true}
                eventHandlers={{
                    dragend: (e) => { setCoordinates(e.target.getLatLng()); },
                }}
                position={coordinates}
            />
        );
    };

    // --- EFFECTS ---
    useEffect(() => {
        const fetchProvinces = async () => {
            try {
                const res = await axios.get('https://esgoo.net/api-tinhthanh/1/0.htm');
                if(res.data.error === 0) setProvinces(res.data.data);
            } catch (error) { console.error("Lỗi API Tỉnh:", error); }
        };
        fetchProvinces();
    }, []);

    useEffect(() => {
        const fetchCoordinates = async () => {
            const { city, district, ward } = formData;
            if (city && district) {
                const query = `${ward ? ward + ',' : ''} ${district}, ${city}`;
                try {
                    const res = await axios.get(`https://nominatim.openstreetmap.org/search?format=json&q=${query}&countrycodes=vn&limit=1`);
                    if (res.data && res.data.length > 0) {
                        setCoordinates({
                            lat: parseFloat(res.data[0].lat),
                            lng: parseFloat(res.data[0].lon)
                        });
                    }
                } catch (error) { console.error("Lỗi tìm tọa độ:", error); }
            }
        };
        const timeoutId = setTimeout(() => fetchCoordinates(), 1000);
        return () => clearTimeout(timeoutId);
    }, [formData.city, formData.district, formData.ward]);

    // --- HANDLERS ---
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

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleToggleTag = (field, value) => {
        const currentStr = formData[field] || '';
        let items = currentStr ? currentStr.split(',') : [];
        if (items.includes(value)) items = items.filter(item => item !== value);
        else items.push(value);
        setFormData({ ...formData, [field]: items.join(',') });
    };

    const isTagSelected = (field, value) => {
        const currentStr = formData[field] || '';
        return currentStr.split(',').includes(value);
    };

    const formatPrice = (price) => {
        if(!price) return 0;
        return Number(price).toLocaleString('vi-VN');
    };

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        let token = localStorage.getItem('token');
        if (token && token.startsWith('"') && token.endsWith('"')) token = token.slice(1, -1);

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
            data.append("user_id", user.id);
            Object.keys(formData).forEach(key => data.append(key, formData[key]));

            data.append('latitude', coordinates.lat);
            data.append('longitude', coordinates.lng);

            selectedFiles.forEach(file => data.append('images', file));

            await axios.post('http://localhost:5000/api/roommates/create', data, {
                headers: { "Content-Type": "multipart/form-data", Authorization: `Bearer ${token}` },
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
            <Toaster position="top-center" toastOptions={{ duration: 3000 }} />
            
            <div className="rp-content-width">
                {/* HERO HEADER */}
                <div className="rp-header">
                    <h1>Đăng Tin Tìm Bạn Cùng Phòng</h1>
                    <p>Kết nối nhanh chóng, chia sẻ không gian sống lý tưởng cùng cộng đồng RoomSafe.</p>
                </div>

                <form onSubmit={handleSubmit} className="rp-grid">
                    {/* --- CỘT TRÁI: INPUT --- */}
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
                                    <label><FaDollarSign className="text-yellow-500"/> Giá thuê (VNĐ/tháng) <span className="rp-required">*</span></label>
                                    <input type="number" className="rp-input" name="price" placeholder="Ví dụ: 1500000" value={formData.price} onChange={handleChange} required />
                                </div>
                                <div className="rp-group">
                                    <label><FaRulerCombined className="text-blue-500"/> Diện tích (m²) <span className="rp-required">*</span></label>
                                    <input type="number" className="rp-input" name="area" placeholder="Ví dụ: 25" value={formData.area} onChange={handleChange} required />
                                </div>
                            </div>

                            <div className="rp-group">
                                <label><FaClock className="text-gray-500"/> Thời hạn hiển thị tin</label>
                                <select className="rp-select" name="duration" value={formData.duration} onChange={handleChange}>
                                    <option value="7">7 Ngày</option>
                                    <option value="15">15 Ngày</option>
                                    <option value="30">30 Ngày (Khuyên dùng)</option>
                                    <option value="60">60 Ngày</option>
                                </select>
                            </div>
                        </div>

                        {/* 2. ĐỊA ĐIỂM */}
                        <div className="rp-card">
                            <div className="rp-section-header">
                                <div className="rp-icon-box"><FaMapMarkedAlt /></div>
                                <h3>Địa điểm cho thuê</h3>
                            </div>
                            <div className="rp-row rp-cols-3">
                                <div className="rp-group">
                                    <label>Tỉnh / Thành phố <span className="rp-required">*</span></label>
                                    <select className="rp-select" onChange={handleProvinceChange} required>
                                        <option value="">-- Chọn Tỉnh --</option>
                                        {provinces.map(p => <option key={p.id} value={p.id} data-name={p.full_name}>{p.full_name}</option>)}
                                    </select>
                                </div>
                                <div className="rp-group">
                                    <label>Quận / Huyện <span className="rp-required">*</span></label>
                                    <select className="rp-select" onChange={handleDistrictChange} disabled={!districts.length} required>
                                        <option value="">-- Chọn Quận --</option>
                                        {districts.map(d => <option key={d.id} value={d.id} data-name={d.full_name}>{d.full_name}</option>)}
                                    </select>
                                </div>
                                <div className="rp-group">
                                    <label>Phường / Xã <span className="rp-required">*</span></label>
                                    <select className="rp-select" onChange={handleWardChange} disabled={!wards.length} required>
                                        <option value="">-- Chọn Phường --</option>
                                        {wards.map(w => <option key={w.id} value={w.id} data-name={w.full_name}>{w.full_name}</option>)}
                                    </select>
                                </div>
                            </div>
                            <div className="rp-group">
                                <label>Địa chỉ cụ thể <span className="rp-required">*</span></label>
                                <input className="rp-input" name="address" placeholder="Số nhà, tên đường, khu dân cư..." value={formData.address} onChange={handleChange} required />
                            </div>

                            <div style={{marginTop: '20px'}}>
                                <label style={{marginBottom:'10px', display:'block', fontWeight:600}}>Ghim vị trí trên bản đồ <span className="rp-required">*</span></label>
                                <div className="rp-map-box">
                                    <MapContainer 
                                        center={[coordinates.lat, coordinates.lng]} 
                                        zoom={13} 
                                        scrollWheelZoom={true} 
                                        style={{ height: "100%", width: "100%" }}
                                        zoomControl={false}
                                    >
                                        <TileLayer
                                            attribution='&copy; CARTO'
                                            url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
                                        />
                                        <DraggableMarker />
                                        <MapUpdater center={[coordinates.lat, coordinates.lng]} />
                                        <ZoomControl position="bottomright" />
                                    </MapContainer>
                                </div>
                                <small style={{color: '#64748b', marginTop: '5px', display:'block'}}>
                                    * Kéo thả ghim đỏ để chọn vị trí chính xác.
                                </small>
                            </div>
                        </div>

                        {/* 3. CHI PHÍ DỊCH VỤ */}
                        <div className="rp-card">
                            <div className="rp-section-header">
                                <div className="rp-icon-box"><FaBolt /></div>
                                <h3>Chi phí dịch vụ</h3>
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
                                <label>Ghi chú chia tiền</label>
                                <input className="rp-input" name="sharedCost" placeholder="VD: Tiền phòng chia đôi, điện nước theo công tơ..." value={formData.sharedCost} onChange={handleChange} />
                            </div>
                        </div>

                        {/* 4. TIÊU CHÍ */}
                        <div className="rp-card">
                            <div className="rp-section-header">
                                <div className="rp-icon-box"><FaVenusMars /></div>
                                <h3>Yêu cầu người ở ghép</h3>
                            </div>
                            <div className="rp-row rp-cols-2">
                                <div className="rp-group">
                                    <label>Giới tính mong muốn</label>
                                    <select className="rp-select" name="genderPartner" value={formData.genderPartner} onChange={handleChange}>
                                        <option value="ALL">Tất cả (Nam/Nữ)</option>
                                        <option value="MALE">Nam</option>
                                        <option value="FEMALE">Nữ</option>
                                    </select>
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

                            <div className="rp-group">
                                <label>Độ tuổi (Min - Max)</label>
                                <div className="rp-age-wrapper">
                                    <input className="rp-input" type="number" name="ageMin" placeholder="18" value={formData.ageMin} onChange={handleChange} />
                                    <span>—</span>
                                    <input className="rp-input" type="number" name="ageMax" placeholder="30" value={formData.ageMax} onChange={handleChange} />
                                </div>
                            </div>

                            <div className="rp-row rp-cols-1">
                                <div className="rp-group">
                                    <label><FaHeart className="text-pink-500"/> Thói quen sinh hoạt</label>
                                    <div className="rp-tags-container">
                                        {HABITS_LIST.map(habit => (
                                            <div 
                                                key={habit}
                                                className={`rp-tag-item ${isTagSelected('habits', habit) ? 'active' : ''}`}
                                                onClick={() => handleToggleTag('habits', habit)}
                                            >
                                                {habit}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="rp-group">
                                    <label><FaGamepad className="text-purple-500"/> Sở thích cá nhân</label>
                                    <div className="rp-tags-container">
                                        {HOBBIES_LIST.map(hobby => (
                                            <div 
                                                key={hobby}
                                                className={`rp-tag-item ${isTagSelected('hobbies', hobby) ? 'active' : ''}`}
                                                onClick={() => handleToggleTag('hobbies', hobby)}
                                            >
                                                {hobby}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 5. HÌNH ẢNH */}
                        <div className="rp-card">
                            <div className="rp-section-header">
                                <div className="rp-icon-box"><FaImages /></div>
                                <h3>Hình ảnh phòng ({selectedFiles.length}/5)</h3>
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
                                <div className="rp-upload-icon"><FaCloudUploadAlt/></div>
                                <div style={{fontSize:'1.1rem', fontWeight:'700', color:'#475569', marginBottom:'4px'}}>
                                    Kéo thả ảnh hoặc bấm để chọn
                                </div>
                                <div style={{color: '#94a3b8', fontSize: '0.9rem'}}>Hỗ trợ JPG, PNG (Tối đa 5 ảnh)</div>
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
                                className="rp-textarea" name="description" rows="6"
                                placeholder="Hãy mô tả thật kỹ về phòng, tiện ích xung quanh, giờ giấc, an ninh để người xem dễ hình dung..." 
                                value={formData.description} onChange={handleChange} required 
                            />
                        </div>
                    </div>

                    {/* --- CỘT PHẢI: PREVIEW --- */}
                    <div className="rp-col-right">
                        <div className="rp-preview-label">Xem trước tin đăng</div>
                        
                        <div className="rp-live-card">
                            <div className="rp-live-img">
                                {previewImages.length > 0 ? <img src={previewImages[0]} alt="cover" /> : <FaImages size={48}/>}
                                <div className="rp-live-badge">Đang tìm người</div>
                            </div>
                            <div className="rp-live-body">
                                <h4 className="rp-live-title">{formData.title || 'Tiêu đề tin của bạn sẽ hiện ở đây...'}</h4>
                                <div className="rp-live-price">
                                    {formatPrice(formData.price)} <span>VNĐ/tháng</span>
                                </div>
                                
                                <div className="rp-live-info">
                                    <div className="rp-live-item">
                                        <FaMapPin className="text-blue-500"/>
                                        <span className="truncate">{formData.district || 'Quận...'}</span>
                                    </div>
                                    <div className="rp-live-item">
                                        <FaVenusMars className="text-pink-500"/>
                                        <span>
                                            {formData.genderPartner === 'MALE' ? 'Nam' : 
                                             formData.genderPartner === 'FEMALE' ? 'Nữ' : 'Nam/Nữ'}
                                        </span>
                                    </div>
                                    <div className="rp-live-item">
                                        <FaRulerCombined className="text-gray-500"/>
                                        <span>{formData.area || '0'} m²</span>
                                    </div>
                                    {(formData.ageMin || formData.ageMax) && (
                                        <div className="rp-live-item">
                                            <FaStar className="text-yellow-500"/>
                                            <span>{formData.ageMin}-{formData.ageMax} tuổi</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="rp-tips">
                            <h4><FaLightbulb /> Mẹo nhỏ</h4>
                            <ul>
                                <li><FaCheckCircle size={12}/> Ảnh thật tăng 40% độ tin cậy.</li>
                                <li><FaCheckCircle size={12}/> Ghi rõ chi phí để tránh hiểu lầm.</li>
                                <li><FaCheckCircle size={12}/> Mô tả thói quen để tìm người hợp cạ.</li>
                            </ul>
                        </div>

                        <div className="rp-actions">
                            <button type="submit" className="rp-btn-submit" disabled={loading}>
                                {loading ? 'Đang xử lý...' : <><FaPaperPlane /> Đăng tin ngay</>}
                            </button>
                            <button type="button" className="rp-btn-cancel" onClick={() => window.history.back()}>Quay lại</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RoommatePostPage;