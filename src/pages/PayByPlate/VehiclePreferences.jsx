import { useState, useEffect } from "react";
import "./VehiclePreferences.css";
import { FaCarSide, FaBell } from "react-icons/fa";
import { IoMdArrowBack } from "react-icons/io";
import creditCardIcon from "../../assets/images/creditcard.svg";
import zLogo from "../../assets/images/z.png";
import { useNavigate } from "react-router-dom";

const VehiclePreferences = ({
  onBackClick,
  onSave,
  existingVehicle,
  isEditing = false,
  onAddPayment,
  isSaving = false,
  error = null,
}) => {
  const [plateNumber, setPlateNumber] = useState("");
  const [selectedFuelTypes, setSelectedFuelTypes] = useState([]);
  const [confirmOnArrival, setConfirmOnArrival] = useState(false);

  useEffect(() => {
    if (existingVehicle) {
      setPlateNumber(existingVehicle.plateNumber || "");
      const fuelTypesArray = Array.isArray(existingVehicle.fuelType)
        ? existingVehicle.fuelType
        : existingVehicle.fuelType
        ? [existingVehicle.fuelType]
        : [];
      setSelectedFuelTypes(fuelTypesArray);
      setConfirmOnArrival(existingVehicle.confirmOnArrival || false);
    }
  }, [existingVehicle]);

  const handlePlateNumberChange = (e) => {
    setPlateNumber(e.target.value.toUpperCase());
  };

  const handleFuelTypeSelect = (type) => {
    setSelectedFuelTypes((prevSelected) => {
      if (prevSelected.includes(type)) {
        return prevSelected.filter((item) => item !== type);
      } else {
        return [...prevSelected, type];
      }
    });
  };

  const handleToggleConfirm = () => {
    setConfirmOnArrival(!confirmOnArrival);
  };

  const handleSave = () => {
    if (plateNumber && selectedFuelTypes.length > 0) {
      onSave({
        plateNumber,
        fuelType: selectedFuelTypes,
        confirmOnArrival,
      });
    }
  };

  return (
    <div className="vehicle-preferences-container">
      {/* Status Bar */}
      <div className="status-bar-container">
        <div className="status-bar">
          <div className="time">9:41</div>
          <div className="icons">
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

      {/* Main Content */}
      <div className="main-content">
        {/* Header */}
        <div className="header">
          <div className="header-left">
            <button className="back-button" onClick={onBackClick} aria-label="Go back" tabIndex="0">
              <IoMdArrowBack size={24} color="#1E196B" />
            </button>
            <div className="icon-container">
              <FaCarSide className="car-icon" />
            </div>
            <span className="title">{isEditing ? "Edit vehicle" : "Vehicle preferences"}</span>
          </div>
        </div>

        {/* Number Plate Input */}
        <div className="form-section">
          <label className="form-label">Number plate</label>
          <div className="form-hint">Please enter your plate number</div>
          <div className="plate-input-container">
            <input
              type="text"
              className="plate-input"
              value={plateNumber}
              onChange={handlePlateNumberChange}
              placeholder="ZED123"
            />
          </div>
        </div>

        {/* Fuel Type Selection */}
        <div className="form-section">
          <label className="form-label">Fuel type</label>
          <div className="form-hint">Please select your fuel type</div>
          <div className="fuel-options">
            <div
              className={`fuel-option ${selectedFuelTypes.includes("Z91") ? "selected" : ""}`}
              onClick={() => handleFuelTypeSelect("Z91")}
            >
              <div className="fuel-icon z91-icon">
                <img src={zLogo} alt="Z" className="z-logo" />
                <span>91</span>
              </div>
              <div className="fuel-name">Z 91</div>
            </div>
            <div
              className={`fuel-option ${selectedFuelTypes.includes("ZX95") ? "selected" : ""}`}
              onClick={() => handleFuelTypeSelect("ZX95")}
            >
              <div className="fuel-icon zx95-icon">
                <img src={zLogo} alt="Z" className="z-logo" />
                <span>X 95</span>
              </div>
              <div className="fuel-name">Z X 95</div>
            </div>
            <div
              className={`fuel-option ${selectedFuelTypes.includes("ZD") ? "selected" : ""}`}
              onClick={() => handleFuelTypeSelect("ZD")}
            >
              <div className="fuel-icon zd-icon">
                <img src={zLogo} alt="Z" className="z-logo" />
                <span>D</span>
              </div>
              <div className="fuel-name">Z D</div>
            </div>
          </div>
        </div>

        {/* Payment Method */}
        <div className="form-section payment-section">
          <div className="payment-header">
            <div className="payment-info">
              <img src={creditCardIcon} alt="Credit Card" className="credit-card-icon" />
              <div>
                <label className="form-label">Payment method</label>
                <div className="form-hint">Please select your payment type</div>
              </div>
            </div>
            <button className="add-payment-button" onClick={onAddPayment}>
              + Add
            </button>
          </div>

          {/* Saved for future backend integration
          <div className="payment-options">
            <div className="payment-card">
              <div className="payment-card-left">
                <div className="payment-logo">
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="32" height="32" rx="8" fill="#F0F0F0"/>
                    <path d="M9 12H23V14H9V12Z" fill="#666666"/>
                    <path d="M9 16H15V18H9V16Z" fill="#666666"/>
                    <path d="M9 20H13V22H9V20Z" fill="#666666"/>
                  </svg>
                </div>
                <div className="payment-details">
                  <div className="payment-name">Visa •••• 4582</div>
                  <div className="payment-exp">Expires 04/25</div>
                </div>
              </div>
              <div className="payment-actions">
                <button className="add-payment-button">Change</button>
              </div>
            </div>
          </div>
          
          <div className="add-new-payment">
            <button className="add-new-payment-button">
              + Add new payment method
            </button>
          </div>
          */}
        </div>

        {/* Confirm on Arrival Toggle */}
        <div className="form-section confirm-section">
          <div className="confirm-container">
            <div className="confirm-icon-container">
              <FaBell className="bell-icon" />
            </div>
            <div className="confirm-text">
              <div className="confirm-title">Confirm my details on arrival</div>
              <div className="confirm-description">
                Recognise my plate but don't want authorise the pump automatically
              </div>
            </div>
            <label className="toggle-switch">
              <input type="checkbox" checked={confirmOnArrival} onChange={handleToggleConfirm} />
              <span className="slider"></span>
            </label>
          </div>
        </div>

        {/* Save Button */}
        <div className="form-actions">
          {error && <div className="error-message">{error}</div>}
          <button
            className={`save-button ${isSaving ? "saving" : ""}`}
            onClick={handleSave}
            disabled={isSaving || !plateNumber || selectedFuelTypes.length === 0}
          >
            {isSaving ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default VehiclePreferences;

// Navigation wrapper for use in routing
export const VehiclePreferencesWithNav = ({ vehicleData, isEditing, handleSaveVehicle }) => {
  const navigate = useNavigate();
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState(null);

  const handleSave = async (data) => {
    try {
      setIsSaving(true);
      setError(null);

      const result = await handleSaveVehicle(data);

      if (result.success) {
        navigate("/pay-by-plate");
      } else {
        setError(result.error);
      }
    } catch {
      setError("An unexpected error occurred");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <VehiclePreferences
      onBackClick={() => navigate("/pay-by-plate")}
      onSave={handleSave}
      existingVehicle={isEditing ? vehicleData : null}
      isEditing={isEditing}
      onAddPayment={() => navigate("/payment/processing")}
      isSaving={isSaving}
      error={error}
    />
  );
};
