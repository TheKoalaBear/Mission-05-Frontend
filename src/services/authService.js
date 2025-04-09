import api from "./api";

export const authService = {
  login: async (credentials) => {
    const response = await api.post("/auth/login", credentials);
    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
    }
    return response.data;
  },

  register: async (userData) => {
    console.log("Attempting to register user:", userData);
    try {
      const response = await api.post("/auth/register", userData);
      console.log("Registration response:", response.data);
      return response.data;
    } catch (error) {
      console.error("Registration error:", error.response?.data || error);
      throw error;
    }
  },

  logout: async () => {
    try {
      // Store onboarding state
      const hasSeenOnboarding = localStorage.getItem("hasSeenOnboarding");

      // Try to call logout endpoint if token exists
      const token = localStorage.getItem("token");
      if (token) {
        try {
          await api.post("/auth/logout");
        } catch (error) {
          console.error("Error calling logout endpoint:", error);
          // Continue with local logout even if API call fails
        }
      }

      // Clear all storage
      localStorage.clear();

      // Reset API authorization header
      delete api.defaults.headers.common["Authorization"];

      // Restore onboarding state
      if (hasSeenOnboarding) {
        localStorage.setItem("hasSeenOnboarding", hasSeenOnboarding);
      }

      return true;
    } catch (error) {
      console.error("Error during logout:", error);
      return false;
    }
  },

  getCurrentUser: () => {
    const userStr = localStorage.getItem("user");
    if (!userStr) return null;
    try {
      return JSON.parse(userStr);
    } catch (error) {
      console.error("Error parsing user data:", error);
      return null;
    }
  },

  isAuthenticated: () => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    return !!(token && user);
  },

  getUserDetails: async () => {
    try {
      const response = await api.get("/users/me");
      if (response.data) {
        localStorage.setItem("user", JSON.stringify(response.data));
        return response.data;
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
      throw error;
    }
  },
};
