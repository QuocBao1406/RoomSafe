import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";
import RoommateForm from "../components/RoommateForm.jsx";
import { UserContext } from "../contexts/UserContext.jsx";
import roommateApi from "../services/roommateApi.js";
import "../css/RoommatePost.css"; // Style mới

const RoommatePostPage = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (formData) => {
    const token = localStorage.getItem('token');

    if (token && token.startsWith('"') && token.endsWith('"')) {
        token = token.slice(1, -1);
    }

    if (!user) {
      toast.error("Vui lòng đăng nhập để đăng bài");
      return navigate("/login");
    }

    console.log("Token gửi đi:", token);

    // Gắn thêm user_id nếu chưa có
    if (!formData.get("user_id")) formData.append("user_id", user.id);
    
    setLoading(true);
    try {
      // Gọi service API
      await roommateApi.create(formData, user.token);
      toast.success("Đăng bài thành công!");
      setTimeout(() => navigate("/roommate/manage"), 1500);
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Lỗi khi đăng bài");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rp-container">
      <Toaster position="top-center" />
      
      <div className="rp-content-width">
        <div className="rp-header">
            <h1>Tìm bạn cùng phòng lý tưởng</h1>
            <p>Kết nối, chia sẻ không gian sống và giảm bớt gánh nặng chi phí</p>
        </div>

        <RoommateForm 
            onSubmit={handleSubmit} 
            loading={loading} 
            initialData={{ contactPhone: user?.phone || '', contactName: user?.name || '' }}
        />
      </div>
    </div>
  );
};

export default RoommatePostPage;