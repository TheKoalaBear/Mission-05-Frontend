import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getZStations, getStationById } from "../../services/mapService";
import { FiHome, FiSearch } from "react-icons/fi";
import zLogo from "../../assets/images/z.png";
import StationDetails from "./StationDetails";
import toiletIcon from "../../assets/map_img/map_toilet_service.png";
import fuelIcon from "../../assets/map_img/pay in app_service.png";
import coffeeIcon from "../../assets/map_img/Order coffee_service.png";
import carwashIcon from "../../assets/map_img/carwash_service.png";
import evIcon from "../../assets/map_img/carcharger_service.png";
import "./map.css";

// Map constants
const MAP_ID = "4338d8e5f6c5e491";
const API_KEY = "AIzaSyCUVQ_VUpaNLSZgxdbt5Mej67T44ziqaJ0";
const mapContainerStyle = {
  width: "100%",
  height: "100vh", // Back to full height
};

// Available services
const SERVICES = [
  { id: "toilet", name: "Toilet", icon: toiletIcon },
  { id: "fuel", name: "Fuel", icon: fuelIcon },
  { id: "coffee", name: "Coffee", icon: coffeeIcon },
  { id: "carwash", name: "Car Wash", icon: carwashIcon },
  { id: "ev", name: "EV Charging", icon: evIcon },
];

const MapPage = () => {
  const navigate = useNavigate();
  const params = useParams();
  const mapRef = useRef(null);
  const googleMapRef = useRef(null);
  const markersRef = useRef([]);
  const overlaysRef = useRef([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedService, setSelectedService] = useState(null);
  const [allStations, setAllStations] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStation, setSelectedStation] = useState(null);

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Handle search submit
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    // Filter stations by name or address containing the search query
    const filteredStations = allStations.filter(
      (station) =>
        station.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        station.address.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (filteredStations.length > 0) {
      // Center on the first matching station
      centerMapOnStation(filteredStations[0]);
    } else {
      alert(`No Z Energy stations found matching "${searchQuery}"`);
    }
  };

  // Navigate to home page
  const handleHomeClick = () => {
    navigate("/");
  };

  // Load the Google Maps script
  const loadGoogleMapsScript = useCallback(() => {
    const script = document.createElement("script");
    // Using Map ID and API key
    script.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&map_ids=${MAP_ID}&libraries=places`;
    script.async = true;
    script.defer = true;
    script.id = "googleMapsScript";
    script.onload = initializeMap;
    script.onerror = () => setError("Failed to load Google Maps. Please try again later.");
    document.head.appendChild(script);

    return () => {
      const scriptElement = document.getElementById("googleMapsScript");
      if (scriptElement) {
        document.head.removeChild(scriptElement);
      }
    };
  }, []);

  // Initialize the map
  const initializeMap = useCallback(() => {
    if (!window.google || !mapRef.current) {
      return;
    }

    // Default center on New Zealand
    const defaultCenter = { lat: -41.2924, lng: 174.7787 };

    const mapOptions = {
      zoom: 6,
      center: defaultCenter,
      mapId: MAP_ID,
      // Remove all controls
      mapTypeControl: false,
      fullscreenControl: false,
      streetViewControl: false,
      zoomControl: false,
      panControl: false,
      scaleControl: false,
      rotateControl: false,
      scrollwheel: true, // Keep ability to zoom with mouse wheel
      gestureHandling: "greedy", // Allow direct manipulation without ctrl key
      disableDefaultUI: true, // Disable all default UI controls
    };

    googleMapRef.current = new window.google.maps.Map(mapRef.current, mapOptions);

    // Load stations after map initialization
    loadStations();
  }, []);

  // Load Z Energy stations
  const loadStations = useCallback(async () => {
    try {
      setIsLoading(true);
      const result = await getZStations();

      if (result.success) {
        setAllStations(result.data);
        addMarkersToMap(result.data);

        // If a stationId is provided in URL params, select that station
        if (params.stationId) {
          const stationResult = await getStationById(params.stationId);
          if (stationResult.success) {
            centerMapOnStation(stationResult.data);
            setSelectedStation(stationResult.data);
          }
        }
      } else {
        setError("Failed to load Z Energy stations. Please try again later.");
      }
    } catch (err) {
      setError("An error occurred while loading the map. Please try again later.");
      console.error("Error loading stations:", err);
    } finally {
      setIsLoading(false);
    }
  }, [params]);

  // Add markers to the map
  const addMarkersToMap = useCallback((stations) => {
    if (!googleMapRef.current || !window.google) return;

    // Clear existing markers and overlays
    markersRef.current.forEach((marker) => marker.setMap(null));
    markersRef.current = [];

    overlaysRef.current.forEach((overlay) => overlay.setMap(null));
    overlaysRef.current = [];

    console.log(`Adding ${stations.length} Z Energy stations to map`);

    // Add markers for each station
    stations.forEach((station) => {
      // Create a custom marker with transparent background instead of orange circle
      const marker = new window.google.maps.Marker({
        position: station.location,
        map: googleMapRef.current,
        title: station.name,
        // Remove icon with orange background
        icon: {
          path: window.google.maps.SymbolPath.CIRCLE,
          fillOpacity: 0, // Make the background transparent
          strokeWeight: 0,
          scale: 0, // Invisible marker
        },
        visible: true, // Still make it clickable
        animation: window.google.maps.Animation.DROP,
        optimized: false, // Helps with z-index issues on some browsers
      });

      // Add Z logo overlay on top of the marker
      class ZLogoOverlay extends window.google.maps.OverlayView {
        constructor(position, map) {
          super();
          this.position = position;
          this.setMap(map);
        }

        onAdd() {
          this.div = document.createElement("div");
          this.div.className = "z-marker-overlay";

          const img = document.createElement("img");
          img.src = zLogo;
          img.alt = "Z";
          img.className = "z-logo";

          this.div.appendChild(img);

          const panes = this.getPanes();
          panes.overlayMouseTarget.appendChild(this.div);

          // Add click handler to the overlay
          this.div.addEventListener("click", () => {
            setSelectedStation(station);

            // Bounce animation when clicked
            marker.setAnimation(window.google.maps.Animation.BOUNCE);
            setTimeout(() => marker.setAnimation(null), 1500);
          });
        }

        draw() {
          const projection = this.getProjection();
          if (!projection) return;

          const pos = projection.fromLatLngToDivPixel(this.position);

          this.div.style.position = "absolute";
          this.div.style.left = pos.x - 15 + "px";
          this.div.style.top = pos.y - 15 + "px";
        }

        onRemove() {
          if (this.div) {
            this.div.parentNode.removeChild(this.div);
            this.div = null;
          }
        }
      }

      const overlay = new ZLogoOverlay(station.location, googleMapRef.current);
      overlaysRef.current.push(overlay);

      // Add click listener to marker (in addition to overlay)
      marker.addListener("click", () => {
        // Open the station details popup
        setSelectedStation(station);

        // Bounce animation when clicked
        marker.setAnimation(window.google.maps.Animation.BOUNCE);
        setTimeout(() => marker.setAnimation(null), 1500);
      });

      markersRef.current.push(marker);
    });
  }, []);

  // Find nearest station with a specific service
  const findNearestWithService = useCallback(
    (serviceId) => {
      if (!serviceId || allStations.length === 0 || !googleMapRef.current) return;

      // Map serviceId to display name
      const serviceString =
        serviceId === "ev"
          ? "EV Charging"
          : serviceId === "carwash"
          ? "Car Wash"
          : serviceId === "pay"
          ? "Pay in App"
          : serviceId === "coffee"
          ? "Coffee"
          : serviceId.charAt(0).toUpperCase() + serviceId.slice(1);

      // Case-insensitive matching for services
      const hasService = (station, searchTerm) => {
        if (!station.services || !Array.isArray(station.services)) {
          // Default stations have basic services
          return searchTerm.toLowerCase() === "fuel" || searchTerm.toLowerCase() === "toilet";
        }

        // Check if any service contains the search term (case insensitive)
        return station.services.some(
          (service) =>
            typeof service === "string" && service.toLowerCase().includes(searchTerm.toLowerCase())
        );
      };

      // Filter stations that provide the selected service
      const stationsWithService = allStations.filter(
        (station) => hasService(station, serviceId) || hasService(station, serviceString)
      );

      if (stationsWithService.length === 0) {
        alert(`No Z Energy stations found with ${serviceString} service.`);
        return;
      }

      // Get current map center
      const mapCenter = googleMapRef.current.getCenter();
      const centerLat = mapCenter.lat();
      const centerLng = mapCenter.lng();

      // Calculate distance to each station
      const stationsWithDistance = stationsWithService.map((station) => {
        const distance = calculateDistance(
          centerLat,
          centerLng,
          station.location.lat,
          station.location.lng
        );
        return { ...station, distance };
      });

      // Find nearest station
      const nearest = stationsWithDistance.reduce((prev, curr) =>
        prev.distance < curr.distance ? prev : curr
      );

      // Center map on nearest station
      centerMapOnStation(nearest);

      // Set the selected service
      setSelectedService(serviceId);
    },
    [allStations]
  );

  // Simple distance calculation using Haversine formula
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c; // Distance in km
    return d;
  };

  const deg2rad = (deg) => {
    return deg * (Math.PI / 180);
  };

  // Center map on a specific station
  const centerMapOnStation = useCallback((station) => {
    if (!googleMapRef.current || !window.google) return;

    googleMapRef.current.setCenter(station.location);
    googleMapRef.current.setZoom(15);

    // Find and animate the marker
    const marker = markersRef.current.find(
      (m) =>
        m.getPosition().lat() === station.location.lat &&
        m.getPosition().lng() === station.location.lng
    );

    if (marker) {
      marker.setAnimation(window.google.maps.Animation.BOUNCE);
      setTimeout(() => marker.setAnimation(null), 2000);
    }
  }, []);

  // Handle station selection
  const handleStationSelect = useCallback(
    (stationId) => {
      navigate(`/map/${stationId}`);
    },
    [navigate]
  );

  // Close station details popup
  const handleCloseStationDetails = () => {
    setSelectedStation(null);
    navigate("/map");
  };

  // Listen for custom events from info window
  useEffect(() => {
    const handleViewStationDetail = (e) => {
      handleStationSelect(e.detail);
    };

    document.addEventListener("viewStationDetail", handleViewStationDetail);

    return () => {
      document.removeEventListener("viewStationDetail", handleViewStationDetail);
    };
  }, [handleStationSelect]);

  // Load Google Maps API
  useEffect(() => {
    if (!window.google) {
      loadGoogleMapsScript();
    } else {
      initializeMap();
    }

    return () => {
      // Clean up markers and overlays when component unmounts
      if (markersRef.current) {
        markersRef.current.forEach((marker) => marker.setMap(null));
      }

      if (overlaysRef.current) {
        overlaysRef.current.forEach((overlay) => overlay.setMap(null));
      }
    };
  }, [loadGoogleMapsScript, initializeMap]);

  return (
    <div className="map-page">
      {/* Top search bar and home icon */}
      <div className="top-navigation">
        <form className="search-bar" onSubmit={handleSearchSubmit}>
          <div className="search-icon-wrapper">
            <FiSearch className="search-icon" size={22} />
          </div>
          <input
            type="search"
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearchChange}
            aria-label="Search for Z stations"
          />
        </form>
        <button className="home-button" onClick={handleHomeClick} aria-label="Go to home page">
          <FiHome className="home-icon" size={32} />
        </button>
      </div>

      {error && (
        <div className="error-message">
          <p>{error}</p>
          <button onClick={() => window.location.reload()}>Retry</button>
        </div>
      )}

      {isLoading && (
        <div className="loading-spinner">
          <p>Loading Z Energy stations...</p>
        </div>
      )}

      <div className="map-container" ref={mapRef} style={mapContainerStyle}></div>

      {/* Service Icons Bar */}
      <div className="service-icons-bar">
        {SERVICES.map((service) => (
          <div
            key={service.id}
            className={`service-icon ${selectedService === service.id ? "active" : ""}`}
            onClick={() => findNearestWithService(service.id)}
          >
            <div className="icon">
              <img src={service.icon} alt={service.name} />
            </div>
            <div className="name">{service.name}</div>
          </div>
        ))}
      </div>

      {/* Station Details Popup */}
      {selectedStation && (
        <StationDetails station={selectedStation} onClose={handleCloseStationDetails} />
      )}
    </div>
  );
};

// Simple wrapper component for direct use without nav elements
const MapWithNav = () => {
  return <MapPage />;
};

export default MapPage;
export { MapWithNav };
