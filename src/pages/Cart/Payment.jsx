import { useState } from "react";
import { useNavigate } from "react-router-dom";
import creditCardIcon from "../../assets/images/creditcard.svg";
import visaLogo from "../../assets/images/visa.svg";
import mastercardLogo from "../../assets/images/mastercard.svg";
import BottomNav from "../../components/global/BottomNav";
import "./Payment.css";

const Payment = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    nameOnCard: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/");
  };

  const handleBack = () => {
    navigate("/cart/confirm");
  };

  const handleCancel = () => {
    navigate("/cart/confirm");
  };

  return (
    <div className="payment-form-container">
      {/* Main Content */}
      <div className="main-content">
        {/* Header with Back Button and Pay title */}
        <div className="header">
          <div className="header-left">
            <button className="back-button" onClick={handleBack} aria-label="Go back" tabIndex="0">
              <svg
                width="30"
                height="30"
                viewBox="0 0 30 30"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18 8L10 15L18 22"
                  stroke="#1E196B"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <div className="title-section">
              <div className="icon-container">
                <img src={creditCardIcon} alt="Credit Card" className="credit-card-icon" />
              </div>
              <span className="title">Pay</span>
            </div>
          </div>
        </div>

        {/* Payment Form */}
        <form className="payment-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="cardNumber" className="form-label">
              Card number
            </label>
            <div className="input-container">
              <input
                type="text"
                id="cardNumber"
                name="cardNumber"
                className="form-input"
                placeholder="Please enter your card number"
                value={formData.cardNumber}
                onChange={handleChange}
              />
              <div className="card-logos">
                <img src={mastercardLogo} alt="Mastercard" className="card-logo" />
                <img src={visaLogo} alt="Visa" className="card-logo" />
              </div>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="expiryDate" className="form-label">
              Expiry date
            </label>
            <div className="input-container">
              <input
                type="text"
                id="expiryDate"
                name="expiryDate"
                className="form-input"
                placeholder="MM/YY"
                value={formData.expiryDate}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="cvv" className="form-label">
              CVV number
            </label>
            <div className="input-container">
              <input
                type="text"
                id="cvv"
                name="cvv"
                className="form-input"
                placeholder="Please enter your CVV number"
                value={formData.cvv}
                onChange={handleChange}
              />
              <div className="info-icon">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="8" cy="8" r="7.5" stroke="#1E196B" />
                  <path d="M8 11V7" stroke="#1E196B" strokeLinecap="round" strokeLinejoin="round" />
                  <circle cx="8" cy="5" r="1" fill="#1E196B" />
                </svg>
              </div>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="nameOnCard" className="form-label">
              Name on card
            </label>
            <div className="input-container">
              <input
                type="text"
                id="nameOnCard"
                name="nameOnCard"
                className="form-input"
                placeholder="Please enter your name on card"
                value={formData.nameOnCard}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="button-container">
            <button type="button" className="cancel-button" onClick={handleCancel}>
              Cancel
            </button>
            <button type="submit" className="submit-button">
              Pay
            </button>
          </div>
        </form>
      </div>

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
};

export default Payment;
