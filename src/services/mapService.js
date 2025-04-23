import api from "./api";

// Mock data for Z Energy stations

const mockZStations = [
  {
    id: 1,
    name: "Z Energy Auckland CBD",
    location: { lat: -36.848461, lng: 174.763336 },
    address: "123 Queen Street, Auckland",
    services: ["Fuel", "Shop", "Car Wash", "EV Charging"],
    isOpen: true,
  },
  {
    id: 2,
    name: "Z Energy Wellington Central",
    location: { lat: -41.286461, lng: 174.776236 },
    address: "456 Lambton Quay, Wellington",
    services: ["Fuel", "Shop"],
    isOpen: true,
  },
  {
    id: 3,
    name: "Z Energy Christchurch",
    location: { lat: -43.531111, lng: 172.636667 },
    address: "789 Colombo Street, Christchurch",
    services: ["Fuel", "Shop", "Car Wash"],
    isOpen: false,
  },
  {
    id: 4,
    name: "Z Energy Hamilton",
    location: { lat: -37.787001, lng: 175.279253 },
    address: "321 Victoria Street, Hamilton",
    services: ["Fuel", "Shop", "Car Wash", "EV Charging"],
    isOpen: true,
  },
  {
    id: 5,
    name: "Z Energy Dunedin",
    location: { lat: -45.874761, lng: 170.503798 },
    address: "567 George Street, Dunedin",
    services: ["Fuel", "Shop"],
    isOpen: true,
  },
];

// Get all stations (simulating an API call)
export const getZStations = async () => {
  try {
    // In a real implementation, you would uncomment the next line to fetch from your API
    // const response = await api.get('/stations');
    // return response.data;

    // For now, return mock data
    return {
      success: true,
      data: mockZStations,
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
    // In a real implementation, you would uncomment the next line
    // const response = await api.get(`/stations/${stationId}`);
    // return response.data;

    // For now, return mock data
    const station = mockZStations.find((s) => s.id === parseInt(stationId));
    if (!station) {
      throw new Error("Station not found");
    }

    return {
      success: true,
      data: station,
    };
  } catch (error) {
    console.error(`Error fetching station with ID ${stationId}:`, error);
    return {
      success: false,
      error: error.message || "Failed to fetch station details",
    };
  }
};
