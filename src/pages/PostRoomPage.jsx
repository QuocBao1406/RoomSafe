import React, { useState, useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { UserContext } from '../contexts/UserContext.jsx';
import { useNavigate } from 'react-router-dom';
import { toast, Toaster } from 'react-hot-toast';
import '../css/PostRoomPage.css';
import { FaHome, FaMapMarked , FaImages, FaInfoCircle, FaDollarSign, FaCloudUploadAlt } from 'react-icons/fa';

const PostRoomPage = () => {
    const { user } = useContext(UserContext);
    const navigate = useNavigate();
    const [ selectedImages, setSelectedImages ] = useState([]);
    const [ previewUrls, setPreviewUrls ] = useState([]);
    
    // state hieu ung keo tha anh
    const [isDragging, setIsDragging] = useState(false);

    const { register, handleSubmit, setValue, formState: { errors, isSubmitting }} = useForm();

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
            setTimeout(() => navigate('/landlord-dashboard'), 1500);

        } catch (error) {
            console.error(error);
            toast.error("Đăng tin thất bại: " + (error.response?.data?.message || "Lỗi server"));
        }
    };

    return (
        <div className="post-page-wrapper">
            <Toaster position="top-center" />

            <div className="post-container">
                <div className="post-header">
                    <h1>Đăng tin phòng trọ</h1>
                    <p>Điền thông tin chi tiết để thu hút người thuê nhanh chóng hơn</p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="post-form">
                    {/* Section 1: Thong tin co ban*/}
                    <div className="form-section">
                        <div className="section-title">
                            <FaHome className="icon" />
                            <h3>Thông tin cơ bản</h3>
                        </div>

                        <div className="form-group">
                            <label>Tiêu đề tin đăng <span className="required">*</span></label>
                            <input
                                type="text"
                                className={errors.title ? "input-error" : ""}
                                placeholder="Ví dụ phòng trọ cao cấp, full nội thất..."
                                {...register('title', {required: true})}
                            />
                            {errors.title && <span className="error-msg">Vui lòng nhập tiêu đề</span>}
                        </div>

                        <div className="form-row four-cols">
                            <div className="form-group">
                                <label>Loại phòng</label>
                                <div className="select-wrapper">
                                    <select {...register('category')}>
                                        <option value="PHONG_TRO">Phòng trọ</option>
                                        <option value="CHUNG_CU">Chung cư</option>
                                        <option value="NHA_NGUYEN_CAN">Nhà nguyên căn</option>
                                    </select>
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Thời hạn tin</label>
                            <div className="select-wrapper">
                                <select {...register('duration', {required: true})}>
                                    <option value="7">7 ngày</option>
                                    <option value="15">15 ngày</option>
                                    <option value="30">30 ngày</option>
                                </select>
                            </div>
                            </div>

                            <div className="form-group">
                                <label>Giá thuê (đ/tháng) <span className="required">*</span></label>
                                <input
                                    type="number"
                                    {...register('price', {required: true})}
                                    placeholder="Nhập giá phòng..."
                                />
                            </div>
                            
                            <div className="form-group">
                                <label>Diện tích (m²) <span className="required">*</span></label>
                                <input type="number" step="0.1" {...register('area', {required: true})} placeholder="Nhập diện tích..." />
                            </div>
                        </div>
                    </div>

                    {/* Section 2: Dia chi */}
                    <div className="form-section">
                        <div className="section-title">
                            <FaMapMarked  className="icon" />
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

                    {/* Section 3: Dich vu */}
                    <div className="form-section">
                        <div className="section-title">
                            <FaDollarSign className="icon" />
                            <h3>Chi phí dịch vụ</h3>
                        </div>

                        <div className="form-row three-cols">
                            <div className="form-group">
                                <label>Giá điện (đ/kwh)</label>
                                <input type="number" {...register('price_electricity')} placeholder="0 = Miễn phí" />
                            </div>

                            <div className="form-group">
                                <label>Giá nước (đ/khối)</label>
                                <input type="number" {...register('price_water')} placeholder="0 = Miễn phí" />
                            </div>

                            <div className="form-group">
                                <label>Internet (đ/tháng)</label>
                                <input type="number" {...register('price_internet')} placeholder="0 = Miễn phí" />
                            </div>
                        </div>
                    </div>

                    {/* Section 4: Hinh anh */}
                    <div className="form-section">
                        <div className="section-title">
                            <FaImages className="icon" />
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
                                <FaCloudUploadAlt className="upload-icon" />
                                <span>
                                    {isDragging ? "Kéo thả ảnh vào đây!" : "Bấm để chọn hoặc kéo thả ảnh vào đây"}
                                </span>
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
                                            &times; {/* dau nhan (x) */}
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Section 5: Mo ta */}
                    <div className="form-section">
                        <div className="section-title">
                            <FaInfoCircle className="icon" />
                            <h3>Mô tả chi tiết</h3>
                        </div>

                        <div className="form-group">
                            <textarea
                                {...register('description', { required: true })}
                                rows="6"
                                placeholder="Mô tả chi tiết về phòng trọ, tiện ích xung quanh, giờ giấc sinh hoạt..."
                            ></textarea>
                        </div>
                    </div>

                    {/* nut submit */}
                    <div className="form-actions">
                        <button type="button" className="btn-cancel" onClick={() => navigate(-1)}>Hủy bỏ</button>
                        <button type="submit" className="btn-submit" disabled={isSubmitting}>
                            {isSubmitting ? <span className="spinner"></span> : 'Đăng tin'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default PostRoomPage;