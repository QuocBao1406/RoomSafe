import React from "react";

const RoommateFilters = ({ values, onChange, onReset }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onChange({ ...values, [name]: value });
  };

  return (
    <div className="filter-bar">
      <input
        className="filter-input"
        name="q"
        placeholder="Tìm theo tên bài / mô tả"
        value={values.q}
        onChange={handleChange}
      />
      <input
        className="filter-input"
        name="area"
        placeholder="Khu vực"
        value={values.area}
        onChange={handleChange}
      />
      <select
        className="filter-select"
        name="gender"
        value={values.gender}
        onChange={handleChange}
      >
        <option value="">Giới tính ưu tiên</option>
        <option value="ANY">Không yêu cầu</option>
        <option value="MALE">Nam</option>
        <option value="FEMALE">Nữ</option>
      </select>
      <input
        className="filter-input"
        type="number"
        name="budgetMin"
        placeholder="Ngân sách từ"
        value={values.budgetMin}
        onChange={handleChange}
      />
      <input
        className="filter-input"
        type="number"
        name="budgetMax"
        placeholder="Ngân sách đến"
        value={values.budgetMax}
        onChange={handleChange}
      />
      <input
        className="filter-input"
        type="number"
        name="ageMin"
        placeholder="Tuổi từ"
        value={values.ageMin}
        onChange={handleChange}
      />
      <input
        className="filter-input"
        type="number"
        name="ageMax"
        placeholder="Tuổi đến"
        value={values.ageMax}
        onChange={handleChange}
      />
      <button className="btn-outline" type="button" onClick={onReset}>
        Xóa lọc
      </button>
    </div>
  );
};

export default RoommateFilters;