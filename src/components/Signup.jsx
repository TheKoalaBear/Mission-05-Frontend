import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authService } from "../services/authService";
import styles from "./Signup.module.css";
import ZEnergyLogo from "../assets/Z_Energy_logo.png";

const Signup = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validatePhoneNumber = (phone) => {
    // Basic NZ phone number validation (allows +64 or 0 prefix)
    const re = /^(\+64|0)[2-9]\d{7,9}$/;
    return re.test(phone.replace(/\s+/g, ""));
  };

  const handleNextStep = (e) => {
    e.preventDefault();
    if (step === 1) {
      // Validate email and password
      if (!formData.email || !formData.password) {
        setError("Please fill in all fields");
        return;
      }
      if (!validateEmail(formData.email)) {
        setError("Please enter a valid email address");
        return;
      }
      if (formData.password.length < 6) {
        setError("Password must be at least 6 characters long");
        return;
      }
      setStep(2);
      setError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      // Validate all required fields
      if (!formData.firstName || !formData.lastName || !formData.phoneNumber) {
        setError("Please fill in all fields");
        setIsLoading(false);
        return;
      }

      // Validate phone number format
      if (!validatePhoneNumber(formData.phoneNumber)) {
        setError("Please enter a valid NZ phone number");
        setIsLoading(false);
        return;
      }

      // Format phone number before sending (remove spaces)
      const formattedData = {
        ...formData,
        phoneNumber: formData.phoneNumber.replace(/\s+/g, ""),
      };

      // Register user with all details
      const result = await authService.register(formattedData);

      // Store user data in localStorage
      if (result.token) {
        localStorage.setItem("token", result.token);
        localStorage.setItem(
          "user",
          JSON.stringify({
            email: formData.email,
            firstName: formData.firstName,
            lastName: formData.lastName,
            phoneNumber: formattedData.phoneNumber,
            ...result.user,
          })
        );
      }

      // Navigate to payment details page after successful registration
      navigate("/payment-details");
    } catch (error) {
      setError(
        error.response?.data?.message || "An error occurred during signup"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <img src={ZEnergyLogo} alt="Z Energy Logo" className={styles.logo} />

      {step === 1 ? (
        <form className={styles.form} onSubmit={handleNextStep}>
          <h2>Create Account</h2>
          {error && <div className={styles.error}>{error}</div>}

          <div className={styles.inputGroup}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />
            <small className={styles.hint}>Must be at least 6 characters</small>
          </div>

          <button type="submit" className={styles.button}>
            Next
          </button>

          <p className={styles.loginLink}>
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </form>
      ) : (
        <form className={styles.form} onSubmit={handleSubmit}>
          <h2>Personal Details</h2>
          {error && <div className={styles.error}>{error}</div>}

          <div className={styles.inputGroup}>
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="Enter your first name"
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Enter your last name"
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="phoneNumber">Phone Number</label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              placeholder="e.g., 021 123 4567"
              required
            />
            <small className={styles.hint}>Enter a valid NZ phone number</small>
          </div>

          <div className={styles.buttonGroup}>
            <button
              type="button"
              className={styles.backButton}
              onClick={() => setStep(1)}
            >
              Back
            </button>
            <button
              type="submit"
              className={styles.button}
              disabled={isLoading}
            >
              {isLoading ? "Creating Account..." : "Create Account"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default Signup;
