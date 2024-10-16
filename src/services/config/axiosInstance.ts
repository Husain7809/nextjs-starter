import axios from "axios";

const apiClient = axios.create();

// Request Interceptor
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    console.log(`[Request] ${config.method?.toUpperCase()} - ${config.url}`);
    return config;
  },
  (error) => {
    console.error("[Request Error]", error);
    return Promise.reject(error);
  }
);

// Response Interceptor
apiClient.interceptors.response.use(
  (response) => {
    console.log("[Response]", response);
    return response;
  },
  (error) => {
    console.error("[Response Error]", error);
    if (error.response?.status === 401) {
      alert("Session expired. Please log in again.");
      // You can redirect to login page here
    }
    return Promise.reject(error);
  }
);

export default apiClient;
