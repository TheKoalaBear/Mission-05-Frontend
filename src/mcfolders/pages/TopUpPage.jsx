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

    // --- Fetch Card Summary from Backend ---
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
            // Optional: Handle unauthorized access, e.g., clear token, redirect to login
            // localStorage.removeItem("token");
            // navigate('/login');
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
    // ---------------------------------------

    // --- Fetch Tank Balance from Backend API --- (MODIFIED)
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
    // -------------------------------------------

    // Run fetches concurrently and update state when both complete
    Promise.all([fetchCardSummary(), fetchTankBalance()]) // Both are now async
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

    // No cleanup needed for fetch, but keep if other async ops added
  }, [navigate]); // Added navigate as a dependency because it *might* be used in error handling

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

    console.log(
      `Attempting to top up ${topUpAmount.toFixed(2)} using card ending in ${
        savedCardData.last4
      }`
    );

    // --- Perform Top-up API Call ---
    setIsLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("Authentication error. Please log in again.");
        setIsLoading(false);
        return;
      }

      const response = await fetch("/api/tanks/topup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          amount: parseFloat(topUpAmount.toFixed(2)),
        }),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Top-up successful:", result);
        if (typeof result.newBalance === "number") {
          setTankBalance(result.newBalance);
          console.log(
            `Top-up successful! New balance: ${result.newBalance.toFixed(
              2
            )} Litres`
          );
          setTopUpAmount(0);
          navigate("/sharetank");
        } else {
          console.error("Backend response missing newBalance:", result);
          console.error(
            "Top-up processed, but failed to update balance display."
          );
          navigate("/sharetank");
        }
      } else {
        const errorData = await response
          .json()
          .catch(() => ({ message: "An unknown error occurred." }));
        console.error("Top-up failed:", response.status, errorData);
        console.error(
          `Top-up failed: ${errorData.message || response.statusText}`
        );
      }
    } catch (error) {
      console.error("Error during top-up API call:", error);
      console.error(
        "An network error occurred during top-up. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
    // --------------------------------
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
