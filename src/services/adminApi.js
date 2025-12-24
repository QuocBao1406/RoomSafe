import axios from "axios";

// Đảm bảo URL này đúng với cổng server backend của bạn (thường là 5000)
const API_URL = "http://localhost:5000/api/admin";

const adminApi = {
  // ==============================
  // 1. API CHO DASHBOARD (THỐNG KÊ)
  // ==============================
  
  // Lấy số lượng tổng quan (Users, Posts, Roommates)
  getStatsCounts: (token) => {
    return axios.get(`${API_URL}/stats/counts`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },

  // Lấy danh sách user mới nhất (cho Widget Dashboard)
  getRecentUsers: (token) => {
    return axios.get(`${API_URL}/stats/recent-users`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },

  // Lấy danh sách bài đăng mới nhất (cho Widget Dashboard)
  getRecentPosts: (token) => {
    return axios.get(`${API_URL}/stats/recent-posts`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },

  // ==============================
  // 2. API QUẢN LÝ USER
  // ==============================

  // Lấy danh sách tất cả user (có hỗ trợ tìm kiếm q)
  listUsers: (token, q = "") => {
    return axios.get(`${API_URL}/users`, {
      headers: { Authorization: `Bearer ${token}` },
      params: { q }, // Gửi tham số tìm kiếm lên server (nếu backend hỗ trợ)
    });
  },

  // Cập nhật thông tin user (Dùng cho Modal Edit)
  updateUser: (token, id, data) => {
    return axios.put(`${API_URL}/users/${id}`, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },

  // Xóa user
  deleteUser: (id, token) => {
    return axios.delete(`${API_URL}/users/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },

  // ==============================
  // 3. API QUẢN LÝ BÀI ĐĂNG (POSTS)
  // ==============================

  // Lấy danh sách tất cả bài đăng
  listPosts: (token) => {
    return axios.get(`${API_URL}/posts`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },

  // Xóa bài đăng
  deletePost: (id, token) => {
    return axios.delete(`${API_URL}/posts/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },

  // Cập nhật trạng thái bài đăng (Ẩn/Hiện)
  updatePostStatus: (id, status, token) => {
    return axios.put(`${API_URL}/posts/${id}/status`, { status }, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },
};

export default adminApi;