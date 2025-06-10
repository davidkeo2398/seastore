import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8080/api",
});
axiosInstance.defaults.headers.common["Content-Type"] = "application/json";
axiosInstance.interceptors.request.use(
  (config) => {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1];
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
