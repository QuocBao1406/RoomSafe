import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";
import roommateApi from "../services/roommateApi.js";
import RoommateCard from "../components/RoommateCard.jsx";
import "../css/Roommate.css";

const formatCurrency = (vnd) =>
  new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND", maximumFractionDigits: 0 }).format(
    vnd || 0
  );

const genderLabel = {
  MALE: "Nam",
  FEMALE: "Nữ",
  ANY: "Không yêu cầu",
};

const RoommateDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await roommateApi.detail(id);
        const item = res.data.data;
        setData(item);
        const suggestRes = await roommateApi.listPublic({
          area: item.preferred_area,
          gender: item.gender_preference,
          exclude: id,
        });
        setSuggestions((suggestRes.data.data || []).filter((p) => p.id !== item.id).slice(0, 4));
      } catch (error) {
        toast.error("Không tìm thấy bài viết");
      }
    };
    load();
  }, [id]);

  if (!data) return <div className="roommate-page">Đang tải...</div>;

  const cover = Array.isArray(data.photos) && data.photos.length ? data.photos[0] : null;

  return (
    <div className="roommate-page">
      <Toaster position="top-center" />
      <div className="roommate-detail">
        <div className="detail-hero">
          <img src={cover || "https://via.placeholder.com/900x360?text=Roommate"} alt={data.title} />
        </div>
        <div className="detail-section">
          <h1>{data.title}</h1>
          <p style={{ color: "#4b5563" }}>{data.preferred_area}</p>
          <div className="roommate-badge">Ngân sách: {formatCurrency(data.budget)}</div>
          <p style={{ marginTop: 12, lineHeight: 1.6 }}>{data.description}</p>
          <p>Giới tính ưu tiên: {genderLabel[data.gender_preference]}</p>
          {(data.age_min || data.age_max) && (
            <p>
              Độ tuổi: {data.age_min || "?"} - {data.age_max || "?"}
            </p>
          )}
          {data.habits && (
            <p>
              Thói quen: <span style={{ color: "#374151" }}>{data.habits}</span>
            </p>
          )}
        </div>

        <div className="detail-section">
          <h3>Liên hệ nhanh</h3>
          <div className="contact-buttons">
            {data.contact_zalo && (
              <a href={`https://zalo.me/${data.contact_zalo}`} target="_blank" rel="noreferrer">
                <button className="btn-primary">Zalo</button>
              </a>
            )}
            {data.contact_messenger && (
              <a href={data.contact_messenger} target="_blank" rel="noreferrer">
                <button className="btn-outline">Messenger</button>
              </a>
            )}
            {data.contact_phone && (
              <a href={`tel:${data.contact_phone}`}>
                <button className="btn-outline">Gọi {data.contact_phone}</button>
              </a>
            )}
          </div>
        </div>

        {suggestions.length > 0 && (
          <div className="detail-section">
            <h3>Gợi ý tương tự</h3>
            <div className="roommate-card-grid">
              {suggestions.map((item) => (
                <RoommateCard key={item.id} item={item} onClick={() => navigate(`/roommate/${item.id}`)} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RoommateDetailPage;