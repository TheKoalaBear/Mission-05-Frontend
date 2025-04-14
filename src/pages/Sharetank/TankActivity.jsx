import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import styles from "./TankActivity.module.css"; // Corrected path
import BottomNav from "../../components/global/BottomNav"; // Corrected path

const TankActivity = () => {
  const navigate = useNavigate();
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState(null);

  useEffect(() => {
    // Get phone number from localStorage
    let userPhoneNumber = null;
    const userString = localStorage.getItem("user");
    if (userString) {
      try {
        const user = JSON.parse(userString);
        userPhoneNumber = user?.phoneNumber;
      } catch (e) {
        console.error("Failed to parse user data from localStorage:", e);
        setError("Could not retrieve user phone number. Please log in again.");
      }
    }

    if (!userPhoneNumber) {
      if (!error) {
        setError("Could not retrieve user phone number. Please log in again.");
      }
      setIsLoading(false);
      return; // Stop if no phone number
    }
    setPhoneNumber(userPhoneNumber);

    // Fetch transactions
    const fetchTransactions = async () => {
      setIsLoading(true);
      setError(null);
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Authentication error. Please log in again.");
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch(`/api/transactions/${userPhoneNumber}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setTransactions(data);
        } else {
          const errorData = await response
            .json()
            .catch(() => ({ message: "Failed to fetch activity." }));
          setError(
            `Error fetching activity: ${
              errorData.message || response.statusText
            }`
          );
          console.error(
            "Error fetching transactions:",
            response.status,
            errorData
          );
        }
      } catch (err) {
        setError("Network error fetching activity. Please try again.");
        console.error("Network error:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTransactions();
  }, []); // Run once on mount

  // Helper function to format date
  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <button className={styles.backButton} onClick={() => navigate(-1)}>
          <FaArrowLeft />
        </button>
        <div className={styles.headerTitle}>
          <h1>Recent activity</h1>
        </div>
      </div>

      {/* Content */}
      <div className={styles.content}>
        {isLoading && <p className={styles.loading}>Loading activity...</p>}
        {error && <p className={styles.error}>{error}</p>}
        {!isLoading && !error && transactions.length === 0 && (
          <p className={styles.noTransactions}>No recent activity found.</p>
        )}
        {!isLoading && !error && transactions.length > 0 && (
          <ul className={styles.transactionList}>
            {transactions.map((tx) => (
              <li key={tx._id} className={styles.transactionItem}>
                <div className={styles.transactionDetails}>
                  {/* TODO: Determine 'type' based on data if possible, e.g., Top-up vs Fuel Purchase */}
                  <span className={styles.transactionType}>
                    Sharetank Top-up
                  </span>
                  <span className={styles.transactionDate}>
                    {formatDate(tx.timestamp)}
                  </span>
                  {/* TODO: Add User Name here if backend populates it */}
                  {/* tx.userId?.firstName && <span className={styles.userName}>{tx.userId.firstName}</span> */}
                </div>
                <div className={styles.transactionAmount}>
                  <span className={styles.cost}>
                    ${tx.totalCost.toFixed(2)}
                  </span>
                  <span className={styles.liters}>
                    {tx.litersFilled.toFixed(3)} L
                  </span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <BottomNav />
    </div>
  );
};

export default TankActivity;
