import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaCcVisa, FaCcMastercard } from "react-icons/fa"; // Placeholder icons
import styles from "./TopUpPage.module.css";

const TopUpPage = () => {
  const navigate = useNavigate();
  const [topUpAmount, setTopUpAmount] = useState(0);
  const maxAmount = 500; // Example max top-up amount

  const handleSliderChange = (event) => {
    setTopUpAmount(parseInt(event.target.value, 10));
  };

  const handleTopUp = () => {
    console.log(`Topping up ${topUpAmount}`);
    // TODO: Implement actual top-up API call
    // navigate back or to a confirmation page
  };

  // Placeholder card data - fetch this from user data
  const savedCard = {
    last4: "5678",
    brand: "visa", // or 'mastercard'
  };

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <button className={styles.backButton} onClick={() => navigate(-1)}>
          <FaArrowLeft />
        </button>
        <div className={styles.headerTitle}>
          <h1 className={styles.title}>Top up</h1>
        </div>
      </div>

      {/* Saved Card */}
      <div className={styles.cardSection}>
        <h2 className={styles.sectionTitle}>Recent saved card</h2>
        <div className={styles.cardDetails}>
          <span>•••• •••• •••• {savedCard.last4}</span>
          {savedCard.brand === "visa" && (
            <FaCcVisa size={30} className={styles.cardIcon} />
          )}
          {savedCard.brand === "mastercard" && (
            <FaCcMastercard size={30} className={styles.cardIcon} />
          )}
        </div>
      </div>

      {/* Amount Section */}
      <div className={styles.amountSection}>
        <h2 className={styles.sectionTitle}>Amount to top up</h2>
        <div className={styles.amountDisplay}>${topUpAmount}</div>
        <input
          type="range"
          min="0"
          max={maxAmount}
          value={topUpAmount}
          onChange={handleSliderChange}
          className={styles.slider}
        />
      </div>

      {/* Action Button */}
      <div className={styles.buttonContainer}>
        <button
          className={styles.topUpButton}
          onClick={handleTopUp}
          disabled={topUpAmount === 0} // Disable if amount is 0
        >
          Top up now
        </button>
      </div>
    </div>
  );
};

export default TopUpPage;
