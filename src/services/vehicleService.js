/**
 * Service for managing vehicle-related API calls
 */

/**
 * Save vehicle data to the API
 * @param {Object} data - The vehicle data to save
 * @param {boolean} isEditing - Whether this is an update to an existing vehicle
 * @returns {Promise<Object>} Object with success flag and data or error message
 */
export const saveVehicle = async (data, isEditing = false) => {
  try {
    // Send data to backend API
    const response = await fetch("http://localhost:5000/api/vehicles", {
      method: isEditing ? "PUT" : "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Failed to save vehicle data");
    }

    const savedVehicle = await response.json();

    return { success: true, data: savedVehicle };
  } catch (err) {
    console.error("Failed to save vehicle data:", err);
    return { success: false, error: "Failed to save vehicle data" };
  }
};

/**
 * Temporary function that mocks the API call for development
 * Can be used when backend is not available
 */
export const mockSaveVehicle = async (data, isEditing = false, existingVehicle = null) => {
  try {
    // Log what would be sent to the API
    console.log("Mock API call - vehicle data:", data);

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Create a mock response
    const savedVehicle = {
      ...data,
      id: isEditing && existingVehicle ? existingVehicle.id : Date.now().toString(),
    };

    console.log("Mock API response:", savedVehicle);

    return { success: true, data: savedVehicle };
  } catch (err) {
    console.error("Mock save failed:", err);
    return { success: false, error: "Failed to save vehicle data" };
  }
};
