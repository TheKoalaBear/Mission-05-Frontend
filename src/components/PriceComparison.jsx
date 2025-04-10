import React, { useState, useEffect } from "react";
import "./PriceComparison.css";
import zLogo from "../assets/images/z-logo.png";
import zFuelLogo from "../assets/images/z.png";

const PriceComparison = ({ onNavigateToPayByPlate }) => {
  const [currentTime, setCurrentTime] = useState(getCurrentTime());
  const [fromAddress, setFromAddress] = useState("");
  const [toAddress, setToAddress] = useState("");

  // Sample station data that matches the images with all three fuel types
  const stations = [
    {
      id: 1,
      name: "Z Kingsway Station",
      address: "26 Clevedon Road, Papakura",
      price: 297.9,
      fuelType: "91",
    },
    {
      id: 2,
      name: "Z Papakura Station",
      address: "254 Great South Road, Takanini",
      price: 264.9,
      fuelType: "91",
    },
    {
      id: 3,
      name: "Z Kingsway Station",
      address: "26 Clevedon Road, Papakura",
      price: 316.9,
      fuelType: "X95",
    },
    {
      id: 4,
      name: "Z Papakura Station",
      address: "254 Great South Road, Takanini",
      price: 282.9,
      fuelType: "X95",
    },
    {
      id: 5,
      name: "Z Kingsway Station",
      address: "26 Clevedon Road, Papakura",
      price: 231.9,
      fuelType: "D",
    },
    {
      id: 6,
      name: "Z Papakura Station",
      address: "254 Great South Road, Takanini",
      price: 196.9,
      fuelType: "D",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(getCurrentTime());
    }, 60000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  function getCurrentTime() {
    const now = new Date();
    return now.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  }

  const handleTopUp = (stationId) => {
    console.log(`Top up at station ${stationId}`);
    onNavigateToPayByPlate();
  };

  const handleHomeClick = () => {
    onNavigateToPayByPlate();
  };

  const formatAddress = (address) => {
    if (address.includes(",")) {
      const parts = address.split(",");
      return `${parts[0]},\n${parts[1]}`;
    }
    return address;
  };

  // Function to get the color for fuel type badges
  const getFuelBadgeColor = (fuelType) => {
    switch (fuelType) {
      case "91":
        return "#00ac46"; // Green
      case "X95":
        return "#E53935"; // Red
      case "D":
        return "#EF6C00"; // Orange
      default:
        return "#00ac46";
    }
  };

  // Function to get the price tag color
  const getPriceTagColor = (fuelType) => {
    switch (fuelType) {
      case "91":
        return "#00ac46"; // Green
      case "X95":
        return "#E53935"; // Red
      case "D":
        return "#EF6C00"; // Orange
      default:
        return "#00ac46";
    }
  };

  return (
    <div className="price-comparison-container">
      {/* Status Bar */}
      <div className="status-bar-container">
        <div className="status-bar">
          <div className="time">{currentTime}</div>
          <div className="icons">
            <div className="cellular">
              <svg
                width="18"
                height="12"
                viewBox="0 0 18 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M16.4998 0.777344H15.5998C15.0998 0.777344 14.6998 1.17734 14.6998 1.67734V10.4773C14.6998 10.9773 15.0998 11.3773 15.5998 11.3773H16.4998C16.9998 11.3773 17.3998 10.9773 17.3998 10.4773V1.67734C17.3998 1.17734 16.9998 0.777344 16.4998 0.777344ZM11.8998 2.57734H12.7998C13.2998 2.57734 13.6998 2.97734 13.6998 3.47734V10.4773C13.6998 10.9773 13.2998 11.3773 12.7998 11.3773H11.8998C11.3998 11.3773 10.9998 10.9773 10.9998 10.4773V3.47734C10.9998 2.97734 11.3998 2.57734 11.8998 2.57734ZM8.99982 4.37734C9.49982 4.37734 9.89982 4.77734 9.89982 5.27734V10.4773C9.89982 10.9773 9.49982 11.3773 8.99982 11.3773H8.09982C7.59982 11.3773 7.19982 10.9773 7.19982 10.4773V5.27734C7.19982 4.77734 7.59982 4.37734 8.09982 4.37734H8.99982ZM5.29982 6.17734C5.79982 6.17734 6.19982 6.57734 6.19982 7.07734V10.4773C6.19982 10.9773 5.79982 11.3773 5.29982 11.3773H4.39982C3.89982 11.3773 3.49982 10.9773 3.49982 10.4773V7.07734C3.49982 6.57734 3.89982 6.17734 4.39982 6.17734H5.29982ZM1.59982 7.97734H0.699824C0.199824 7.97734 -0.200176 8.37734 -0.200176 8.87734V10.4773C-0.200176 10.9773 0.199824 11.3773 0.699824 11.3773H1.59982C2.09982 11.3773 2.49982 10.9773 2.49982 10.4773V8.87734C2.49982 8.37734 2.09982 7.97734 1.59982 7.97734Z"
                  fill="black"
                />
              </svg>
            </div>
            <div className="wifi">
              <svg
                width="16"
                height="12"
                viewBox="0 0 16 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M8.00001 2.19924C9.80229 2.19924 11.4992 2.94166 12.6783 4.26333L13.6246 3.31351C12.1762 1.72434 10.1353 0.777344 8.00001 0.777344C5.86477 0.777344 3.82384 1.72434 2.37542 3.31351L3.32172 4.26333C4.50082 2.94166 6.19773 2.19924 8.00001 2.19924Z"
                  fill="black"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M8.00001 5.6655C8.99347 5.6655 9.9356 6.03454 10.6262 6.69479L11.5725 5.74496C10.6146 4.81607 9.33487 4.24359 8.00001 4.24359C6.66516 4.24359 5.38547 4.81607 4.42752 5.74496L5.37383 6.69479C6.06443 6.03454 7.00656 5.6655 8.00001 5.6655Z"
                  fill="black"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M8.00001 9.13177C8.36833 9.13177 8.71217 9.28133 8.95725 9.5427L8.00001 10.5001L7.04277 9.5427C7.28785 9.28133 7.63169 9.13177 8.00001 9.13177Z"
                  fill="black"
                />
              </svg>
            </div>
            <div className="battery">
              <svg
                width="25"
                height="12"
                viewBox="0 0 25 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  opacity="0.35"
                  x="0.833374"
                  y="0.777344"
                  width="21"
                  height="10.5"
                  rx="2.5"
                  stroke="black"
                />
                <path
                  opacity="0.4"
                  d="M23.3334 4.02734V7.52734C24.0534 7.19534 24.4434 6.63734 24.4434 6.02734C24.4434 5.41734 24.0534 4.85934 23.3334 4.52734"
                  fill="black"
                />
                <rect x="2.33337" y="2.27734" width="18" height="7.5" rx="1.5" fill="black" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="header">
        <div className="home-icon" onClick={handleHomeClick}>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M10 20V14H14V20H19V12H22L12 3L2 12H5V20H10Z" fill="#1E196B" />
          </svg>
        </div>
        <h1 className="title">Price Comparison</h1>
      </div>

      {/* Address Input Fields */}
      <div className="address-inputs">
        <div className="address-input-field">
          <input
            type="text"
            placeholder="Enter Address"
            value={fromAddress}
            onChange={(e) => setFromAddress(e.target.value)}
          />
        </div>
        <div className="address-input-field">
          <input
            type="text"
            placeholder="Enter Address"
            value={toAddress}
            onChange={(e) => setToAddress(e.target.value)}
          />
        </div>
      </div>

      {/* Station Cards Container */}
      <div className="station-cards">
        {stations.map((station) => (
          <div key={station.id} className="station-card">
            <div className="station-logo-container">
              <div className="station-logo">
                <img src={zLogo} alt="Z Energy Logo" className="z-logo-img" />
              </div>
              <div className="station-info">
                <h3 className="station-name">{station.name}</h3>
                <p className="station-address">{formatAddress(station.address)}</p>
              </div>
            </div>

            <div className="price-container">
              <div
                className="price-tag"
                style={{ backgroundColor: getPriceTagColor(station.fuelType) }}
              >
                ${station.price} per liter
              </div>
            </div>

            <div className="fuel-type-container">
              <div
                className="fuel-badge"
                style={{ backgroundColor: getFuelBadgeColor(station.fuelType) }}
              >
                <img src={zFuelLogo} alt="Z" className="fuel-badge-icon" />
                <span>{station.fuelType}</span>
              </div>
            </div>

            <div className="button-container">
              <button className="top-up-button" onClick={() => handleTopUp(station.id)}>
                Top up
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PriceComparison;
