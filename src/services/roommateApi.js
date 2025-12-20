import axios from "axios";

const API_URL = "http://localhost:5000/api/roommates"; 

const roommateApi = {
  create: (formData, token) => {
    return axios.post(`${API_URL}/create`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        // Chú ý: Phải có dấu cách sau chữ Bearer
        Authorization: `Bearer ${token}`, 
      },
    });
  },
};

export default roommateApi;