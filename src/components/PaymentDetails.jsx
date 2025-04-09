import React from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaCreditCard, FaQuestionCircle } from "react-icons/fa";
import styles from "./PaymentDetails.module.css";

const PaymentDetails = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle payment details submission
    navigate("/dashboard"); // Navigate to dashboard after successful submission
  };

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <button className={styles.backButton} onClick={() => navigate(-1)}>
          <FaArrowLeft />
        </button>
        <div className={styles.headerTitle}>
          <FaCreditCard className={styles.cardIcon} />
          <h1>Add Payment detail</h1>
        </div>
      </div>

      <p className={styles.subtitle}>
        Save payment detail now, fuel up straight away
      </p>

      {/* Payment Form */}
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="cardNumber">Card number</label>
          <div className={styles.cardNumberInput}>
            <input
              type="text"
              id="cardNumber"
              placeholder="Please enter your card number"
              maxLength="19"
            />
            <div className={styles.cardTypes}>
              <img src="/mastercard-logo.png" alt="Mastercard" />
              <img src="/visa-logo.png" alt="Visa" />
            </div>
          </div>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="expiryDate">Expiry date</label>
          <input
            type="text"
            id="expiryDate"
            placeholder="MM/YY"
            maxLength="5"
          />
        </div>

        <div className={styles.formGroup}>
          <div className={styles.labelWithIcon}>
            <label htmlFor="cvv">CVV number</label>
            <FaQuestionCircle className={styles.helpIcon} />
          </div>
          <input
            type="text"
            id="cvv"
            placeholder="Please enter your CVV number"
            maxLength="3"
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="nameOnCard">Name on card</label>
          <input
            type="text"
            id="nameOnCard"
            placeholder="Please enter your name on card"
          />
        </div>

        <div className={styles.buttonGroup}>
          <button type="button" className={styles.saveLaterButton}>
            Save later
          </button>
          <button type="submit" className={styles.saveButton}>
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default PaymentDetails;
