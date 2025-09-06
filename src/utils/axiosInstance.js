import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://127.0.0.1:5555",
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;