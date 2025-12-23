import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";
import roommateApi from "../services/roommateApi.js";
import { UserContext } from "../contexts/UserContext.jsx";
import "../css/Roommate.css";

const RoommateEditPage = () => {
  const { id } = useParams();
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [initial, setInitial] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await roommateApi.detail(id);
        const item = res.data.data;
        setInitial({
          ...item,
          age_min: item.age_min || "",
          age_max: item.age_max || "",
        });
      } catch (error) {
        toast.error("Không tải được dữ liệu");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  const handleSubmit = async (formData) => {
    if (!user) {
      toast.error("Vui lòng đăng nhập");
      return navigate("/login");
    }
    setSaving(true);
    try {
      await roommateApi.update(id, formData, user.token);
      toast.success("Cập nhật thành công");
      navigate("/roommate/manage");
    } catch (error) {
      toast.error(error.response?.data?.message || "Lỗi cập nhật");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="roommate-page">Đang tải...</div>;
  if (!initial) return <div className="roommate-page">Không tìm thấy bài</div>;

  return (
    <div className="roommate-page">
      <Toaster position="top-center" />
      <div className="roommate-header">
        <div>
          <h1>Cập nhật bài tìm bạn cùng phòng</h1>
          <p style={{ color: "#4b5563" }}>Chỉnh sửa thông tin, có thể thêm ảnh mới.</p>
        </div>
      </div>
      <RoommateForm initialData={initial} onSubmit={handleSubmit} loading={saving} submitLabel="Lưu thay đổi" />
    </div>
  );
};

export default RoommateEditPage;