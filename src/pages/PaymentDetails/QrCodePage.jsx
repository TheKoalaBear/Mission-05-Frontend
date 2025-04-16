import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import QRCode from "react-qr-code"; // Import the library
import { FaArrowLeft } from "react-icons/fa";
import styles from "./QrCodePage.module.css"; // CSS module in the same folder
import BottomNav from "../../components/global/BottomNav"; // Adjusted path to BottomNav

const QrCodePage = () => {
  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    setError("");
    let userPhoneNumber = null;
    const userString = localStorage.getItem("user");
    if (userString) {
      try {
        const user = JSON.parse(userString);
        userPhoneNumber = user?.phoneNumber;
      } catch (e) {
        console.error("Failed to parse user data from localStorage:", e);
        setError("Could not retrieve user data. Please log in again.");
      }
    }

    if (userPhoneNumber) {
      setPhoneNumber(userPhoneNumber);
    } else {
      if (!error) {
        // Avoid overwriting parsing error
        setError("Could not retrieve phone number. Please log in again.");
      }
    }
    setIsLoading(false);
  }, []);

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <button className={styles.backButton} onClick={() => navigate(-1)}>
          <FaArrowLeft />
        </button>
        <div className={styles.headerTitle}>
          <h1>Your QR Code</h1>
        </div>
      </div>

      {/* Content */}
      <div className={styles.content}>
        {isLoading && <p className={styles.message}>Loading...</p>}
        {error && (
          <p className={`${styles.message} ${styles.error}`}>{error}</p>
        )}
        {!isLoading && !error && phoneNumber && (
          <div className={styles.qrContainer}>
            <p className={styles.instructions}>
              Scan this code at the pump or in store.
            </p>
            <div className={styles.qrCodeWrapper}>
              <QRCode
                value={phoneNumber} // The data for the QR code
                size={256} // Adjust size as needed
                level={"H"} // Error correction level
                bgColor="#FFFFFF"
                fgColor="#000000"
              />
            </div>
            <p className={styles.phoneNumberDisplay}>
              Using number: {phoneNumber}
            </p>
            {/* You might add a button to refresh or instructions */}
          </div>
        )}
        {!isLoading && !error && !phoneNumber && (
          <p className={styles.message}>Phone number not found.</p>
        )}
      </div>
      <div className={styles.waveContainer}>
        <svg
          className={styles.editorial}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 24 150 28"
          preserveAspectRatio="none"
        >
          <defs>
            <path
              id="gentle-wave"
              d="M-160 44c30 0 
    58-18 88-18s
    58 18 88 18 
    58-18 88-18 
    58 18 88 18
    v44h-352z"
            />
          </defs>
          <g className={styles.parallax}>
            <use href="#gentle-wave" x="50" y="0" fill="#ff9933b8" />
            <use href="#gentle-wave" x="50" y="3" fill="#ff9933ad" />
            <use href="#gentle-wave" x="50" y="6" fill="#ff9933e0" />
          </g>
        </svg>
        <div className={styles.waveFiller}></div>
      </div>

      <BottomNav />
    </div>
  );
};

export default QrCodePage;
