import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";
import RoommateForm from "../components/RoommateForm.jsx";
import { UserContext } from "../contexts/UserContext.jsx";
import roommateApi from "../services/roommateApi.js";
import "../css/Roommate.css";

const RoommatePostPage = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (formData) => {
    if (!user) {
      toast.error("Vui lòng đăng nhập để đăng bài");
      return navigate("/login");
    }

    formData.append("user_id", user.id);
    setLoading(true);
    try {
      await roommateApi.create(formData, user.token);
      toast.success("Đăng bài thành công");
      navigate("/roommate/manage");
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Lỗi khi đăng bài");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="roommate-page">
      <Toaster position="top-center" />
      <div className="roommate-header">
        <div>
          <h1>Đăng bài tìm bạn cùng phòng</h1>
          <p style={{ color: "#4b5563" }}>
            Điền thông tin rõ ràng để tìm người phù hợp nhanh hơn.
          </p>
        </div>
      </div>
      <RoommateForm onSubmit={handleSubmit} loading={loading} submitLabel="Đăng bài" />
    </div>
  );
};

export default RoommatePostPage;