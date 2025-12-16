import React, { useState, useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { UserContext } from '../contexts/UserContext.jsx';
import { useNavigate } from 'react-router-dom';
import { toast, Toaster } from 'react-hot-toast';
import '../css/PostRoomPage.css';
import { 
            FaHome, FaMapMarked , FaImages, FaInfoCircle, FaDollarSign, FaCloudUploadAlt, 
            FaTrash, FaTags, FaMapPin, FaLightbulb,
            FaPaperPlane
        } from 'react-icons/fa';

const PostRoomPage = () => {
    const { user } = useContext(UserContext);
    const navigate = useNavigate();
    const [ selectedImages, setSelectedImages ] = useState([]);
    const [ previewUrls, setPreviewUrls ] = useState([]);
    
    // state hieu ung keo tha anh
    const [isDragging, setIsDragging] = useState(false);

    const { register, handleSubmit, setValue, watch, formState: { errors, isSubmitting }} = useForm();

    const watchedValues = watch();

    const [provinces, setProvinces] = useState([]); // danh sach tinh/thanh pho
    const [districts, setDistricts] = useState([]); // danh sach quan/huyen
    const [wards, setWards] = useState([]); // danh sach phuong/xa 

    const [selectedProvince, setSelectedProvince] = useState(''); // ID tinh dang chon
    const [selectedDistrict, setSelectedDistrict] = useState(''); // ID huyen dang chon

    useEffect(() => {
        const fetchProvinces = async () => {
            try {
                const res = await axios.get('https://esgoo.net/api-tinhthanh/1/0.htm');
                if(res.data.error === 0) {
                    setProvinces(res.data.data);
                }
            } catch (error) {
                console.error("Lỗi lấy tỉnh thành:", error);
            }
        };
        fetchProvinces();
    }, []);

    // xu ly khi chon tinh/thanh pho
    const handleProvinceChange = async (e) => {
        const provinceId = e.target.value;
        setSelectedProvince(provinceId);

        // reset quan/huyen va phuong/xa
        setDistricts([]);
        setWards([]);
        setSelectedDistrict('');
        setValue('district', '');
        setValue('ward', '');

        // tim ten tinh de luu vao form
        const provinceName = provinces.find(p => p.id === provinceId)?.full_name || '';
        setValue('city', provinceName);

        // load danh sach quan huyen
        try {
            const res = await axios.get(`https://esgoo.net/api-tinhthanh/2/${provinceId}.htm`);
            if(res.data.error === 0) {
                setDistricts(res.data.data);
            }
        } catch (error) {
            console.error("Lỗi lấy quận huyện:", error);
        }
    };

    const formatPrice = (price) => {
        if(!price || isNaN(price)) return '0';
        return Number(price).toLocaleString("vi-VN");
    }

    // xu ly khi chon quan/huyen
    const handleDistrictChange = async (e) => {
        const districtId = e.target.value;
        setSelectedDistrict(districtId);

        // reset phuong/xa
        setWards([]);
        setValue('ward', '');

        // tim ten quan de luu vao form
        const districtName = districts.find(d => d.id === districtId)?.full_name || '';
        setValue('district', districtName);

        // load danh sach phuong xa
        try {
            const res = await axios.get(`https://esgoo.net/api-tinhthanh/3/${districtId}.htm`);
            if(res.data.error === 0) {
                setWards(res.data.data);
            }
        } catch (error) {
            console.error("Lỗi lấy phường xã:", error);
        }
    };

    // xu ly khi chon phuong xa
    const handleWardChange = (e) => {
        const wardId = e.target.value;
        const wardName = wards.find(w => w.id === wardId)?.full_name || '';
        setValue('ward', wardName);
    }

    // them anh
    const processFiles = (files) => {
        if(selectedImages.length + files.length > 10) {
            toast.error("Bạn chỉ được đăng tối đa 10 ảnh!");
            return;
        }

        // them anh moi vao mang
        setSelectedImages(prev => [...prev, ...files]);

        const newUrls = files.map(file => URL.createObjectURL(file));
        setPreviewUrls(prev => [...prev, ...newUrls]);
    };

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        
        processFiles(files);

        e.target.value = '';
    }

    // xoa anh khoi lua chon (nut x)
    const removeImage = (indexToRemove) => {
        setSelectedImages(prev => prev.filter((_, index) => index !== indexToRemove));

        setPreviewUrls(prev => {
            URL.revokeObjectURL(prev[indexToRemove]); // giai phong bo nho
            return prev.filter((_, index) => index !== indexToRemove);
        });
    }

    // cac ham keo tha anh
    const onDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    }
    const onDragLeave = (e) => {
        e.preventDefault();
        setIsDragging(false);
    }
    const onDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);

        const files = Array.from(e.dataTransfer.files);

        const validFiles = files.filter(file => file.type.startsWith('image/'));

        if(validFiles.length > 0) {
            processFiles(validFiles);
        } else {
            toast.error("Vui lòng chỉ kéo thả file ảnh!");
        }
    }

    const onSubmit = async (data) => {
        if (selectedImages.length === 0) {
            toast.error("vui lòng chọn ít nhất 1 ảnh minh họa!");
            return;
        }

        try {
            const formData = new FormData();

            // lay ten tinh tu id
            const selectedProv = provinces.find(p => p.id === data.province_id);
            const cityName = selectedProv ? selectedProv.full_name : '';

            // lay huyen tu id
            const selectedDist = districts.find(d => d.id === data.district_id);
            const districtName = selectedDist ? selectedDist.full_name : '';

            // lay xa tu id
            const selectedWard = wards.find(w => w.id === data.ward_id);
            const wardName = selectedWard ? selectedWard.full_name : '';

            formData.append('city', cityName);
            formData.append('district', districtName);
            formData.append('ward', wardName);
            formData.append('title', data.title);
            formData.append('description', data.description);
            formData.append('price', data.price);
            formData.append('area', data.area);
            formData.append('address', data.address);
            formData.append('category', data.category);
            formData.append('price_electricity', data.price_electricity || 0);
            formData.append('price_water', data.price_water || 0);
            formData.append('price_internet', data.price_internet || 0);
            formData.append('expire_duration', data.duration || 7);

            // append du lieu k co trong data (user_id va anh)
            formData.append('user_id', Number(user.id));

            // kiem tra user.id truoc khi gui
            if(!user || !user.id) {
                toast.error("Bạn cần đăng nhập trước khi đăng tin!")
                return;
            };

            selectedImages.forEach((file) => {
                formData.append('images', file);
            });

            // gui API
            await axios.post('http://localhost:5000/api/posts/create', formData, {
                headers: { "Content-Type": "multipart/form-data" }
            });

            toast.success("Đăng tin thành công!");
            setTimeout(() => navigate('/dashboard'), 1500);

        } catch (error) {
            console.error(error);
            toast.error("Đăng tin thất bại: " + (error.response?.data?.message || "Lỗi server"));
        }
    };

    return (
        <div className="post-page-wrapper">
            <Toaster position="top-center" reverseOrder={false} />

            <div className="post-container-xl">
                <div className="post-header">
                    <h1>Đăng tin phòng trọ</h1>
                    <p>Tiếp cận hàng ngàn người thuê trọ mỗi ngày chỉ với vài bước đơn giản</p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="post-grid-layout">
                    <div className="left-column">
                        {/* Section 1: Thong tin co ban*/}
                        <div className="form-section">
                            <div className="section-title">
                                <div className="icon-box"><FaHome /></div>
                                <h3>Thông tin cơ bản</h3>
                            </div>

                            <div className="form-group">
                                <label>Tiêu đề tin đăng <span className="required">*</span></label>
                                <input
                                    type="text"
                                    className={errors.title ? "input-error" : ""}
                                    placeholder="VD: Phòng trọ cao cấp, full nội thất, gần ĐH Việt Hàn..."
                                    {...register('title', {required: true})}
                                />
                                {errors.title && <span className="error-msg">Tiêu đề không được để trống</span>}
                            </div>

                            <div className="form-row two-cols">
                                <div className="form-group">
                                    <label>Loại phòng</label>
                                    <select {...register('category')}>
                                        <option value="PHONG_TRO">Phòng trọ</option>
                                        <option value="CHUNG_CU">Chung cư</option>
                                        <option value="NHA_NGUYEN_CAN">Nhà nguyên căn</option>
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label>Thời hạn hiển thị</label>
                                    <select {...register('duration', {required: true})}>
                                        <option value="7">7 ngày</option>
                                        <option value="15">15 ngày</option>
                                        <option value="30">30 ngày</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Section 2: Chi phi & dien tich */}
                        <div className="form-section">
                            <div className="section-title">
                                <div className="icon-box"><FaTags /></div>
                                <h3>Chi phí & diện tích</h3>
                            </div>

                            <div className="form-row two-cols">
                                <div className="form-group">
                                    <label>Giá thuê (VNĐ/tháng) <span className="required">*</span></label>
                                    <input
                                        type="number"
                                        step="1000"
                                        {...register('price', {required: true})}
                                        placeholder="Nhập giá phòng..."
                                    />
                                </div>
                                
                                <div className="form-group">
                                    <label>Diện tích (m²) <span className="required">*</span></label>
                                    <input type="number" step="1" {...register('area', {required: true})} placeholder="Nhập diện tích..." />
                                </div>
                            </div>

                            <div style={{marginTop: 20}}>
                                <label style={{fontSize: '1rem', fontWeight: 600, marginBottom: 8, display: 'block', color: '#beb200ff'}}>
                                    Dịch vụ (Nhập 0 nếu miễn phí)
                                </label>
                                <div className="form-row three-cols">
                                    <div className="form-group">
                                        <label>Giá điện (đ/kwh)</label>
                                        <input type="number" {...register('price_electricity')} placeholder="0" />
                                    </div>

                                    <div className="form-group">
                                        <label>Giá nước (đ/khối)</label>
                                        <input type="number" {...register('price_water')} placeholder="0" />
                                    </div>

                                    <div className="form-group">
                                        <label>Internet (đ/tháng)</label>
                                        <input type="number" {...register('price_internet')} placeholder="0" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Section 3: Dia chi */}
                        <div className="form-section">
                            <div className="section-title">
                                <div className="icon-box"><FaMapMarked /></div>
                                <h3>Địa chỉ (63 Tỉnh thành cũ)</h3>
                            </div>

                            <div className="form-row three-cols">
                                <div className="form-group">
                                    <label>Tỉnh/Thành phố <span className="required">*</span></label>
                                    <select
                                        className={errors.city ? "input-error" : ""}
                                        {...register('province_id', {
                                            required: true,
                                            onChange: (e) => handleProvinceChange(e)
                                        })}
                                    >
                                        <option value="">-- Chọn Tỉnh/Thành Phố --</option>
                                        {provinces.map((province) => (
                                            <option key={province.id} value={province.id}>
                                                {province.full_name}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label>Quận/Huyện <span className="required">*</span></label>
                                    <select
                                        className={errors.district ? "input-error": ""}
                                        {...register('district_id', {
                                            required: true,
                                            onChange: (e) => handleDistrictChange(e)
                                        })}
                                    >
                                        <option value="">-- Chọn Quận/Huyện --</option>
                                        {districts.map((district) => (
                                            <option key={district.id} value={district.id}>
                                                {district.full_name}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label>Phường/Xã <span className="required">*</span></label>
                                    <select
                                        disabled={!selectedDistrict}
                                        {...register('ward_id', {
                                            onChange: (e) => handleWardChange(e)
                                        })}
                                    >
                                        <option value="">-- Chọn Phường/Xã --</option>
                                        {wards.map((ward) => (
                                            <option key={ward.id} value={ward.id}>
                                                {ward.full_name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Địa chỉ cụ thể (Số nhà, tên đường) <span className="required">*</span></label>
                                <input
                                    {...register('address', { required: true })}
                                    placeholder="VD: 470 Trần Đại Nghĩa"
                                />
                            </div>
                        </div>

                        {/* Section 4: Hinh anh */}
                        <div className="form-section">
                            <div className="section-title">
                                <div className="icon-box"><FaImages /></div>
                                <h3>Hình ảnh (Đã chọn: {selectedImages.length}/10)</h3>
                            </div>

                            <div className={`upload-container ${isDragging ? 'dragging' : ''}`}
                                onDragOver={onDragOver}
                                onDragLeave={onDragLeave}
                                onDrop={onDrop}
                            >
                                <input
                                    type="file"
                                    id="file-upload"
                                    multiple
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="file-input-hidden"
                                />
                                <label htmlFor="file-upload" className="upload-label">
                                    <FaCloudUploadAlt className="upload-icon-circle" />
                                    <div>
                                        <span style={{fontWeight: 700, color: '#0f172a'}}>
                                            {isDragging ? "Kéo thả ảnh vào đây!" : "Bấm để chọn hoặc kéo thả ảnh vào đây"}
                                        </span>
                                    </div>
                                    <small style={{color: '#94a3b8'}}>Hỗ trợ: JPG, PNG, WEBP (Tối đa 10 ảnh)</small>
                                </label>
                            </div>

                            {previewUrls.length > 0 && (
                                <div className="image-preview-grid">
                                    {previewUrls.map((url, index) => (
                                        <div key={index} className="image-card">
                                            <img src={url} alt={`preview-${index}`} />

                                            <button
                                                type="button"
                                                className="btn-remove-image"
                                                onClick={() => removeImage(index)}
                                            >
                                                <FaTrash size={12} />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Section 5: Mo ta */}
                        <div className="form-section">
                            <div className="section-title">
                                <div className="icon-box"><FaInfoCircle /></div>
                                <h3>Mô tả chi tiết</h3>
                            </div>

                            <div className="form-group">
                                <textarea
                                    {...register('description', { required: true })}
                                    rows="8"
                                    placeholder="Hãy viết mô tả đầy đủ về: tiện ích, nội thất, giờ giấc, an ninh..."
                                ></textarea>
                            </div>
                        </div>
                    </div>

                    <div className="right-column">
                        <div className="right-column">
                            <div className="preview-title-bar">
                                Xem trước tin đăng
                            </div>

                            <div className="live-card">
                                <div className="live-card-img">
                                    {previewUrls.length > 0 ? <img src={previewUrls[0]} alt="cover" /> : <FaImages />}
                                    <div className="live-badge">
                                        {
                                            watchedValues.category === 'PHONG_TRO' ? 'Phòng trọ' :
                                            watchedValues.category === 'CHUNG_CU' ? 'Chung cư' :
                                            watchedValues.category === 'NHA_NGUYEN_CAN' ? 'Nguyên căn' : 'Không có'
                                        }
                                    </div>
                                </div>
                                <div className="live-card-body">
                                    <div className="live-category">
                                        {watchedValues.category ? watchedValues.category.replace('_', ' ') : 'Loại phòng'}
                                    </div>
                                    <h4 className="live-title">
                                        {watchedValues.title || 'Tiêu đề tin đăng sẽ hiển thị ở đây...'}
                                    </h4>
                                    <div className="live-price">
                                        {formatPrice(watchedValues.price)} <span>VNĐ/tháng</span>
                                    </div>
                                    <div className="live-address">
                                        <FaMapPin />
                                        <span className="truncate">
                                            {watchedValues.district || 'Huyện'}, {watchedValues.city || 'Tỉnh'}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="tips-widget">
                                <h4><FaLightbulb />Mẹo hay</h4>
                                <ul>
                                    <li>Hình ảnh rõ nét tăng 30% lượt xem.</li>
                                    <li>Tiêu đề đầy đủ địa điểm thu hút hơn.</li>
                                    <li>Điền đúng giá để tránh bị báo cáo.</li>
                                </ul>
                            </div>

                            <div className="form-actions">
                                <button type="submit" className="btn-submit" disabled={isSubmitting}>
                                    {isSubmitting ? 'Đang xử lý...' : <><FaPaperPlane />Đăng tin ngay</>}
                                </button>
                                <button type="button" className="btn-cancel" onClick={() => navigate(-1)}>Hủy bỏ</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default PostRoomPage;