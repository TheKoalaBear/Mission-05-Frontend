import api from "./api";

/**
 * Fetches share tank details for a given user.
 * Assumes the backend endpoint is /api/tanks/:userId and returns { balance, capacity }.
 * @param {string} userId - The ID of the user whose tank details are being fetched.
 * @returns {Promise<object>} A promise that resolves to an object containing tank details (e.g., { balance, capacity }).
 */
export const tankService = {
  getTankDetails: async (userId) => {
    if (!userId) {
      throw new Error("User ID is required to fetch tank details.");
    }
    try {
      // Assuming the backend endpoint is /api/tanks/:userId
      // and returns an object like { balance: 100, capacity: 500 }
      const response = await api.get(`/tanks/${userId}`);
      return response.data; // Expecting { balance, capacity }
    } catch (error) {
      console.error(`Error fetching tank details for user ${userId}:`, error);
      // Re-throw the error so the component can handle it
      throw error;
    }
  },

  // Add other tank-related API calls here (e.g., topUp, addMember, etc.)
};
