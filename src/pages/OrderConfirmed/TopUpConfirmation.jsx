import React from "react";
import { useNavigate } from "react-router-dom";
import BottomNav from "../../components/global/BottomNav";
import "./OrderConfirmation.css"; // We'll reuse the same CSS file

const TopUpConfirmation = () => {
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
          Thank you for your Top up!
          <br />
          Your purchase has been successfully processed.
        </p>
        <p>
          We'll notify you shortly via email with a confirmation and details on your purchase. Thank
          you!
        </p>
      </div>

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
};

export default TopUpConfirmation;
