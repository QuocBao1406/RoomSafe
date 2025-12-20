import React, { useState, useEffect, useContext, useRef } from 'react';
import axios from 'axios';
import { UserContext } from '../contexts/UserContext'; 
import { toast, Toaster } from 'react-hot-toast';
import { FaUserEdit, FaCamera, FaStar, FaCalendarAlt, FaEnvelope, FaPhone, FaMapMarkerAlt, FaUser, FaVenusMars, FaBirthdayCake } from 'react-icons/fa';
import '../css/ProfilePage.css';

const ProfilePage = () => {
    const { setUser } = useContext(UserContext); 
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    
    const fileInputRef = useRef(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [formData, setFormData] = useState({});
    const [backupData, setBackupData] = useState({});

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        const token = localStorage.getItem('token');
        if(!token) return;

        try {
            const res = await axios.get('http://localhost:5000/api/users/profile', {
                headers: { Authorization: `Bearer ${token}` }
            });
            const data = res.data.data;
            const formatted = {
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
            };
            setFormData(formatted);
            setBackupData(formatted);
            setLoading(false);
        } catch (error) {
            console.error(error);
            toast.error("Lỗi tải thông tin");
            setLoading(false);
        }
    };

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
    
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const handleCancel = () => {
        setFormData(backupData);
        setIsEditing(false);
        setPreviewUrl(null);
        setSelectedFile(null);
    };

    const handleSave = async () => {
        try {
            const data = new FormData();
            data.append('fullName', formData.fullName);
            data.append('phone', formData.phone);
            data.append('address', formData.address);
            data.append('gender', formData.gender);
            data.append('birthday', formData.birthday);
            data.append('bio', formData.bio);
            if (selectedFile) data.append('avatar', selectedFile);

            const res = await axios.put('http://localhost:5000/api/users/profile', data, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}`, "Content-Type": "multipart/form-data" }
            });

            toast.success("Cập nhật thành công!");
            setIsEditing(false);
            const newAvatar = res.data.newAvatar || formData.avatar;
            const updated = { ...formData, avatar: newAvatar };
            setFormData(updated);
            setBackupData(updated);
            setPreviewUrl(null);
            setSelectedFile(null);
            if (setUser) setUser(prev => ({ ...prev, name: formData.fullName, avatar: newAvatar }));

        } catch (error) {
            toast.error("Cập nhật thất bại");
        }
    };

    if (loading) return <div style={{textAlign:'center', marginTop:50}}>Đang tải...</div>;
    const displayAvatar = previewUrl || formData.avatar || "https://via.placeholder.com/150";

    return (
        <div className="profile-wrapper">
            <Toaster position="top-center"/>
            
            <div className="profile-container">
                {/* --- SIDEBAR --- */}
                <div className="profile-sidebar">
                    <div className="sidebar-cover"></div>
                    <div className="sidebar-body">
                        <div className="avatar-wrapper">
                            <div className="avatar-box">
                                <img src={displayAvatar} alt="Avatar" className="avatar-img"/>
                            </div>
                            {isEditing && (
                                <div className="camera-overlay" onClick={() => fileInputRef.current.click()}>
                                    <FaCamera size={14}/>
                                </div>
                            )}
                            <input type="file" ref={fileInputRef} onChange={handleFileChange} hidden />
                        </div>

                        <h2 className="user-name">{formData.fullName || formData.user_name}</h2>
                        <p className="user-email">{formData.email}</p>
                        
                        <div className={`user-badge ${formData.role === 'LANDLORD' ? 'badge-landlord' : 'badge-tenant'}`}>
                            {formData.role === 'LANDLORD' ? 'Chủ trọ' : 'Người tìm trọ'}
                        </div>

                        <div className="sidebar-info-list">
                            <div className="info-item">
                                <span><FaCalendarAlt style={{color:'#94a3b8', marginRight:5}}/> Tham gia</span>
                                <b>{new Date(formData.createdAt).toLocaleDateString('vi-VN')}</b>
                            </div>
                            {formData.role === 'LANDLORD' && (
                                <div className="info-item">
                                    <span><FaStar style={{color:'#f59e0b', marginRight:5}}/> Đánh giá</span>
                                    <b>{Number(formData.rating).toFixed(1)} / 5.0</b>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* --- CONTENT --- */}
                <div className="profile-content">
                    <div className="content-header">
                        <div>
                            <h1>Hồ sơ cá nhân</h1>
                            <p>Quản lý thông tin và bảo mật tài khoản</p>
                        </div>
                        {!isEditing ? (
                            <button className="btn-action btn-edit" onClick={() => setIsEditing(true)}>
                                <FaUserEdit /> Chỉnh sửa
                            </button>
                        ) : (
                            <div style={{display:'flex', gap:10}}>
                                <button className="btn-action btn-cancel" onClick={handleCancel}>Hủy</button>
                                <button className="btn-action btn-save" onClick={handleSave}>Lưu</button>
                            </div>
                        )}
                    </div>

                    <div className="form-grid">
                        <div className="form-section-title">Thông tin tài khoản</div>
                        
                        <div className="form-group">
                            <label><FaUser style={{color:'#94a3b8'}}/> Tên đăng nhập</label>
                            <input className="form-input read-only" value={formData.user_name} disabled />
                        </div>
                        <div className="form-group">
                            <label><FaEnvelope style={{color:'#94a3b8'}}/> Email</label>
                            <input className="form-input read-only" value={formData.email} disabled />
                        </div>

                        <div className="form-section-title">Thông tin cá nhân</div>

                        <div className="form-group">
                            <label>Họ và tên</label>
                            <input 
                                className={`form-input ${isEditing ? 'editable' : ''}`}
                                name="fullName" value={formData.fullName} onChange={handleChange}
                                disabled={!isEditing} placeholder="Chưa cập nhật"
                            />
                        </div>
                        <div className="form-group">
                            <label><FaPhone style={{color:'#94a3b8'}}/> Số điện thoại</label>
                            <input 
                                className={`form-input ${isEditing ? 'editable' : ''}`}
                                name="phone" value={formData.phone} onChange={handleChange}
                                disabled={!isEditing} placeholder="Chưa cập nhật"
                            />
                        </div>
                        <div className="form-group">
                            <label><FaVenusMars style={{color:'#94a3b8'}}/> Giới tính</label>
                            <select 
                                className={`form-input ${isEditing ? 'editable' : ''}`}
                                name="gender" value={formData.gender} onChange={handleChange}
                                disabled={!isEditing}
                            >
                                <option value="MALE">Nam</option>
                                <option value="FEMALE">Nữ</option>
                                <option value="OTHER">Khác</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label><FaBirthdayCake style={{color:'#94a3b8'}}/> Ngày sinh</label>
                            <input 
                                type="date" className={`form-input ${isEditing ? 'editable' : ''}`}
                                name="birthday" value={formData.birthday} onChange={handleChange}
                                disabled={!isEditing}
                            />
                        </div>
                        <div className="form-group full-width">
                            <label><FaMapMarkerAlt style={{color:'#94a3b8'}}/> Địa chỉ</label>
                            <input 
                                className={`form-input ${isEditing ? 'editable' : ''}`}
                                name="address" value={formData.address} onChange={handleChange}
                                disabled={!isEditing} placeholder="Chưa cập nhật"
                            />
                        </div>
                        <div className="form-group full-width">
                            <label>Giới thiệu bản thân</label>
                            <textarea 
                                rows="3" className={`form-input form-textarea ${isEditing ? 'editable' : ''}`}
                                name="bio" value={formData.bio} onChange={handleChange}
                                disabled={!isEditing} placeholder="Hãy viết gì đó về bạn..."
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;