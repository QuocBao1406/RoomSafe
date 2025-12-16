import React, { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  title: z.string().min(5, "Tiêu đề tối thiểu 5 ký tự"),
  description: z.string().min(20, "Mô tả tối thiểu 20 ký tự"),
  budget: z.coerce.number().int().positive("Ngân sách phải > 0"),
  preferred_area: z.string().min(2, "Vui lòng nhập khu vực"),
  gender_preference: z.enum(["MALE", "FEMALE", "ANY"]),
  age_min: z.coerce.number().int().nonnegative().optional().or(z.literal("")),
  age_max: z.coerce.number().int().nonnegative().optional().or(z.literal("")),
  habits: z.string().optional(),
  contact_zalo: z.string().optional(),
  contact_messenger: z.string().optional(),
  contact_phone: z.string().optional(),
  photos: z.any().optional(),
});

const defaultValues = {
  title: "",
  description: "",
  budget: "",
  preferred_area: "",
  gender_preference: "ANY",
  age_min: "",
  age_max: "",
  habits: "",
  contact_zalo: "",
  contact_messenger: "",
  contact_phone: "",
};

const RoommateForm = ({ initialData, onSubmit, submitLabel = "Đăng bài", loading }) => {
  const [previews, setPreviews] = useState([]);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: initialData || defaultValues,
  });

  const submitHandler = (values) => {
    const formData = new FormData();
    Object.entries(values).forEach(([key, value]) => {
      if (key === "photos") return;
      if (value !== undefined && value !== "") formData.append(key, value);
    });

    if (values.photos && values.photos.length) {
      Array.from(values.photos).forEach((file) => formData.append("photos", file));
    }

    onSubmit(formData);
  };

  const handlePhotosChange = (e) => {
    const files = e.target.files;
    setValue("photos", files);
    const urls = Array.from(files || []).map((file) => URL.createObjectURL(file));
    setPreviews(urls);
  };

  const previewList = useMemo(() => previews, [previews]);

  return (
    <form className="roommate-form" onSubmit={handleSubmit(submitHandler)}>
      <div className="form-grid">
        <div className="form-field">
          <label>Tiêu đề</label>
          <input placeholder="Tìm bạn cùng phòng khu vực..." {...register("title")} />
          {errors.title && <span className="error-text">{errors.title.message}</span>}
        </div>

        <div className="form-field">
          <label>Ngân sách (VND/tháng)</label>
          <input type="number" min="0" placeholder="3,000,000" {...register("budget")} />
          {errors.budget && <span className="error-text">{errors.budget.message}</span>}
        </div>

        <div className="form-field">
          <label>Khu vực mong muốn</label>
          <input placeholder="Quận/Huyện, Thành phố" {...register("preferred_area")} />
          {errors.preferred_area && (
            <span className="error-text">{errors.preferred_area.message}</span>
          )}
        </div>

        <div className="form-field">
          <label>Giới tính ưu tiên</label>
          <select {...register("gender_preference")}>
            <option value="ANY">Không yêu cầu</option>
            <option value="MALE">Nam</option>
            <option value="FEMALE">Nữ</option>
          </select>
        </div>

        <div className="form-field">
          <label>Độ tuổi (min)</label>
          <input type="number" min="0" {...register("age_min")} />
          {errors.age_min && <span className="error-text">{errors.age_min.message}</span>}
        </div>

        <div className="form-field">
          <label>Độ tuổi (max)</label>
          <input type="number" min="0" {...register("age_max")} />
          {errors.age_max && <span className="error-text">{errors.age_max.message}</span>}
        </div>
      </div>

      <div className="form-field">
        <label>Mô tả</label>
        <textarea rows={4} placeholder="Mô tả phòng, yêu cầu, tính cách..." {...register("description")} />
        {errors.description && <span className="error-text">{errors.description.message}</span>}
      </div>

      <div className="form-field">
        <label>Sở thích / thói quen</label>
        <textarea rows={3} placeholder="Đi ngủ sớm, không hút thuốc, gọn gàng..." {...register("habits")} />
      </div>

      <div className="form-grid">
        <div className="form-field">
          <label>Zalo</label>
          <input placeholder="Số/Zalo ID" {...register("contact_zalo")} />
        </div>
        <div className="form-field">
          <label>Messenger</label>
          <input placeholder="Link/username" {...register("contact_messenger")} />
        </div>
        <div className="form-field">
          <label>Số điện thoại</label>
          <input placeholder="098..." {...register("contact_phone")} />
        </div>
      </div>

      <div className="form-field">
        <label>Ảnh (cá nhân hoặc phòng)</label>
        <input type="file" multiple accept="image/*" onChange={handlePhotosChange} />
        <div className="photo-preview-list">
          {previewList.map((url) => (
            <img key={url} src={url} alt="preview" className="photo-preview" />
          ))}
        </div>
      </div>

      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <button className="btn-primary" type="submit" disabled={loading}>
          {loading ? "Đang lưu..." : submitLabel}
        </button>
      </div>
    </form>
  );
};

export default RoommateForm;