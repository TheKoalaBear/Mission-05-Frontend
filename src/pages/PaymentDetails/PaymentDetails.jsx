import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaArrowLeft,
  FaCreditCard,
  FaQuestionCircle,
  FaCcVisa,
  FaCcMastercard,
} from "react-icons/fa";
import styles from "./PaymentDetails.module.css";
import Dashboard from "../Dashboard/Dashboard";

const PaymentDetails = () => {
  const navigate = useNavigate();
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [nameOnCard, setNameOnCard] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userId = localStorage.getItem("userId");

    if (!userId) {
      console.error("User ID not found. Cannot save payment details.");
      return;
    }

    console.log("Submitting Card Number:", cardNumber);

    try {
      const token = localStorage.getItem("token"); // Get token
      if (!token) {
        console.error("Authentication token not found. Please log in.");
        return;
      }

      const response = await fetch("/api/users/me/payment", {
        // NEW endpoint
        method: "PUT", // Changed from POST in previous example to PUT
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Add Authorization header
        },
        body: JSON.stringify({
          cardNumber: cardNumber.replace(/\s/g, ""), // Remove spaces before sending
          expiryDate,
          cvv,
          nameOnCard,
        }),
      });

      if (response.ok) {
        console.log("Payment details saved successfully");
        navigate("/dashboard");
      } else {
        console.error("Error saving payment details:", response.statusText);
      }
    } catch (error) {
      console.error("Error saving payment details:", error);
    }
  };

  const handleCardNumberChange = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    const formattedValue = value.replace(/(.{4})/g, "$1 ").trim();
    setCardNumber(formattedValue);
  };

  const handleExpiryDateChange = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    let formattedValue = value;
    if (value.length > 2) {
      formattedValue = `${value.slice(0, 2)}/${value.slice(2, 4)}`;
    }
    setExpiryDate(formattedValue);
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
              value={cardNumber}
              onChange={handleCardNumberChange}
              required
            />
            <div className={styles.cardTypes}>
              <FaCcMastercard />
              <FaCcVisa />
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
            value={expiryDate}
            onChange={handleExpiryDateChange}
            required
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
            value={cvv}
            onChange={(e) => setCvv(e.target.value.replace(/\D/g, ""))}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="nameOnCard">Name on card</label>
          <input
            type="text"
            id="nameOnCard"
            placeholder="Please enter your name on card"
            value={nameOnCard}
            onChange={(e) => setNameOnCard(e.target.value)}
            required
          />
        </div>

        <div className={styles.buttonGroup}>
          <button
            onClick={() => navigate("/dashboard")}
            type="button"
            className={styles.saveLaterButton}
          >
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
