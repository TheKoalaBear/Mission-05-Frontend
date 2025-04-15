import React, { useState, useEffect } from "react";
import {
  FaChevronRight,
  FaPlus,
  FaBell,
  FaInfoCircle,
  FaCreditCard,
  FaArrowLeft,
  FaHome,
  FaQrcode,
  FaBatteryThreeQuarters,
  FaBars,
  FaSignOutAlt,
} from "react-icons/fa";
import styles from "./ShareTank.module.css";
import { useNavigate } from "react-router-dom";
import { authService } from "../../services/authService";
import { tankService } from "../../services/tankService";
import BottomNav from "../../components/global/BottomNav";

const ShareTank = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [balance, setBalance] = useState(0);
  const [isLoadingBalance, setIsLoadingBalance] = useState(true);
  const [fuelPercentage, setFuelPercentage] = useState(0);

  useEffect(() => {
    const fetchUser = async () => {
      const userData = authService.getCurrentUser();
      setUser(userData);
    };
    fetchUser();
  }, []);

  useEffect(() => {
    const fetchBalance = async () => {
      if (!user?.id) {
        console.error("Cannot fetch balance without user ID");
        setIsLoadingBalance(false);
        return;
      }

      setIsLoadingBalance(true);
      try {
        const tankData = await tankService.getTankDetails(user.id);
        const fetchedBalance = tankData.balance;
        const maxCapacity = tankData.capacity;

        if (
          typeof fetchedBalance !== "number" ||
          typeof maxCapacity !== "number"
        ) {
          throw new Error("Invalid data received from API");
        }

        setBalance(fetchedBalance);
        setFuelPercentage(
          maxCapacity > 0 ? (fetchedBalance / maxCapacity) * 100 : 0
        );
      } catch (error) {
        console.error("Failed to fetch tank balance:", error);
        // Redirect to login if unauthorized or other error occurs
        if (error.response && error.response.status === 401) {
          navigate("/signup"); // Redirect to signup/login entry point
        }
        // Handle other errors as needed
      } finally {
        setIsLoadingBalance(false);
      }
    };

    if (user) {
      fetchBalance();
    } else {
      setIsLoadingBalance(false);
      setBalance(0);
      setFuelPercentage(0);
    }
  }, [user]);

  const handleLogout = async () => {
    await authService.logout();
    navigate("/signup"); // Redirect to signup/login entry point after logout
  };

  const navigateToHome = () => {
    navigate("/dashboard");
  };

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <button className={styles.backButton} onClick={() => navigate(-1)}>
          <FaArrowLeft />
        </button>
        <div className={styles.headerTitle}>
          <h1>{user?.firstName}'s Sharetank</h1>
        </div>
      </div>

      {/* Tank Status Card */}
      <div className={styles.tankCard}>
        <div className={styles.progressContainer}>
          <figure
            className={`${styles.chartTwo}`}
            style={{ "--percentage": fuelPercentage }}
          >
            <svg
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 200 200"
            >
              <title>Fuel Tank Level</title>
              <desc>Current fuel level in the share tank</desc>
              <circle className={styles.circleBackground} />
              <circle className={styles.circleForeground} />
            </svg>
            <div className={styles.progressValue}>
              {isLoadingBalance ? (
                <h2>Loading...</h2>
              ) : (
                <div className={styles.tankInfo}>
                  <h2 style={{ fontSize: "2rem", color: "#ff9933" }}>
                    {Math.floor(balance)} L
                  </h2>
                  <p style={{ color: "#ff9933" }}>max. 225 L</p>
                </div>
              )}
            </div>
          </figure>
          <div className={styles.actionButtons}>
            <span style={{ fontSize: "3rem", fontWeight: "bold" }}>
              {fuelPercentage.toFixed(0)}%
            </span>
            <button
              onClick={() => navigate("/top-up")}
              className={styles.topUpButton}
            >
              Top up now
            </button>
            <button className={styles.useButton}>Use fuel</button>
          </div>
        </div>
      </div>

      {/* Members Section */}
      <div className={styles.membersSection}>
        <h3 style={{ justifyContent: "flex-start", margin: 0 }}>
          Shared with 2 members
        </h3>
        <p className={styles.subtitle}>Share your tank with 5 others</p>
        <div className={styles.membersList}>
          <div className={styles.memberAvatar}>
            <img src="https://i.pravatar.cc/40?img=1" alt="Member 1" />
          </div>
          <div className={styles.memberAvatar}>
            <img src="https://i.pravatar.cc/40?img=2" alt="Member 2" />
          </div>
          <button className={styles.addMemberButton}>
            <FaPlus />
          </button>
        </div>
        <button
          onClick={() => navigate("/tank-activity")}
          className={styles.activityButton}
        >
          See tank activity
        </button>
      </div>

      {/* Action List */}
      <div className={styles.actionList}>
        <div
          className={styles.actionItem}
          onClick={() => navigate("/notifications")}
        >
          <div className={styles.actionIcon}>
            <FaBell />
          </div>
          <div className={styles.actionText}>
            <h4>Notify me</h4>
            <p>Get notified when tank is low or prices drop</p>
          </div>
          <FaChevronRight className={styles.chevron} />
        </div>

        <div
          className={styles.actionItem}
          onClick={() => navigate("/how-it-works")}
        >
          <div className={styles.actionIcon}>
            <FaInfoCircle />
          </div>
          <div className={styles.actionText}>
            <h4>How it works</h4>
            <p>Learn about Sharetank features & benefits</p>
          </div>
          <FaChevronRight className={styles.chevron} />
        </div>

        <div
          className={styles.actionItem}
          onClick={() => navigate("/payment-details")}
        >
          <div className={styles.actionIcon}>
            <FaCreditCard />
          </div>
          <div className={styles.actionText}>
            <h4>Pay by plate</h4>
            <p>Set up or manage your payment method</p>
          </div>
          <FaChevronRight className={styles.chevron} />
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default ShareTank;
