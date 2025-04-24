// Get all stations from the backend API
export const getZStations = async () => {
  try {
    // Fetch stations from the backend API
    const response = await fetch("http://localhost:5000/api/stations");

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    // Transform data to match the format expected by the map component
    const formattedData = data.map((station) => ({
      id: station._id,
      name: station.name,
      location: station.location,
      address: station.address,
      services: station.services || [],
      isOpen: station.isOpen || true, // Default to open if not specified
      phone: station.phone || "09 123 4567", // Default phone if not available
    }));

    return {
      success: true,
      data: formattedData,
    };
  } catch (error) {
    console.error("Error fetching Z stations:", error);
    return {
      success: false,
      error: error.message || "Failed to fetch Z Energy stations",
    };
  }
};

// Get station details by ID
export const getStationById = async (stationId) => {
  try {
    // Fetch specific station by ID
    const response = await fetch(`http://localhost:5000/api/stations/${stationId}`);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const station = await response.json();

    // Transform to match expected format
    const formattedStation = {
      id: station._id,
      name: station.name,
      location: station.location,
      address: station.address,
      services: station.services || [],
      isOpen: station.isOpen || true,
      phone: station.phone || "09 123 4567",
    };

    return {
      success: true,
      data: formattedStation,
    };
  } catch (error) {
    console.error(`Error fetching station with ID ${stationId}:`, error);
    return {
      success: false,
      error: error.message || "Failed to fetch station details",
    };
  }
};

// Search for stations by query
export const searchStations = async (query) => {
  try {
    const response = await fetch(
      `http://localhost:5000/api/stations/search?query=${encodeURIComponent(query)}`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    // Transform data to match expected format
    const formattedData = data.map((station) => ({
      id: station._id,
      name: station.name,
      location: station.location,
      address: station.address,
      services: station.services || [],
      isOpen: station.isOpen || true,
      phone: station.phone || "09 123 4567",
    }));

    return {
      success: true,
      data: formattedData,
    };
  } catch (error) {
    console.error("Error searching for stations:", error);
    return {
      success: false,
      error: error.message || "Failed to search for stations",
    };
  }
};
