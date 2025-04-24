import React from "react";
import { useNavigate } from "react-router-dom";
import BottomNav from "../../components/global/BottomNav";
import "./OrderConfirmation.css";

const OrderConfirmation = () => {
  const navigate = useNavigate();

  const handleHomeClick = () => {
    navigate("/");
  };

  return (
    <div className="confirmation-container">
      {/* Header */}
      <div className="confirmation-header">
        <div className="header-content">
          <div className="back-button">
            <button onClick={handleHomeClick} tabIndex="0" aria-label="Go back">
              <div className="back-icon"></div>
            </button>
          </div>
          <div className="header-title">
            <div className="check-icon"></div>
            <h2>Order Confirmed</h2>
          </div>
        </div>
      </div>

      {/* Animation */}
      <div className="confirmation-animation">
        <div className="animation-circle"></div>
        <div className="animation-check"></div>
      </div>

      {/* Confirmation Message */}
      <div className="confirmation-message">
        <p>
          Thank you for your order!
          <br />
          Your request has been successfully sent to our team at Z.
        </p>
        <p>
          We'll notify you shortly with a confirmation and details on when your order will be ready
          for pick-up. Stay tuned!
        </p>
      </div>

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
};

export default OrderConfirmation;
