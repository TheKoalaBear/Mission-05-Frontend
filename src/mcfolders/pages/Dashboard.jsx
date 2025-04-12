import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import {
  FaHome,
  FaQrcode,
  FaBatteryThreeQuarters,
  FaBars,
  FaSignOutAlt,
} from "react-icons/fa";
import styles from "../css/Dashboard.module.css";
import { authService } from "../../services/authService";
import BottomNav from "../../mcfolders/components/BottomNav";

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showMoreMenu, setShowMoreMenu] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const authenticated = authService.isAuthenticated();
      setIsAuthenticated(authenticated);

      if (authenticated) {
        try {
          const userData = await authService.getUserDetails();
          setUser(userData);
        } catch (error) {
          console.error("Error fetching user details:", error);
        }
      }

      setIsLoading(false);
    };

    checkAuth();
  }, []);

  const handleLogout = () => {
    authService.logout();
    navigate("/signup");
  };

  const navigateToShareTank = () => {
    navigate("/sharetank");
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/signup" replace />;
  }

  return (
    <div className={styles.dashboard}>
      {/* Header Section */}
      <div className={styles.header}>
        <div className={styles.greeting}>
          <h1>Kia ora {user?.firstName || "Guest"},</h1>
          <div className={styles.sharetankInfo}>
            <span>{user?.firstName}'s Sharetank</span>
            <p>
              Maximize Your Fuel,
              <br />
              Amplify Your Sharing
            </p>
          </div>
          <button className={styles.viewTankBtn} onClick={navigateToShareTank}>
            View my tank
          </button>
        </div>
      </div>

      {/* Cards Grid */}
      <div className={styles.cardsGrid}>
        <div className={styles.card}>
          <span className={styles.cardContent}>
            Fuel Price
            <br />
            Comparison
          </span>
        </div>
        <div className={styles.card}>
          <span className={styles.cardContent}>Z</span>
        </div>
        <div className={styles.card} onClick={() => navigate("/orderfood")}>
          <span className={styles.cardContent}>Order Food</span>
        </div>
        <div className={styles.card}>
          <span className={styles.cardContent}>Near me</span>
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default Dashboard;
