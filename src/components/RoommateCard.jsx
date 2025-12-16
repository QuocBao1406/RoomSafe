import React from "react";
import { FaMapMarkerAlt, FaUser, FaPhone } from "react-icons/fa";

const formatCurrency = (vnd) =>
  new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND", maximumFractionDigits: 0 }).format(
    vnd || 0
  );

const genderLabel = {
  MALE: "Nam",
  FEMALE: "Nữ",
  ANY: "Không yêu cầu",
};

const RoommateCard = ({ item, onClick }) => {
  const cover = Array.isArray(item.photos) && item.photos.length ? item.photos[0] : null;

  return (
    <div className="roommate-card" onClick={onClick} style={{ cursor: "pointer" }}>
      <img src={cover || "https://via.placeholder.com/400x240?text=Roommate"} alt={item.title} />
      <div className="roommate-card-body">
        <div className="roommate-badge">Ngân sách: {formatCurrency(item.budget)}</div>
        <h3 style={{ margin: "4px 0 6px" }}>{item.title}</h3>
        <p style={{ color: "#4b5563", fontSize: 14, lineHeight: 1.5 }}>
          {item.description?.slice(0, 120) || ""}...
        </p>
        <div className="roommate-meta">
          <span>
            <FaMapMarkerAlt size={13} style={{ marginRight: 4 }} />
            {item.preferred_area}
          </span>
          <span>
            <FaUser size={13} style={{ marginRight: 4 }} />
            {genderLabel[item.gender_preference] || "Không yêu cầu"}
          </span>
          {item.contact_phone && (
            <span>
              <FaPhone size={13} style={{ marginRight: 4 }} />
              {item.contact_phone}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default RoommateCard;