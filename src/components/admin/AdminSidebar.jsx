import React from "react";
import { NavLink } from "react-router-dom";
import "../../css/Admin.css";

const AdminSidebar = () => {
  return (
    <aside className="admin-sidebar">
      <div className="admin-sidebar__brand">
        <div className="brand-dot" />
        <div>
          <div className="brand-name">RoomSafe</div>
          <div className="brand-sub">Admin Center</div>
        </div>
      </div>
      <nav className="admin-sidebar__nav">
        <NavLink to="/admin" className={({ isActive }) => `admin-link ${isActive ? "active" : ""}`}>
          Dashboard
        </NavLink>
        <NavLink to="/admin/users" className={({ isActive }) => `admin-link ${isActive ? "active" : ""}`}>
          Quản lý User
        </NavLink>
        <NavLink to="/admin/posts" className={({ isActive }) => `admin-link ${isActive ? "active" : ""}`}>
          Quản lý Bài đăng
        </NavLink>
      </nav>
      <div className="admin-sidebar__note">Quản lý & duyệt nội dung an toàn</div>
    </aside>
  );
};

export default AdminSidebar;