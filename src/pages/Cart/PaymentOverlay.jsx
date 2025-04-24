import React from "react";
import { useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import "./PaymentOverlay.css";

const PaymentOverlay = ({ isVisible, onClose, onPay }) => {
  const navigate = useNavigate();

  if (!isVisible) return null;

  // Sample card data - in a real app this would come from props or an API
  const card = {
    name: "Card Name / Nick Name",
    type: "Card Type",
    last4: "8245",
  };

  const handleUseAnotherPayment = () => {
    onClose(); // Close this overlay
    navigate("/cart/add-payment"); // Navigate to add payment page
  };

  return (
    <div className="payment-overlay">
      <div className="payment-overlay-content">
        {/* Header */}
        <div className="payment-header">
          <button onClick={onClose} className="back-button" aria-label="Go back" tabIndex="0">
            <FiArrowLeft className="back-icon" />
          </button>
          <div className="payment-title">My Payment cards</div>
          <div className="header-placeholder"></div> {/* For alignment */}
        </div>

        {/* Card Info */}
        <div className="card-info-container">
          <div className="card-info">
            <div className="card-details">
              <div className="card-name">{card.name}</div>
              <div className="card-type">{card.type}</div>
            </div>
            <div className="card-last4">{card.last4}</div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="payment-actions">
          <button
            onClick={onClose}
            className="cancel-payment-button"
            aria-label="Cancel payment"
            tabIndex="0"
          >
            Cancel
          </button>
          <button
            onClick={onPay}
            className="confirm-payment-button"
            aria-label="Confirm payment"
            tabIndex="0"
          >
            Pay
          </button>
        </div>

        {/* Use Another Payment Method */}
        <button
          onClick={handleUseAnotherPayment}
          className="other-payment-button"
          aria-label="Use another payment method"
          tabIndex="0"
        >
          Use another payment method
        </button>
      </div>
    </div>
  );
};

export default PaymentOverlay;
