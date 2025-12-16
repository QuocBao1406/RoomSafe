import React, { useState, useEffect, useContext, useRef } from 'react';
import axios from 'axios';
import { UserContext } from '../contexts/UserContext'; 
import { toast, Toaster } from 'react-hot-toast';
import { FaUserEdit, FaCamera, FaStar, FaCalendarAlt } from 'react-icons/fa';
import '../css/ProfilePage.css';

const ProfilePage = () => {
    const { setUser } = useContext(UserContext); 
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    
    // Ref để kích hoạt input file ẩn
    const fileInputRef = useRef(null);
    
    // State lưu file ảnh mới chọn
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);

    const [formData, setFormData] = useState({
        user_name: '',    
        email: '',        
        fullName: '',
        phone: '',
        address: '',
        gender: 'OTHER',
        birthday: '',
        bio: '',
        avatar: '', // URL ảnh hiện tại từ server
        role: 'TENANT',
        createdAt: '',
        rating: 0
    });

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/users/profile', {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            const data = res.data.data;
            
            setFormData({
                user_name: data.user_name,
                email: data.user_email,
                fullName: data.user_full_name || '',
                phone: data.user_phone || '',
                address: data.user_address || '',
                gender: data.user_gender || 'OTHER',
                birthday: data.user_birthday ? new Date(data.user_birthday).toISOString().split('T')[0] : '',
                bio: data.user_bio || '',
                avatar: data.user_avatar || '',
                role: data.user_role,
                createdAt: data.user_created_at,
                rating: data.user_avg_rating || 0
            });
            // Reset preview khi load mới
            setPreviewUrl(null);
            setSelectedFile(null);
            setLoading(false);
        } catch (error) {
            console.error(error);
            toast.error("Lỗi tải thông tin");
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // --- XỬ LÝ CHỌN ẢNH ---
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) {
                toast.error("Ảnh quá lớn! Vui lòng chọn ảnh dưới 5MB");
                return;
            }
            setSelectedFile(file);
            setPreviewUrl(URL.createObjectURL(file)); // Tạo link preview
        }
    };

    const handleAvatarClick = () => {
        if (isEditing && fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    // --- LƯU THÔNG TIN (DÙNG FORMDATA) ---
    const handleSave = async () => {
        try {
            const data = new FormData();
            data.append('fullName', formData.fullName);
            data.append('phone', formData.phone);
            data.append('address', formData.address);
            data.append('gender', formData.gender);
            data.append('birthday', formData.birthday);
            data.append('bio', formData.bio);

            // Chỉ gửi file nếu người dùng có chọn ảnh mới
            if (selectedFile) {
                data.append('avatar', selectedFile);
            }

            const res = await axios.put('http://localhost:5000/api/users/profile', data, {
                headers: { 
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                    "Content-Type": "multipart/form-data" // Quan trọng
                }
            });

            toast.success("Cập nhật thành công!");
            setIsEditing(false);
            
            // Cập nhật Context: Nếu có ảnh mới trả về từ server thì dùng, không thì dùng cái cũ
            const newAvatar = res.data.newAvatar || formData.avatar;
            
            // Cập nhật lại state formData để hiển thị ảnh mới chính thức
            setFormData(prev => ({...prev, avatar: newAvatar}));
            setPreviewUrl(null); // Xóa preview tạm
            setSelectedFile(null);

            if (setUser) {
                setUser(prev => ({ ...prev, name: formData.fullName, avatar: newAvatar }));
            }

        } catch (error) {
            console.error(error);
            toast.error("Cập nhật thất bại");
        }
    };

    if (loading) return <div style={{textAlign:'center', marginTop: 50}}>Đang tải...</div>;

    // Ảnh hiển thị: Ưu tiên ảnh preview (khi đang chọn), nếu không thì ảnh từ server, cuối cùng là ảnh placeholder
    const displayAvatar = previewUrl || formData.avatar || "https://via.placeholder.com/150";

    return (
        <div className="profile-wrapper">
            <Toaster position="top-center"/>
            
            <div className="profile-container">
                {/* --- SIDEBAR --- */}
                <div className="profile-sidebar">
                    <div className="avatar-box">
                        <img 
                            src={displayAvatar} 
                            alt="Avatar" 
                            className="avatar-img"
                            style={isEditing ? {opacity: 0.8} : {}}
                        />
                        
                        {/* Nút Camera chỉ hiện khi đang Edit */}
                        {isEditing && (
                            <>
                                <div 
                                    className="camera-overlay" 
                                    onClick={handleAvatarClick}
                                    title="Đổi ảnh đại diện"
                                >
                                    <FaCamera color="white" size={20}/>
                                </div>
                                {/* Input file ẩn */}
                                <input 
                                    type="file" 
                                    ref={fileInputRef} 
                                    onChange={handleFileChange} 
                                    accept="image/*"
                                    style={{display: 'none'}} 
                                />
                            </>
                        )}
                    </div>
                    
                    <h2 style={{fontSize: '20px', fontWeight: 'bold', margin: '10px 0 5px'}}>
                        {formData.fullName || formData.user_name}
                    </h2>
                    <p style={{color: '#6b7280', fontSize: '14px', marginBottom: '15px'}}>{formData.email}</p>
                    
                    <span className={`user-role-badge ${formData.role === 'LANDLORD' ? 'role-landlord' : 'role-tenant'}`}>
                        {formData.role === 'LANDLORD' ? 'Chủ trọ' : 'Người tìm trọ'}
                    </span>

                    <div className="sidebar-stats">
                        <div className="stat-item">
                            <span><FaCalendarAlt style={{marginRight: 5}}/> Tham gia:</span>
                            <b>{new Date(formData.createdAt).toLocaleDateString('vi-VN')}</b>
                        </div>
                        {formData.role === 'LANDLORD' && (
                            <div className="stat-item">
                                <span><FaStar style={{marginRight: 5, color:'#f59e0b'}}/> Đánh giá:</span>
                                <b>{Number(formData.rating).toFixed(1)} / 5.0</b>
                            </div>
                        )}
                    </div>
                </div>

                {/* --- FORM CONTENT --- */}
                <div className="profile-content">
                    <div className="content-header">
                        <h1 style={{fontSize: '24px', fontWeight: 'bold'}}>Hồ sơ cá nhân</h1>
                        {!isEditing ? (
                            <button className="btn-edit-toggle" onClick={() => setIsEditing(true)}>
                                <FaUserEdit style={{marginRight: 5}}/> Chỉnh sửa
                            </button>
                        ) : (
                            <div>
                                <button className="btn-edit-toggle btn-cancel" onClick={() => {
                                    setIsEditing(false); 
                                    setPreviewUrl(null); 
                                    setSelectedFile(null);
                                    fetchProfile(); // Reset lại dữ liệu cũ
                                }}>Hủy</button>
                                <button className="btn-edit-toggle" onClick={handleSave}>Lưu</button>
                            </div>
                        )}
                    </div>

                    <div className="form-grid">
                        <div className="form-group">
                            <label className="form-label">Tên đăng nhập (Không thể sửa)</label>
                            <input className="form-input" value={formData.user_name} disabled />
                        </div>
                        
                        <div className="form-group">
                            <label className="form-label">Email</label>
                            <input className="form-input" value={formData.email} disabled />
                        </div>

                        <div className="form-group">
                            <label className="form-label">Họ và tên</label>
                            <input 
                                className="form-input" name="fullName"
                                value={formData.fullName} onChange={handleChange}
                                disabled={!isEditing} placeholder="Nhập họ tên"
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">Số điện thoại</label>
                            <input 
                                className="form-input" name="phone"
                                value={formData.phone} onChange={handleChange}
                                disabled={!isEditing} placeholder="Số điện thoại liên hệ"
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">Giới tính</label>
                            <select 
                                className="form-select" name="gender"
                                value={formData.gender} onChange={handleChange}
                                disabled={!isEditing}
                            >
                                <option value="MALE">Nam</option>
                                <option value="FEMALE">Nữ</option>
                                <option value="OTHER">Khác</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label className="form-label">Ngày sinh</label>
                            <input 
                                type="date" className="form-input" name="birthday"
                                value={formData.birthday} onChange={handleChange}
                                disabled={!isEditing}
                            />
                        </div>

                        <div className="form-group full">
                            <label className="form-label">Địa chỉ</label>
                            <input 
                                className="form-input" name="address"
                                value={formData.address} onChange={handleChange}
                                disabled={!isEditing} placeholder="Địa chỉ của bạn"
                            />
                        </div>

                        <div className="form-group full">
                            <label className="form-label">Giới thiệu bản thân (Bio)</label>
                            <textarea 
                                className="form-textarea" rows="3" name="bio"
                                value={formData.bio} onChange={handleChange}
                                disabled={!isEditing} placeholder="Viết vài dòng về bạn..."
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;