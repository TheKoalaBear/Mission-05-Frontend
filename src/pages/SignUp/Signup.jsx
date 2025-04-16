import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../../services/authService";
import styles from "./Signup.module.css";
import ZEnergyLogo from "../../assets/orderfoodhomepage_img/Z_Energy_logo.png";
import { FaArrowLeft } from "react-icons/fa";

// Import Step Components
import MobileInputStep from "./MobileInputStep";
import OtpInputStep from "./OtpInputStep";
import CreateAccountStep from "./CreateAccountStep";
import PermissionStep from "./PermissionStep";
import LoadingIndicator from "./LoadingIndicator";

// Helper function for artificial delay
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const ARTIFICIAL_DELAY_MS = 2000;

const Signup = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1: Mobile, 1.5: OTP, 2: Create, 3: Loading, 4: NotifPerm, 5: LocPerm
  const [formData, setFormData] = useState({
    phoneNumber: "",
    otp: Array(6).fill(""),
    firstName: "",
    lastName: "",
    email: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("Please wait...");

  // --- Validation Functions (defined inside component) ---
  const validatePhoneNumber = (phone) => {
    const re = /^(\+64|0)\d+$/;
    return re.test(phone.replace(/\s+/g, ""));
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };
  // ---------------------------------------------------

  // --- Handlers for Input Changes ---
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError(""); // Clear error on change
  };

  const handleOtpChange = (e, index, otpInputsRef) => {
    const { value } = e.target;
    if (/^[0-9]$/.test(value) || value === "") {
      const newOtp = [...formData.otp];
      newOtp[index] = value;
      setFormData((prev) => ({ ...prev, otp: newOtp }));
      setError("");

      if (value !== "" && index < 5 && otpInputsRef.current[index + 1]) {
        otpInputsRef.current[index + 1].focus();
      }
    }
  };

  const handleOtpKeyDown = (e, index, otpInputsRef) => {
    if (
      e.key === "Backspace" &&
      formData.otp[index] === "" &&
      index > 0 &&
      otpInputsRef.current[index - 1]
    ) {
      otpInputsRef.current[index - 1].focus();
    }
  };

  // --- Handlers for Step Submissions / Actions ---
  const handleMobileSubmit = async (e) => {
    e?.preventDefault();
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
    // No need to setStep(3) here, renderStep handles loading state

    try {
      const checkResult = await authService.checkPhoneNumber(phoneToSubmit);
      await sleep(ARTIFICIAL_DELAY_MS);

      if (checkResult.exists) {
        setLoadingMessage("Sending code...");
        await authService.sendOtp(phoneToSubmit);
        await sleep(ARTIFICIAL_DELAY_MS / 2);
        setStep(1.5);
      } else {
        setStep(2);
      }
    } catch (error) {
      console.error("Error checking phone number:", error);
      setError("Could not verify phone number. Please try again.");
      setStep(1);
    } finally {
      setIsLoading(false);
      setLoadingMessage("Please wait..."); // Reset loading message
    }
  };

  const handleOtpSubmit = async (e) => {
    e?.preventDefault();
    setError("");
    const enteredOtp = formData.otp.join("");
    if (enteredOtp.length !== 6) {
      setError("Please enter the complete 6-digit code.");
      return;
    }

    setIsLoading(true);
    setLoadingMessage("Verifying code...");

    try {
      let phoneToSubmit = formData.phoneNumber.replace(/\s+/g, "");
      await authService.loginWithOtp({
        phoneNumber: phoneToSubmit,
        otp: enteredOtp,
      });
      await sleep(ARTIFICIAL_DELAY_MS);
      navigate("/dashboard");
    } catch (error) {
      console.error("OTP Login Error:", error);
      setError(
        error.message === "Invalid OTP"
          ? "Invalid code. Please try again."
          : "Login failed. Please try again."
      );
      setStep(1.5);
    } finally {
      setIsLoading(false);
      setLoadingMessage("Please wait...");
    }
  };

  const handleAccountSubmit = async (e) => {
    e?.preventDefault();
    setError("");

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

    try {
      const registrationData = {
        phoneNumber: formData.phoneNumber.replace(/\s+/g, ""),
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
      };
      const result = await authService.register(registrationData);

      if (result.token) {
        localStorage.setItem("token", result.token);
        localStorage.setItem("user", JSON.stringify(result.user));
        localStorage.setItem("userId", result.user.id || "temp-signup-id");
      }

      await sleep(ARTIFICIAL_DELAY_MS);
      setStep(4);
    } catch (error) {
      console.error("Signup Error:", error);
      setError(
        error.response?.data?.message || "An error occurred during signup"
      );
      setStep(2);
    } finally {
      setIsLoading(false);
      setLoadingMessage("Please wait...");
    }
  };

  const handleNotificationPermission = (allowed) => {
    console.log(
      "Notification permission:",
      allowed ? "Allowed" : "Not Allowed"
    );
    setStep(5);
  };

  const handleLocationPermission = (allowed) => {
    console.log("Location permission:", allowed ? "Allowed" : "Not Allowed");
    navigate("/payment-details");
  };

  // --- Step Rendering Logic ---
  const renderStep = () => {
    if (isLoading) {
      return <LoadingIndicator message={loadingMessage} />;
    }

    switch (step) {
      case 1:
        return (
          <MobileInputStep
            phoneNumber={formData.phoneNumber}
            onChange={handleChange}
            onSubmit={handleMobileSubmit}
            isLoading={false}
            error={error}
          />
        );
      case 1.5:
        return (
          <OtpInputStep
            otp={formData.otp}
            onOtpChange={handleOtpChange}
            onOtpKeyDown={handleOtpKeyDown}
            onSubmit={handleOtpSubmit}
            isLoading={false}
            error={error}
            onResend={() => console.log("Resend OTP clicked")} // TODO: Implement resend
          />
        );
      case 2:
        return (
          <CreateAccountStep
            formData={formData}
            onChange={handleChange}
            onSubmit={handleAccountSubmit}
            onBack={() => {
              setError("");
              setStep(1);
            }}
            isLoading={false}
            error={error}
          />
        );
      case 4:
        return (
          <PermissionStep
            type="notification"
            onAllow={() => handleNotificationPermission(true)}
            onDeny={() => handleNotificationPermission(false)}
          />
        );
      case 5:
        return (
          <PermissionStep
            type="location"
            onAllow={() => handleLocationPermission(true)}
            onDeny={() => handleLocationPermission(false)}
          />
        );
      default:
        console.error("Invalid step reached:", step);
        setStep(1);
        return <div>An unexpected error occurred. Redirecting...</div>;
    }
  };

  // --- Main Component Return ---
  return <div className={`${styles.container}`}>{renderStep()}</div>;
};

export default Signup;
