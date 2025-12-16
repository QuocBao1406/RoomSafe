import axios from "axios";

const baseURL = "http://localhost:5000/api/roommates";

const withAuth = (token) =>
  token
    ? {
        Authorization: `Bearer ${token}`,
      }
    : {};

export const roommateApi = {
  create: (formData, token) =>
    axios.post(baseURL, formData, {
      headers: { "Content-Type": "multipart/form-data", ...withAuth(token) },
    }),

  listPublic: (params = {}) => axios.get(`${baseURL}/public`, { params }),

  detail: (id) => axios.get(`${baseURL}/${id}`),

  mine: (userId, token) =>
    axios.get(`${baseURL}/user/${userId}`, { headers: withAuth(token) }),

  update: (id, formData, token) =>
    axios.put(`${baseURL}/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data", ...withAuth(token) },
    }),

  updateStatus: (id, status, token) =>
    axios.patch(
      `${baseURL}/${id}/status`,
      { status },
      { headers: withAuth(token) }
    ),

  remove: (id, token) =>
    axios.delete(`${baseURL}/${id}`, { headers: withAuth(token) }),
};

export default roommateApi;