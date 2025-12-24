import React, { useContext, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AdminSidebar from "./AdminSidebar.jsx";
import { UserContext } from "../../contexts/UserContext.jsx";
import "../../css/Admin.css";

const AdminLayout = ({ children }) => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();

  const pageTitle = useMemo(() => {
    const map = {
      "/admin": "Dashboard",
      "/admin/users": "Quản lý User",
      "/admin/posts": "Quản lý Bài đăng",
    };
    return map[location.pathname] || "Trang quản trị";
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
  };

  return (
    <div className="admin-layout">
      <AdminSidebar />
      <div className="admin-shell">
        <header className="admin-topbar">
          <div className="admin-topbar__titles">
            <p className="admin-kicker">RoomSafe Admin</p>
            <h1 className="admin-title">{pageTitle}</h1>
          </div>
          <div className="admin-topbar__actions">
            <div className="admin-user">
              <div className="admin-avatar">{(user?.name || user?.username || "A").charAt(0)}</div>
              <div className="admin-user__meta">
                <div className="admin-user__name">{user?.name || user?.username || "Admin"}</div>
                <div className="admin-user__role">Quản trị viên</div>
              </div>
            </div>
            <button className="btn ad-btn-ghost ad-btn-logout" onClick={handleLogout}>
              Đăng xuất
            </button>
          </div>
        </header>
        <main className="admin-content">{children}</main>
      </div>
    </div>
  );
};

export default AdminLayout;