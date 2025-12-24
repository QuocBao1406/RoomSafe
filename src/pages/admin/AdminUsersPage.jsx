import React, { useEffect, useState, useContext } from "react";
import { toast, Toaster } from "react-hot-toast";
import AdminLayout from "../../components/admin/AdminLayout.jsx";
import adminApi from "../../services/adminApi.js";
import { UserContext } from "../../contexts/UserContext.jsx";
import { useNavigate } from "react-router-dom";
import { FaSearch, FaEdit, FaTrash, FaUserEdit, FaTimes, FaUsers, FaUserCheck, FaUserClock } from "react-icons/fa";
import "../../css/AdminUsers.css";

const AdminUsersPage = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);

  // Tính toán thống kê nhanh
  const stats = {
      total: users.length,
      active: users.filter(u => (u.verification || u.user_verification) === 'VERIFIED').length,
      pending: users.filter(u => (u.verification || u.user_verification) === 'PENDING').length
  };

  const load = async () => {
    try {
      setLoading(true);
      if (!user?.token) return;
      const res = await adminApi.listUsers(user.token);
      const data = res.data.data || [];
      setUsers(data);
      setFilteredUsers(data);
    } catch (error) {
      toast.error("Lỗi kết nối server");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!user || user.role !== "ADMIN") { navigate("/login"); return; }
    load();
  }, [user]);

  useEffect(() => {
    if (!search) {
      setFilteredUsers(users);
    } else {
      const lower = search.toLowerCase();
      const filtered = users.filter(u => {
        const name = `${u.user_first_name || ""} ${u.user_last_name || ""}`.trim() || "";
        const email = u.email || u.user_email || "";
        const phone = u.phone || u.user_phone || "";
        return (name.toLowerCase().includes(lower) || email.toLowerCase().includes(lower) || phone.includes(search));
      });
      setFilteredUsers(filtered);
    }
  }, [search, users]);

  const startEdit = (u) => {
    setEditing({
      id: u.id || u.user_id,
      firstName: u.user_first_name || "",
      lastName: u.user_last_name || "",
      email: u.email || u.user_email || "",
      phone: u.phone || u.user_phone || "",
      role: u.role || u.user_role || "TENANT",
      gender: u.gender || u.user_gender || "",
      address: u.address || u.user_address || "",
      verification: u.verification || u.user_verification || "UNVERIFIED",
    });
  };

  const saveEdit = async () => {
    try {
      await adminApi.updateUser(user.token, editing.id, editing);
      toast.success("Đã cập nhật!");
      setEditing(null);
      load();
    } catch (error) { toast.error("Cập nhật thất bại"); }
  };

  const deleteUser = async (id) => {
    if (!window.confirm("Bạn chắc chắn muốn xóa?")) return;
    try {
      await adminApi.deleteUser(id, user.token);
      toast.success("Đã xóa user");
      setUsers(prev => prev.filter(u => (u.id || u.user_id) !== id));
    } catch (error) { toast.error("Xóa thất bại"); }
  };

  const formatDate = (val) => val ? new Date(val).toLocaleDateString('vi-VN') : "-";

  return (
    <AdminLayout>
      <Toaster position="top-center" />
      <div className="au-container">
        
        {/* 1. MINI STATS (LẤP KHOẢNG TRỐNG) */}
        <div className="au-stats-row">
            <div className="au-stat-box">
                <div className="au-stat-icon bg-indigo"><FaUsers/></div>
                <div className="au-stat-info">
                    <span className="au-stat-label">Tổng Users</span>
                    <span className="au-stat-number">{stats.total}</span>
                </div>
            </div>
            <div className="au-stat-box">
                <div className="au-stat-icon bg-emerald"><FaUserCheck/></div>
                <div className="au-stat-info">
                    <span className="au-stat-label">Đã xác thực</span>
                    <span className="au-stat-number">{stats.active}</span>
                </div>
            </div>
            <div className="au-stat-box">
                <div className="au-stat-icon bg-amber"><FaUserClock/></div>
                <div className="au-stat-info">
                    <span className="au-stat-label">Chờ duyệt</span>
                    <span className="au-stat-number">{stats.pending}</span>
                </div>
            </div>
        </div>

        {/* 2. TOOLBAR */}
        <div className="au-toolbar">
            <div className="au-search-box">
                <FaSearch className="au-search-icon"/>
                <input 
                    className="au-search-input" 
                    placeholder="Tìm theo tên, email..." 
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                />
            </div>
            {/* Có thể thêm nút Filter hoặc Export ở đây nếu cần */}
        </div>

        {/* 3. TABLE */}
        <div className="au-card">
            <table className="au-table">
                <thead>
                    <tr>
                        <th>Người dùng</th>
                        <th>Vai trò</th>
                        <th>Trạng thái</th>
                        <th>Liên hệ</th>
                        <th>Ngày tạo</th>
                        <th>Tác vụ</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredUsers.map(u => {
                        const userId = u.id || u.user_id;
                        const role = u.role || u.user_role || "TENANT";
                        const status = u.verification || u.user_verification || "UNVERIFIED";
                        
                        return (
                        <tr key={userId}>
                            <td>
                                <div className="au-user-cell">
                                    <img src={u.avatar || u.user_avatar || "https://cdn-icons-png.flaticon.com/512/149/149071.png"} className="au-avatar" alt="avt"/>
                                    <div className="au-user-info">
                                        <span className="au-name">{u.firstName || u.user_first_name} {u.lastName || u.user_last_name}</span>
                                        <span className="au-email">{u.email || u.user_email}</span>
                                    </div>
                                </div>
                            </td>
                            <td><span className={`au-badge role-${role.toLowerCase()}`}>{role}</span></td>
                            <td><span className={`au-badge status-${status.toLowerCase()}`}>{status}</span></td>
                            <td>{u.phone || u.user_phone || "-"}</td>
                            <td>{formatDate(u.created_at || u.user_created_at)}</td>
                            <td>
                                <div className="au-actions">
                                    <button className="au-btn-icon au-btn-edit" onClick={() => startEdit(u)}><FaEdit/></button>
                                    <button className="au-btn-icon au-btn-del" onClick={() => deleteUser(userId)}><FaTrash/></button>
                                </div>
                            </td>
                        </tr>
                    )})}
                </tbody>
            </table>
        </div>

        {/* 4. MODAL EDIT (POPUP ĐẸP) */}
        {editing && (
            <div className="au-modal-overlay">
                <div className="au-modal">
                    {/* Header */}
                    <div className="au-modal-header">
                        <h3 className="au-modal-title"><FaUserEdit className="text-indigo-500"/> Chỉnh sửa thông tin</h3>
                        <button className="au-close-btn" onClick={() => setEditing(null)}><FaTimes/></button>
                    </div>

                    {/* Body (Grid Layout) */}
                    <div className="au-modal-body">
                        <div className="au-form-group full">
                            <label className="au-label">Họ và tên</label>
                            <input className="au-input" value={editing.full_name} onChange={e => setEditing({...editing, full_name: e.target.value})} />
                        </div>
                        <div className="au-form-group">
                            <label className="au-label">Email</label>
                            <input className="au-input" value={editing.email} onChange={e => setEditing({...editing, email: e.target.value})} />
                        </div>
                        <div className="au-form-group">
                            <label className="au-label">Số điện thoại</label>
                            <input className="au-input" value={editing.phone} onChange={e => setEditing({...editing, phone: e.target.value})} />
                        </div>
                        <div className="au-form-group">
                            <label className="au-label">Vai trò</label>
                            <select className="au-select" value={editing.role} onChange={e => setEditing({...editing, role: e.target.value})}>
                                <option value="TENANT">Người thuê</option>
                                <option value="LANDLORD">Chủ trọ</option>
                                <option value="ADMIN">Admin</option>
                            </select>
                        </div>
                        <div className="au-form-group">
                            <label className="au-label">Trạng thái xác thực</label>
                            <select className="au-select" value={editing.verification} onChange={e => setEditing({...editing, verification: e.target.value})}>
                                <option value="UNVERIFIED">Chưa xác thực</option>
                                <option value="PENDING">Đang chờ duyệt</option>
                                <option value="VERIFIED">Đã xác thực</option>
                                <option value="REJECTED">Từ chối</option>
                            </select>
                        </div>
                        <div className="au-form-group full">
                            <label className="au-label">Địa chỉ</label>
                            <input className="au-input" value={editing.address} onChange={e => setEditing({...editing, address: e.target.value})} />
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="au-modal-footer">
                        <button className="au-btn btn-cancel" onClick={() => setEditing(null)}>Hủy bỏ</button>
                        <button className="au-btn btn-save" onClick={saveEdit}>Lưu thay đổi</button>
                    </div>
                </div>
            </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminUsersPage;