import React, { useState, useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { UserContext } from '../contexts/UserContext.jsx';
import { useNavigate, useParams } from 'react-router-dom';
import { toast, Toaster } from 'react-hot-toast';
import {
    FaSave, FaArrowLeft, FaCamera, FaMapMarkerAlt, FaInfoCircle,
    FaDollarSign, FaTrash, FaCheckCircle,  FaLayerGroup, FaImage
} from 'react-icons/fa';
import '../css/EditRoomPage.css';

const EditRoomPage = () => {
    const {user} = useContext(UserContext);
    const navigate = useNavigate();
    const {id} = useParams();

    // state quan ly anh
    const [existingImages, setExistingImages] = useState([]);
    const [selectedImages, setSelectedImages] = useState([]);
    const [previewUrls, setPreviewUrls] = useState([]);

    // dropdown dia chi
    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);

    const {register, handleSubmit, setValue, formState: {isSubmitting}} = useForm();

    // load du lieu bai viet cu
    useEffect (() => {
        const loadData = async () => {
            try {
                const resProv = await axios.get('https://esgoo.net/api-tinhthanh/1/0.htm');
                if(resProv.data.error === 0) setProvinces(resProv.data.data);

                // load bai viet
                const resPost = await axios.get(`http://localhost:5000/api/posts/detail/${id}`);
                const post = resPost.data.data;

                //dien du lieu vao form
                const fields = ['title', 'description', 'price', 'area', 'address', 'category', 'price_electricity', 'price_water', 'price_internet'];
                fields.forEach(field => setValue(field, post[`post_${field}`] || post[field]));

                //dia chi text
                setValue('city', post.post_city);
                setValue('district', post.post_district);
                setValue('ward', post.post_ward);

                if (post.images) setExistingImages(post.images);
            } catch (error) {
                toast.error("Lỗi tải dữ liệu");
            }
        };
        loadData();
    }, [id, setValue]);

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

    const removeNewImage = (index) => {
        setSelectedImages(prev => prev.filter((_, i) => i !== index));
        setPreviewUrls(prev => prev.filter((_, i) => i !== index));
    }

    const removeExistingImage = (imgId) => {
        if(window.confirm("Xóa ảnh này?")) {
            setExistingImages(prev => prev.filter(img => img.image_id !== imgId));
        }
    }

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        if(existingImages.length + selectedImages.length + files.length > 10) {
            toast.error("Tối đa 10 ảnh"); return;
        }
        setSelectedImages([...selectedImages, ...files]);
        setPreviewUrls([...previewUrls, ...files.map(f => URL.createObjectURL(f))]);
    }

    const onSubmit = async (data) => {
        try {
            const formData = new FormData();

            Object.keys(data).forEach(key => formData.append(key, data[key]));
            if(data.city) {
                formData.append('city', data.city);
                formData.append('district', data.district);
                formData.append('ward', data.ward);
            }

            selectedImages.forEach(file => formData.append('images', file));

            await axios.put(`http://localhost:5000/api/posts/update/${id}`, formData, {
                haeder: {
                    "Content-Type": "multipart/form-data"
                }
            });

            toast.success("Cập nhật thành công!");
            setTimeout(() => navigate('/manage-post'), 1000);
        } catch (error) {
            console.error("Lỗi server:", error);
            toast.error("Lỗi cập nhật!");
        }
    }

    return (
        <div className="edit-room-wrapper">
            <Toaster position="top-center" />

            <div className="edit-header-bar">
                <div className="header-left">
                    <button className="btn-back" onClick={() => navigate(-1)} title="Quay lại">
                        <FaArrowLeft />
                    </button>
                    <div className="edit-header-title">
                        <h1>Chỉnh sửa tin đăng <span className="sub-id">#{id}</span></h1>
                    </div>
                </div>

                <div className="header-right">
                    <button className="btn-save-top" onClick={handleSubmit(onSubmit)} disabled={isSubmitting}>
                        {isSubmitting ? <span className="spinner"></span> : <><FaSave /> Lưu thay đổi</>}
                    </button>
                </div>
            </div>

            <div className="edit-layout">
                <div className="edit-sidebar">
                    <div className="sidebar-sticky">
                        <div className="nav-label">Mục lục</div>
                        <nav className="nav-menu">
                            <a href="#section-info" className="nav-link">
                                <FaInfoCircle /> Thông tin chung
                            </a>
                            <a href="#section-address" className="nav-link">
                                <FaMapMarkerAlt /> Địa chỉ & Vị trí
                            </a>
                            <a href="#section-price" className="nav-link">
                                <FaDollarSign /> Giá & Dịch vụ
                            </a>
                            <a href="#section-images" className="nav-link">
                                <FaImage /> Thư viện ảnh
                            </a>
                        </nav>
                    </div>
                </div>

                <div className="edit-content">
                    <form onSubmit={handleSubmit(onSubmit)}>

                        {/* Section 1: INFO */}
                        <div id="section-info" className="edit-card">
                            <div className="card-header-row">
                                <div className="card-title">
                                    <FaLayerGroup className="text-blue-500" /> Thông tin cơ bản
                                </div>
                                <div className="card-subtitle">
                                    Các thông tin hiển thị chính trên thẻ bài đăng
                                </div>
                            </div>
                            <div className="form-grid">
                                <div className="field-group full-width">
                                    <label>Tiêu đề bài đăng</label>
                                    <input type="text" {...register('title')} className="input-modern" />
                                </div>
                                {/* Đã sửa classNam -> className */}
                                <div className="field-group">
                                    <label>Loại phòng</label>
                                    <select {...register('category')} className="input-modern">
                                        <option value="PHONG_TRO">Phòng trọ</option>
                                        <option value="CHUNG_CU">Chung cư</option>
                                        <option value="NHA_NGUYEN_CAN">Nhà nguyên căn</option>
                                    </select>
                                </div>
                                {/* Đã sửa classNam -> className và input-morden -> input-modern */}
                                <div className="field-group">
                                    <label>Diện tích (m²)</label>
                                    <input type="number" {...register('area')} className="input-modern" />
                                </div>
                                {/* Đã sửa row -> rows */}
                                <div className="field-group full-width">
                                    <label>Mô tả chi tiết</label>
                                    <textarea {...register('description')} rows="5" className="input-modern" />
                                </div>
                            </div>
                        </div>

                        {/* Section 2: ADDRESS */}
                        <div id="section-address" className="edit-card">
                            <div className="card-header-row">
                                <div className="card-title">
                                    <FaMapMarkerAlt /> Địa chỉ & Vị trí
                                </div>
                                <div className="card-subtitle">Chỉ thay đổi các ô chọn nếu bạn muốn cập nhật lại vị trí mới.</div>
                            </div>

                            <div className="form-grid-3">
                                <div className="field-group">
                                    <label>Tỉnh/Thành phố</label>
                                    <select onChange={handleProvinceChange} className="input-modern">
                                        <option value="">Chọn tỉnh/TP</option>
                                        {provinces.map(p => <option key={p.id} value={p.id}>{p.full_name}</option>)}
                                    </select>
                                </div>
                                <div className="field-group">
                                    <label>Quận/Huyện</label>
                                    <select onChange={handleDistrictChange} className="input-modern">
                                        <option value="">Chọn Quận/Huyện</option>
                                        {districts.map(p => <option key={p.id} value={p.id}>{p.full_name}</option>)}
                                    </select>
                                </div>
                                <div className="field-group">
                                    <label>Phường/Xã</label>
                                    <select onChange={handleWardChange} className="input-modern">
                                        <option value="">Chọn Phường/Xã</option>
                                        {wards.map(p => <option key={p.id} value={p.id}>{p.full_name}</option>)}
                                    </select>
                                </div>
                            </div>
                            <div className="field-group full-width mt-4" style={{ marginTop: '20px' }}>
                                <label>Số nhà, Tên đường</label>
                                <input type="text" {...register('address')} className="input-modern" />
                            </div>
                        </div>

                        {/* Section 3: PRICE */}
                        <div id="section-price" className="edit-card">
                            <div className="card-header-row">
                                {/* Đã sửa classNAme -> className */}
                                <div className="card-title"><FaDollarSign /> Giá & Chi phí</div>
                            </div>
                            {/* Đã sửa classNAme -> className */}
                            <div className="form-grid">
                                <div className="field-group">
                                    <label>Giá thuê phòng (VNĐ/tháng)</label>
                                    {/* Đã sửa blod -> bold */}
                                    <input type="number" {...register('price')} className="input-modern" style={{ fontWeight: 'bold', color: '#dc2626' }} />
                                </div>
                                <div className="field-group">
                                    <label>Giá điện (kwh)</label>
                                    <input type="number" {...register('price_electricity')} className="input-modern" />
                                </div>
                                {/* Đã sửa classNAme -> className */}
                                <div className="field-group">
                                    <label>Giá nước (khối/người)</label>
                                    <input type="number" {...register('price_water')} className="input-modern" />
                                </div>
                                <div className="field-group">
                                    <label>Internet (tháng)</label>
                                    <input type="number" {...register('price_internet')} className="input-modern" />
                                </div>
                            </div>
                        </div>

                        {/* Section 4: IMAGES */}
                        <div id="section-images" className="edit-card">
                            <div className="card-header-row">
                                <div className="card-title">
                                    <FaCamera /> Thư viện ảnh
                                    {/* Đã sửa nomal -> normal */}
                                    <span style={{ fontSize: '0.9rem', color: '#64748b', marginLeft: '10px', fontWeight: 'normal' }}>
                                        ({existingImages.length + selectedImages.length}/10)
                                    </span>
                                </div>
                            </div>
                            <div className="gallery-grid">
                                <label className="add-photo-btn">
                                    <FaCamera style={{ fontSize: '24px' }} />
                                    <span>Thêm ảnh</span>
                                    <input type="file" hidden multiple onChange={handleImageChange} accept="image/*" />
                                </label>
                                
                                {existingImages.map(img => (
                                    <div key={img.image_id} className="img-preview-box">
                                        <img src={img.image_url} alt="old" />
                                        <div className="img-tag">Ảnh cũ</div>
                                        {/* Đã sửa onChange -> onClick */}
                                        <button type="button" className="btn-remove-img" onClick={() => removeExistingImage(img.image_id)}>
                                            <FaTrash size={12} />
                                        </button>
                                    </div>
                                ))}

                                {previewUrls.map((url, idx) => (
                                    <div key={idx} className="img-preview-box">
                                        <img src={url} alt="new" />
                                        <div className="img-tag new">Mới tải lên</div>
                                        <button type="button" className="btn-remove-img" onClick={() => removeNewImage(idx)}>
                                            <FaTrash size={12} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default EditRoomPage;