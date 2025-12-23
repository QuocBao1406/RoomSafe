import axios from "axios";

const API_URL = "http://localhost:5000/api/roommates"; 

const roommateApi = {
  // 1. Đăng tin mới
  create: (formData, token) => {
    return axios.post(`${API_URL}/create`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`, 
      },
    });
  },

  // 2. Lấy danh sách bài của tôi
  mine: (userId, token) => {
      return axios.get(`${API_URL}/my-posts`, { 
          headers: { Authorization: `Bearer ${token}` }
      });
  },

  // 3. Xóa bài
  remove: (id, token) => {
      return axios.delete(`${API_URL}/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
      });
  },

  // 4. Update status
  updateStatus: (id, status, token) => {
      return axios.put(`${API_URL}/${id}/status`, { status }, {
          headers: { Authorization: `Bearer ${token}` }
      });
  },

  // 5. Lấy chi tiết (SỬA TÊN HÀM TỪ getDetail -> detail)
  detail: (id) => {
      return axios.get(`${API_URL}/detail/${id}`);
  },

  // 6. Update nội dung
  update: (id, formData, token) => {
      return axios.put(`${API_URL}/${id}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`, 
          }
      });
  },

  // 7. Lấy danh sách public (Lọc)
  listPublic: (filters) => {
      return axios.get(`${API_URL}/public`, { params: filters });
  }
};

export default roommateApi;