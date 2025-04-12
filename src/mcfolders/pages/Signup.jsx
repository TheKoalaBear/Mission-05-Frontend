import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../../services/authService";
import styles from "../css/Signup.module.css";
import ZEnergyLogo from "../../assets/orderfoodhomepage_img/Z_Energy_logo.png";
import { FaArrowLeft } from "react-icons/fa";

// Helper function for artificial delay
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const ARTIFICIAL_DELAY_MS = 2000; // 2 seconds delay

// Combined Loading Component
const LoadingIndicator = ({ message = "Please wait..." }) => (
  <div className={styles.loadingContainer}>
    <img src={ZEnergyLogo} alt="Z Energy Logo" className={styles.logoLoading} />
    <span className={styles.loader}></span>
    <p>{message}</p>
  </div>
);

// Combined Signup/Login Component
const Signup = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1: Mobile Input, 1.5: OTP/Login Prompt, 2: Create Account, 3: Loading, 4: Notif Perm, 5: Loc Perm
  const [formData, setFormData] = useState({
    phoneNumber: "",
    otp: Array(6).fill(""), // Initialize otp as an array of 6 empty strings
    firstName: "",
    lastName: "",
    email: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("Please wait...");
  const otpInputs = useRef([]); // Ref to hold references to the OTP input fields

  // Focus the first OTP input when Step 1.5 becomes active
  useEffect(() => {
    if (step === 1.5 && otpInputs.current[0]) {
      otpInputs.current[0].focus();
    }
  }, [step]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validatePhoneNumber = (phone) => {
    const re = /^(\+64|0)\d+$/;
    return re.test(phone.replace(/\s+/g, ""));
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  // Step 1: Handle Mobile Submission -> Check if user exists
  const handleMobileSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!formData.phoneNumber) {
      setError("Please enter your mobile number");
      return;
    }

    let phoneToSubmit = formData.phoneNumber.replace(/\s+/g, "");
    if (!validatePhoneNumber(phoneToSubmit)) {
      setError(
        "Please enter a valid NZ mobile number (e.g., +64 21... or 021...)"
      );
      return;
    }

    setIsLoading(true);
    setLoadingMessage("Checking number...");
    setStep(3);

    try {
      console.log("Checking if phone exists:", phoneToSubmit);
      const checkResult = await authService.checkPhoneNumber(phoneToSubmit);
      const exists = checkResult.exists;

      await sleep(ARTIFICIAL_DELAY_MS); // <<< ADDED DELAY

      setIsLoading(false);
      if (exists) {
        console.log("Phone exists, sending OTP...");
        setLoadingMessage("Sending code..."); // Optional: Change message
        setIsLoading(true);
        setStep(3);
        await authService.sendOtp(phoneToSubmit);
        await sleep(ARTIFICIAL_DELAY_MS / 2); // Shorter delay after sending OTP
        setIsLoading(false);
        console.log("OTP sent, proceeding to login flow (OTP Step)");
        setStep(1.5);
      } else {
        console.log(
          "User does not exist, proceeding to signup flow (Create Account Step)"
        );
        setStep(2);
      }
    } catch (error) {
      console.error("Error checking phone number:", error);
      setError("Could not verify phone number. Please try again.");
      // No delay on error
      setIsLoading(false);
      setStep(1);
    }
  };

  const handleOtpChange = (e, index) => {
    const { value } = e.target;
    if (/^[0-9]$/.test(value) || value === "") {
      // Only allow digits or empty string
      const newOtp = [...formData.otp];
      newOtp[index] = value;
      setFormData((prev) => ({ ...prev, otp: newOtp }));

      // Move focus to the next input if a digit is entered
      if (value !== "" && index < 5 && otpInputs.current[index + 1]) {
        otpInputs.current[index + 1].focus();
      }
    }
  };

  const handleOtpKeyDown = (e, index) => {
    // Move focus to the previous input on backspace if current input is empty
    if (
      e.key === "Backspace" &&
      formData.otp[index] === "" &&
      index > 0 &&
      otpInputs.current[index - 1]
    ) {
      otpInputs.current[index - 1].focus();
    }
  };

  // Step 1.5: Handle OTP / Login Confirmation
  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const enteredOtp = formData.otp.join(""); // Join the array into a string
    if (enteredOtp.length !== 6) {
      // New check
      setError("Please enter the complete 6-digit code.");
      return;
    }

    setIsLoading(true);
    setLoadingMessage("Verifying code...");
    setStep(3);

    try {
      let phoneToSubmit = formData.phoneNumber.replace(/\s+/g, "");
      console.log("Verifying OTP:", enteredOtp, "for number:", phoneToSubmit);

      const result = await authService.loginWithOtp({
        phoneNumber: phoneToSubmit,
        otp: enteredOtp,
      });

      await sleep(ARTIFICIAL_DELAY_MS); // <<< ADDED DELAY

      setIsLoading(false);
      navigate("/dashboard");
    } catch (error) {
      console.error("OTP Login Error:", error);
      setError(
        error.message === "Invalid OTP"
          ? "Invalid code. Please try again."
          : "Login failed. Please try again."
      );
      // No delay on error
      setIsLoading(false);
      setStep(1.5);
    }
  };

  // Step 2: Handle Account Creation (Signup flow only)
  const handleAccountSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Validate Step 2 fields
    if (!formData.firstName || !formData.lastName || !formData.email) {
      setError("Please fill in all fields");
      return;
    }
    if (!validateEmail(formData.email)) {
      setError("Please enter a valid email address");
      return;
    }

    setIsLoading(true);
    setLoadingMessage("Creating account...");
    setStep(3);

    try {
      const registrationData = {
        phoneNumber: formData.phoneNumber.replace(/\s+/g, ""),
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
      };

      console.log("Submitting registration data:", registrationData);

      const result = await authService.register(registrationData);

      // Store necessary info (using actual result from backend)
      if (result.token) {
        localStorage.setItem("token", result.token);
        localStorage.setItem("user", JSON.stringify(result.user));
        localStorage.setItem("userId", result.user.id || "temp-signup-id");
      }

      await sleep(ARTIFICIAL_DELAY_MS); // <<< ADDED DELAY

      setIsLoading(false);
      setStep(4); // Move to Notification Permission step
    } catch (error) {
      console.error("Signup Error:", error);
      setError(
        error.response?.data?.message || "An error occurred during signup"
      );
      // No delay on error
      setIsLoading(false);
      setStep(2);
    }
  };

  // Steps 4 & 5: Permission Handlers (Signup flow only)
  const handleNotificationPermission = (allowed) => {
    console.log(
      "Notification permission:",
      allowed ? "Allowed" : "Not Allowed"
    );
    setStep(5); // Move to Location Permission step
  };

  const handleLocationPermission = (allowed) => {
    console.log("Location permission:", allowed ? "Allowed" : "Not Allowed");
    navigate("/payment-details"); // Move to final Payment Details step
  };

  // Render different steps based on the 'step' state
  const renderStep = () => {
    switch (step) {
      case 1: // Mobile Number Input (Common Entry Point)
        return (
          // onSubmit now calls handleMobileSubmit
          <form className={styles.form} onSubmit={handleMobileSubmit}>
            <div className={styles.headerImageContainer}>
              <img
                src={ZEnergyLogo}
                alt="Z Energy Logo"
                className={styles.logo}
              />
            </div>
            <div className={styles.formContent}>
              <div className={styles.bowContainer}>
                <div className={styles.blueBow}></div>
                <div className={styles.yellowBow}></div>
                <div className={styles.whiteBow}></div>
              </div>
              <div className={styles.inputGroup}>
                <label htmlFor="phoneNumber">Mobile number</label>
                <input
                  type="tel"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  placeholder="+64"
                  required
                  className={styles.inputField}
                  disabled={isLoading} // Disable while checking
                />
                <small className={styles.hint}>
                  We will text you to confirm your number
                </small>
              </div>
              {error && <div className={styles.error}>{error}</div>}
              <button
                type="submit"
                className={styles.button}
                disabled={isLoading}
              >
                {/* Button text changes slightly? Or keep as Confirm? */}
                Confirm
              </button>
              <div className={styles.troubleLink}>
                Having Trouble?{" "}
                <span className={styles.linkOptions}>More Options here</span>
              </div>
              {/* Maybe add a subtle link to explicit Sign Up / Login? Optional */}
            </div>
          </form>
        );
      case 1.5: // OTP Input Step (Login Flow)
        return (
          <form className={styles.form} onSubmit={handleOtpSubmit}>
            <div className={styles.headerImageContainer}>
              <div className={styles.bowContainer2}>
                <div className={styles.blueBow}></div>
                <div className={styles.yellowBow}></div>
                <div className={styles.whiteBow}></div>
              </div>
            </div>
            <div className={styles.formContent}>
              {/* Optional: Back button to step 1? */}
              {/* <button onClick={() => setStep(1)} className={styles.backButtonInline}>Back</button> */}
              {/* <h3>Enter Confirmation Code</h3>
              <p className={styles.hint}>
                Enter the code sent to {formData.phoneNumber}
              </p> */}

              <div className={styles.inputGroup}>
                <label htmlFor="otp-0">Confirmation Code</label>{" "}
                {/* Label points to the first input */}
                <div className={styles.otpInputContainer}>
                  {formData.otp.map((digit, index) => (
                    <input
                      key={index}
                      id={`otp-${index}`}
                      ref={(el) => (otpInputs.current[index] = el)} // Assign ref
                      type="text" // Use text to allow single character
                      inputMode="numeric" // Hint for numeric keyboard
                      maxLength="1" // Only one digit per input
                      value={digit}
                      onChange={(e) => handleOtpChange(e, index)}
                      onKeyDown={(e) => handleOtpKeyDown(e, index)} // Handle backspace
                      required
                      className={styles.otpInput} // New style for individual boxes
                      autoComplete="off" // Disable autocomplete
                    />
                  ))}
                </div>
              </div>
              {error && <div className={styles.error}>{error}</div>}
              <button
                type="submit"
                className={styles.button}
                disabled={isLoading || formData.otp.join("").length !== 6} // Disable if not 6 digits or loading
              >
                Verify & Login
              </button>
              <button
                type="button"
                className={styles.linkButton}
                onClick={() => console.log("Resend OTP clicked")}
              >
                {" "}
                {/* Add resend OTP functionality */}
                Resend Code
              </button>
            </div>
          </form>
        );
      case 2: // Create Account (Signup Flow)
        return (
          <div className={styles.formContainer}>
            <div className={styles.stepHeader}>
              <button onClick={() => setStep(1)} className={styles.backButton}>
                {" "}
                {/* Back goes to step 1 */}
                <FaArrowLeft />
              </button>
              <h2 className={styles.stepTitle}>Create account</h2>
            </div>
            {/* onSubmit now calls handleAccountSubmit */}
            <form className={styles.form} onSubmit={handleAccountSubmit}>
              <div className={styles.bowContainer2}>
                <div className={styles.blueBow}></div>
                <div className={styles.yellowBow}></div>
                <div className={styles.whiteBow}></div>
              </div>
              <div className={styles.formContent}>
                {" "}
                {/* Re-use form content wrapper */}
                {/* Input fields for firstName, lastName, email */}
                {/* ... existing input fields ... */}
                <div className={styles.inputGroup}>
                  <label htmlFor="firstName">First name</label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="Please enter your first name"
                    required
                    className={styles.inputField}
                  />
                </div>
                <div className={styles.inputGroup}>
                  <label htmlFor="lastName">Last name</label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Please enter your last name"
                    required
                    className={styles.inputField}
                  />
                </div>
                <div className={styles.inputGroup}>
                  <label htmlFor="email">E-mail</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Please enter your email address"
                    required
                    className={styles.inputField}
                  />
                </div>
                {error && <div className={styles.error}>{error}</div>}
                <button
                  type="submit"
                  className={styles.button}
                  disabled={isLoading}
                >
                  {isLoading ? "Creating..." : "Create account"}
                </button>
              </div>
            </form>
          </div>
        );
      case 3: // Loading Indicator (Common)
        return <LoadingIndicator message={loadingMessage} />;

      case 4: // Notification Permission (Signup Flow)
        return (
          <div className={styles.permissionContainer}>
            <div className={styles.headerImageContainer}>
              <div className={styles.bowContainer2}>
                <div className={styles.blueBow}></div>
                <div className={styles.yellowBow}></div>
                <div className={styles.whiteBow}></div>
              </div>
            </div>
            <div className={styles.permissionContent}>
              <p style={{ paddingLeft: "2.5rem", paddingRight: "2.5rem" }}>
                Notifications may include alerts, sounds, and icon badges. These
                can be configured in Settings.
              </p>
              <div className={styles.permissionButtons}>
                <button
                  onClick={() => handleNotificationPermission(false)}
                  className={styles.permissionButtonDeny}
                >
                  Don't Allow
                </button>
                <button
                  onClick={() => handleNotificationPermission(true)}
                  className={styles.permissionButtonAllow}
                >
                  Allow
                </button>
              </div>
            </div>
          </div>
        );

      case 5: // Location Permission (Signup Flow)
        return (
          <div className={styles.permissionContainer}>
            <div className={styles.headerImageContainer}>
              <div className={styles.bowContainer2}>
                <div className={styles.blueBow}></div>
                <div className={styles.yellowBow}></div>
                <div className={styles.whiteBow}></div>
              </div>
            </div>
            <div className={styles.permissionContent}>
              <p>
                Allow this application to access your device's Location. These
                can be configured in Settings.
              </p>
              <div className={styles.permissionButtons}>
                <button
                  onClick={() => handleLocationPermission(false)}
                  className={styles.permissionButtonDeny}
                >
                  Don't Allow
                </button>
                <button
                  onClick={() => handleLocationPermission(true)}
                  className={styles.permissionButtonAllow}
                >
                  Allow
                </button>
              </div>
            </div>
          </div>
        );
      default:
        // Should reset to step 1 or show generic error?
        console.error("Invalid step reached:", step);
        setStep(1);
        return <div>An unexpected error occurred. Please try again.</div>;
    }
  };

  return (
    <div
      className={`${styles.container} ${styles[`step${step}Container`] || ""}`}
    >
      {renderStep()}
    </div>
  );
};

export default Signup;
