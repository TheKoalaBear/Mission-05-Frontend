import axios from "axios";

const api = axios.create({
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor to add auth token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle authentication errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      error.response &&
      error.response.status === 401 &&
      !error.config.url.includes("/login") && // Avoid redirect loop on login failure
      !error.config.url.includes("/signup") // Avoid redirect loop on signup page
    ) {
      console.log("Unauthorized access or expired token, redirecting...");
      // Clear potentially invalid token/user data
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("userId");
      // Redirect to the signup/login entry point
      window.location.href = "/signup";
    }
    return Promise.reject(error);
  }
);

export default api;
