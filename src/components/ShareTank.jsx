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
import { authService } from "../services/authService";
import BottomNav from "./BottomNav";

const ShareTank = () => {
  const navigate = useNavigate();
  const [showMoreMenu, setShowMoreMenu] = React.useState(false);
  const [user, setUser] = useState(null);
  const [fuelPercentage, setFuelPercentage] = useState(30);

  useEffect(() => {
    const fetchUser = async () => {
      const userData = authService.getCurrentUser();
      setUser(userData);
    };
    fetchUser();
  }, []);

  const handleLogout = () => {
    authService.logout();
    navigate("/login");
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
              <h2>$115</h2>
              <span>{fuelPercentage}%</span>
            </div>
          </figure>
          <div className={styles.actionButtons}>
            <button className={styles.topUpButton}>Top up now</button>
            <button className={styles.useButton}>Use fuel</button>
          </div>
        </div>
      </div>

      {/* Members Section */}
      <div className={styles.membersSection}>
        <h3>Shared with 2 members</h3>
        <p className={styles.subtitle}>Everyone can use fuel from this tank</p>
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
        <button className={styles.activityButton}>See tank activity</button>
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
