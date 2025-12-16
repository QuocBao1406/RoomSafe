import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";
import roommateApi from "../services/roommateApi.js";
import RoommateCard from "../components/RoommateCard.jsx";
import RoommateFilters from "../components/RoommateFilters.jsx";
import "../css/Roommate.css";

const defaultFilters = {
  q: "",
  area: "",
  gender: "",
  budgetMin: "",
  budgetMax: "",
  ageMin: "",
  ageMax: "",
};

const RoommateListPage = () => {
  const [filters, setFilters] = useState(defaultFilters);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await roommateApi.listPublic(filters);
      setItems(res.data.data || []);
    } catch (error) {
      console.error(error);
      toast.error("Không tải được danh sách");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleReset = () => {
    setFilters(defaultFilters);
    fetchData();
  };

  const handleFilterChange = (values) => {
    setFilters(values);
  };

  const handleSearch = () => fetchData();

  return (
    <div className="roommate-page">
      <Toaster position="top-center" />
      <div className="roommate-header">
        <div>
          <h1>Danh sách tìm bạn cùng phòng</h1>
          <p style={{ color: "#4b5563" }}>Lọc theo khu vực, giới tính, ngân sách, độ tuổi.</p>
        </div>
        <button className="btn-primary" onClick={() => navigate("/roommate/post")}>
          + Đăng bài
        </button>
      </div>

      <RoommateFilters values={filters} onChange={handleFilterChange} onReset={handleReset} />
      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 10 }}>
        <button className="btn-outline" onClick={handleSearch}>
          Áp dụng
        </button>
      </div>

      {loading ? (
        <div>Đang tải...</div>
      ) : items.length === 0 ? (
        <div>Không có bài phù hợp.</div>
      ) : (
        <div className="roommate-card-grid">
          {items.map((item) => (
            <RoommateCard key={item.id} item={item} onClick={() => navigate(`/roommate/${item.id}`)} />
          ))}
        </div>
      )}
    </div>
  );
};

export default RoommateListPage;