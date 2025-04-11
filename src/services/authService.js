import api from "./api";

export const authService = {
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

  // NEW: Check if phone number exists
  checkPhoneNumber: async (phoneNumber) => {
    try {
      const response = await api.post("/auth/check-phone", { phoneNumber });
      return response.data; // Should return { exists: true/false }
    } catch (error) {
      console.error(
        "Error checking phone number:",
        error.response?.data || error
      );
      throw error; // Re-throw for component to handle
    }
  },

  // NEW: Send OTP (Calls the backend simulation)
  sendOtp: async (phoneNumber) => {
    try {
      const response = await api.post("/auth/send-otp", { phoneNumber });
      console.log("Send OTP response:", response.data); // Log backend message
      return response.data;
    } catch (error) {
      console.error("Error sending OTP:", error.response?.data || error);
      throw error;
    }
  },

  // NEW: Login with OTP
  loginWithOtp: async ({ phoneNumber, otp }) => {
    try {
      const response = await api.post("/auth/login-otp", { phoneNumber, otp });
      // Handle successful login (store token/user like regular login)
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        if (response.data.user && response.data.user.id) {
          localStorage.setItem("userId", response.data.user.id);
        }
      }
      return response.data;
    } catch (error) {
      console.error(
        "Error logging in with OTP:",
        error.response?.data || error
      );
      throw error;
    }
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
