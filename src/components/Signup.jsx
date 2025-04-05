import { useState } from "react";
import "./Signup.css";
import zLogo from "../assets/Z_Energy_logo.png";

const Signup = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobileNumber: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    nameOnCard: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleNext = () => {
    setStep(step + 1);
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="signup-step">
            <div className="logo-container">
              <img src={zLogo} alt="Z Energy Logo" className="z-logo" />
            </div>
            <div className="form-container">
              <h2>Create account</h2>
              <div className="form-group">
                <label>First name</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="Please enter your first name"
                />
              </div>
              <div className="form-group">
                <label>Last name</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Please enter your last name"
                />
              </div>
              <div className="form-group">
                <label>E-mail</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Please enter your email adress"
                />
              </div>
              <button className="primary-button" onClick={handleNext}>
                Create account
              </button>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="signup-step">
            <div className="logo-container">
              <img src={zLogo} alt="Z Energy Logo" className="z-logo" />
            </div>
            <div className="form-container">
              <h2>Mobile number</h2>
              <div className="form-group">
                <input
                  type="tel"
                  name="mobileNumber"
                  value={formData.mobileNumber}
                  onChange={handleChange}
                  placeholder="+64"
                />
              </div>
              <p className="description-text">
                We will text you to confirm your number
              </p>
              <button className="primary-button" onClick={handleNext}>
                Confirm
              </button>
              <div className="help-text">
                <p>Having Trouble?</p>
                <a href="#" className="link-text">
                  More Options here
                </a>
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="signup-step">
            <div className="header">
              <button className="back-button" onClick={handleBack}>
                ←
              </button>
              <div className="header-title">
                <span className="card-icon">Icone Here</span>
                <h2>Add Payment detail</h2>
              </div>
            </div>
            <div className="form-container">
              <p className="description-text">
                Save payment detail now, fuel up straight way
              </p>
              <div className="form-group">
                <label>Card number</label>
                <div className="card-input-container">
                  <input
                    type="text"
                    name="cardNumber"
                    value={formData.cardNumber}
                    onChange={handleChange}
                    placeholder="Please enter your card number"
                  />
                  <div className="card-types">
                    <span className="mastercard">MC</span>
                    <span className="visa">VISA</span>
                  </div>
                </div>
              </div>
              <div className="form-group">
                <label>Expiry date</label>
                <input
                  type="text"
                  name="expiryDate"
                  value={formData.expiryDate}
                  onChange={handleChange}
                  placeholder="MM/YY"
                />
              </div>
              <div className="form-group">
                <label>CVV number</label>
                <div className="card-input-container">
                  <input
                    type="text"
                    name="cvv"
                    value={formData.cvv}
                    onChange={handleChange}
                    placeholder="Please enter your CVV number"
                  />
                  <button className="help-icon">?</button>
                </div>
              </div>
              <div className="form-group">
                <label>Name on card</label>
                <input
                  type="text"
                  name="nameOnCard"
                  value={formData.nameOnCard}
                  onChange={handleChange}
                  placeholder="Please enter your name on card"
                />
              </div>
              <div className="action-buttons">
                <button className="secondary-button">Save later</button>
                <button className="primary-button">Save</button>
              </div>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="signup-step">
            <div className="permissions-overlay">
              <h2>
                Allow this application to access your device's Location. These
                can be configured in Settings
              </h2>
              <div className="permission-buttons">
                <button
                  className="permission-button deny"
                  onClick={() => console.log("Don't Allow")}
                >
                  Don't Allow
                </button>
                <button
                  className="permission-button allow"
                  onClick={() => setStep(5)}
                >
                  Allow
                </button>
              </div>
            </div>
          </div>
        );
      case 5:
        return (
          <div className="signup-step">
            <div className="permissions-overlay">
              <h2>
                Notifications may include alerts, sounds, and icon badges. These
                can be configured in Settings.
              </h2>
              <div className="permission-buttons">
                <button
                  className="permission-button deny"
                  onClick={() => console.log("Don't Allow")}
                >
                  Don't Allow
                </button>
                <button
                  className="permission-button allow"
                  onClick={() => setStep(6)}
                >
                  Allow
                </button>
              </div>
            </div>
          </div>
        );
      case 6:
        return (
          <div className="signup-step">
            <div className="loading-container">
              <div className="logo-container loading-logo">
                <img src={zLogo} alt="Z Energy Logo" className="z-logo" />
              </div>
              <div className="loading-progress">
                <div className="loading-spinner"></div>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="signup-container">
      <div className="wave-bg"></div>
      {renderStep()}
    </div>
  );
};

export default Signup; 