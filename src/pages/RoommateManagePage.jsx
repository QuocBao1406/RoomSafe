import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";
import { FaTrash, FaEdit, FaCheckCircle } from "react-icons/fa";
import roommateApi from "../services/roommateApi.js";
import { UserContext } from "../contexts/UserContext.jsx";
import "../css/Roommate.css";

const formatCurrency = (vnd) =>
  new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND", maximumFractionDigits: 0 }).format(
    vnd || 0
  );

const RoommateManagePage = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMine = async () => {
      if (!user) {
        setLoading(false);
        return;
      }
      try {
        const res = await roommateApi.mine(user.id, user.token);
        setItems(res.data.data || []);
      } catch (error) {
        console.error(error);
        toast.error("Không tải được danh sách");
      } finally {
        setLoading(false);
      }
    };
    fetchMine();
  }, [user]);

  const handleDelete = async (id) => {
    if (!window.confirm("Xóa bài này?")) return;
    try {
      await roommateApi.remove(id, user?.token);
      setItems((prev) => prev.filter((p) => p.id !== id));
      toast.success("Đã xóa");
    } catch (error) {
      toast.error(error.response?.data?.message || "Lỗi xóa");
    }
  };

  const handleFound = async (id) => {
    try {
      await roommateApi.updateStatus(id, "FOUND", user?.token);
      setItems((prev) => prev.map((p) => (p.id === id ? { ...p, status: "FOUND" } : p)));
      toast.success("Đã cập nhật trạng thái FOUND");
    } catch (error) {
      toast.error(error.response?.data?.message || "Lỗi cập nhật");
    }
  };

  if (!user) return <div className="roommate-page">Vui lòng đăng nhập để quản lý bài.</div>;
  if (loading) return <div className="roommate-page">Đang tải...</div>;

  return (
    <div className="roommate-page">
      <Toaster position="top-center" />
      <div className="roommate-header">
        <div>
          <h1>Bài đăng của tôi</h1>
          <p style={{ color: "#4b5563" }}>Quản lý bài tìm bạn cùng phòng.</p>
        </div>
        <button className="btn-primary" onClick={() => navigate("/roommate/post")}>
          + Đăng bài mới
        </button>
      </div>

      {items.length === 0 ? (
        <div>Chưa có bài đăng.</div>
      ) : (
        <div className="roommate-card-grid">
          {items.map((item) => (
            <div key={item.id} className="roommate-card">
              <img
                src={
                  Array.isArray(item.photos) && item.photos.length
                    ? item.photos[0]
                    : "https://via.placeholder.com/400x240?text=Roommate"
                }
                alt={item.title}
              />
              <div className="roommate-card-body">
                <div className="roommate-badge">
                  {item.status === "FOUND" ? "Đã tìm được" : "Đang tìm"}
                </div>
                <h3>{item.title}</h3>
                <div className="roommate-budget">{formatCurrency(item.budget)}</div>
                <p style={{ color: "#4b5563", fontSize: 14 }}>
                  {item.preferred_area} • {item.gender_preference}
                </p>
              </div>
              <div className="roommate-actions">
                <button className="btn-outline" onClick={() => navigate(`/roommate/edit/${item.id}`)}>
                  <FaEdit /> Sửa
                </button>
                <button className="btn-outline" onClick={() => handleFound(item.id)}>
                  <FaCheckCircle /> FOUND
                </button>
                <button className="btn-outline" onClick={() => handleDelete(item.id)}>
                  <FaTrash /> Xóa
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RoommateManagePage;