import React from "react";
import { FiArrowLeft, FiXCircle } from "react-icons/fi";
import "./PaymentDeclinedOverlay.css";

const PaymentDeclinedOverlay = ({ isVisible, onClose, onTryAnotherCard }) => {
  if (!isVisible) return null;

  return (
    <div className="payment-declined-overlay">
      <div className="payment-declined-content">
        {/* Header */}
        <div className="payment-declined-header">
          <button onClick={onClose} className="back-button" aria-label="Go back" tabIndex="0">
            <FiArrowLeft className="back-icon" />
          </button>
          <div className="payment-declined-title">Payment Declined</div>
          <div className="header-placeholder"></div> {/* For alignment */}
        </div>

        {/* Error Icon */}
        <div className="error-icon-container">
          <FiXCircle className="error-icon" />
        </div>

        {/* Error Message */}
        <div className="error-message-container">
          <p className="error-message-primary">
            We're sorry, but your payment was not successful. Please check your payment details and
            try again.
          </p>
          <p className="error-message-secondary">
            If the issue persists, contact your bank or reach out to our customer team for
            assistance.
          </p>
          <p className="thank-you-message">Thank you!</p>
        </div>

        {/* Action Buttons */}
        <div className="payment-declined-actions">
          <button
            onClick={onClose}
            className="cancel-payment-button"
            aria-label="Cancel payment"
            tabIndex="0"
          >
            Cancel
          </button>
          <button
            onClick={onTryAnotherCard}
            className="try-another-card-button"
            aria-label="Try another card"
            tabIndex="0"
          >
            Try another card
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentDeclinedOverlay;
