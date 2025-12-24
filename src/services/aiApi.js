import axios from "axios";

const API_URL = "http://localhost:5000/api/ai";

const aiApi = {
  chat: (message, role) => {
    return axios.post(`${API_URL}/chat`, { message, role });
  }
};

export default aiApi;