import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaArrowLeft,
  FaCcVisa,
  FaCcMastercard,
  FaPlusCircle,
} from "react-icons/fa";
import styles from "../css/TopUpPage.module.css";
import BottomNav from "../../mcfolders/components/BottomNav";

const TopUpPage = () => {
  const navigate = useNavigate();
  const [topUpAmount, setTopUpAmount] = useState(0);
  const [savedCardData, setSavedCardData] = useState(null);
  const [tankBalance, setTankBalance] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const petrolPrice = 2.632;

  const maxAmount =
    tankBalance !== null ? (225 - tankBalance) * petrolPrice : 0;

  useEffect(() => {
    setIsLoading(true);
    setSavedCardData(null);
    setTankBalance(null);

    const fetchCardSummary = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No auth token found, cannot fetch payment summary.");
        return null; // Indicate failure or no data
      }

      try {
        const response = await fetch("/api/users/me/payment-summary", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          console.log("Fetched card summary:", data);
          // Ensure data has expected format before returning
          if (data && data.last4 && data.brand) {
            return data; // { last4: '...', brand: '...' }
          } else {
            console.warn(
              "Received card summary data in unexpected format:",
              data
            );
            return null;
          }
        } else if (response.status === 404) {
          console.log("No payment summary found in backend.");
          return null; // No card saved
        } else {
          console.error(
            "Error fetching payment summary:",
            response.status,
            response.statusText
          );
          if (response.status === 401 || response.status === 403) {
            console.error(
              "Unauthorized access fetching payment summary. Please log in again."
            );
          }
          return null;
        }
      } catch (error) {
        console.error("Network error fetching payment summary:", error);
        return null;
      }
    };

    const fetchTankBalance = async () => {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId"); // Get userId

      if (!token || !userId) {
        console.error("Token or UserId not found, cannot fetch tank balance.");
        return null;
      }

      try {
        const response = await fetch(`/api/tanks/${userId}`, {
          // Use userId in path
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          console.log("Fetched tank data:", data);
          if (data && typeof data.balance === "number") {
            return data.balance; // Return only the balance number
          } else {
            console.warn(
              "Received tank data in unexpected format or missing balance:",
              data
            );
            return null;
          }
        } else if (response.status === 404) {
          console.log("User/Tank data not found in backend.");
          return null;
        } else {
          console.error(
            "Error fetching tank balance:",
            response.status,
            response.statusText
          );
          if (response.status === 401 || response.status === 403) {
            console.error(
              "Unauthorized access fetching tank balance. Please log in again."
            );
          }
          return null;
        }
      } catch (error) {
        console.error("Network error fetching tank balance:", error);
        return null;
      }
    };

    Promise.all([fetchCardSummary(), fetchTankBalance()])
      .then(([cardData, balanceData]) => {
        setSavedCardData(cardData);
        setTankBalance(balanceData);
      })
      .catch((error) => {
        console.error("Error during parallel data fetching setup:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [navigate]);

  const handleSliderChange = (event) => {
    setTopUpAmount(parseFloat(event.target.value));
  };

  const handleTopUp = async () => {
    if (!savedCardData) {
      alert("Please add a payment card first.");
      navigate("/payment-details");
      return;
    }
    if (topUpAmount <= 0) {
      alert("Please select a top-up amount greater than zero.");
      return;
    }

    let phoneNumber = null;
    const userString = localStorage.getItem("user");
    if (userString) {
      try {
        const user = JSON.parse(userString);
        phoneNumber = user?.phoneNumber;
      } catch (e) {
        console.error("Failed to parse user data from localStorage:", e);
      }
    }

    if (!phoneNumber) {
      alert("Could not retrieve user phone number. Please log in again.");
      // Optionally navigate to login
      return;
    }

    const calculatedLiters = topUpAmount / petrolPrice;

    console.log(
      `Attempting to record transaction: ${topUpAmount.toFixed(
        2
      )} ($), ${calculatedLiters.toFixed(3)} (L) for ${phoneNumber}`
    );

    // --- Perform Top-up and Transaction Recording API Calls ---
    setIsLoading(true);
    let topupResponseData = null; // To store data from the first call
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("Authentication error. Please log in again.");
        setIsLoading(false);
        // Optionally navigate to login
        return;
      }

      // === Step 1: Call the endpoint to update the tank balance ===
      const topupResponse = await fetch("/api/tanks/topup", {
        // Endpoint that updates balance
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          amount: parseFloat(topUpAmount.toFixed(2)), // Send dollar amount
        }),
      });

      if (!topupResponse.ok) {
        // Handle error from the top-up call specifically
        const errorData = await topupResponse
          .json()
          .catch(() => ({ message: "Failed to process top-up." }));
        console.error("Tank top-up failed:", topupResponse.status, errorData);
        alert(
          `Top-up failed: ${errorData.message || topupResponse.statusText}`
        );
        setIsLoading(false);
        return; // Stop if balance update failed
      }

      topupResponseData = await topupResponse.json(); // Get { newBalance, litresAdded }
      console.log("Tank balance updated successfully:", topupResponseData);

      // === Step 2: If balance update was successful, record the transaction ===
      if (
        topupResponseData &&
        typeof topupResponseData.litresAdded === "number"
      ) {
        const transactionResponse = await fetch("/api/transactions", {
          // Endpoint that records history
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            phoneNumber: phoneNumber,
            litersFilled: parseFloat(topupResponseData.litresAdded.toFixed(3)), // Use litresAdded from step 1
            pricePerLiter: petrolPrice,
            totalCost: parseFloat(topUpAmount.toFixed(2)),
          }),
        });

        if (!transactionResponse.ok) {
          // Log error but potentially proceed since balance was updated
          const errorData = await transactionResponse
            .json()
            .catch(() => ({ message: "Failed to record transaction." }));
          console.error(
            "Transaction recording failed (but balance updated):",
            transactionResponse.status,
            errorData
          );
          alert(
            `Warning: Top-up successful, but failed to record transaction history: ${
              errorData.message || transactionResponse.statusText
            }`
          );
        } else {
          const transactionResult = await transactionResponse.json();
          console.log("Transaction recorded successfully:", transactionResult);
        }
      } else {
        console.error(
          "Could not record transaction: Invalid data received from top-up step.",
          topupResponseData
        );
        alert(
          "Warning: Top-up successful, but could not record transaction history due to missing data."
        );
      }

      // --- Post-Success Actions (after both calls or if first succeeded) ---
      alert(`Top-up of $${topUpAmount.toFixed(2)} successful!`);
      if (
        topupResponseData &&
        typeof topupResponseData.newBalance === "number"
      ) {
        setTankBalance(topupResponseData.newBalance); // Update local state
      }
      setTopUpAmount(0);
      navigate("/sharetank");
      // ---------------------------------------------------------------------
    } catch (error) {
      console.error("Error during top-up process:", error);
      alert(
        "An network error occurred during the top-up process. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
    // --------------------------------------------------------
  };

  const handleAddCard = () => {
    navigate("/payment-details");
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

      {isLoading ? (
        <div className={styles.loadingPlaceholder}>Loading data...</div>
      ) : (
        <>
          <div className={styles.topUpContainer}>
            {/* Saved Card or Add Card Button */}
            <div className={styles.cardSection}>
              <h2 className={styles.sectionTitle}>Payment Method</h2>
              {savedCardData ? (
                <div className={styles.cardDetails}>
                  <span>•••• •••• •••• {savedCardData.last4}</span>
                  {savedCardData.brand.toLowerCase() === "visa" && (
                    <FaCcVisa size={30} className={styles.cardIcon} />
                  )}
                  {savedCardData.brand.toLowerCase() === "mastercard" && (
                    <FaCcMastercard size={30} className={styles.cardIcon} />
                  )}
                </div>
              ) : (
                <button
                  className={styles.addCardButton}
                  onClick={handleAddCard}
                >
                  <FaPlusCircle className={styles.addCardIcon} />
                  Add Payment Card
                </button>
              )}
            </div>

            {/* Amount Section */}
            <div className={styles.amountSection}>
              <h2 className={styles.sectionTitle}>Amount to top up</h2>
              <div className={styles.amountDisplay}>
                ${topUpAmount.toFixed(2)}
              </div>
              <input
                type="range"
                min="0"
                max={maxAmount}
                value={topUpAmount}
                onChange={handleSliderChange}
                className={styles.slider}
                step="0.01"
              />
            </div>
          </div>

          {/* Action Button */}
          <div className={styles.buttonContainer}>
            <button
              className={styles.topUpButton}
              onClick={handleTopUp}
              disabled={topUpAmount === 0 || !savedCardData}
            >
              Top up now
            </button>
          </div>
        </>
      )}

      <BottomNav />
    </div>
  );
};

export default TopUpPage;
