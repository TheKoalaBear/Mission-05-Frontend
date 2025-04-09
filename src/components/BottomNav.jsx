import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FaHome, FaQrcode, FaGasPump, FaBars } from "react-icons/fa";
import styles from "./BottomNav.module.css";

const BottomNav = () => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className={styles.bottomNav}>
      <Link
        to="/"
        className={isActive("/") ? styles.navItemActive : styles.navItem}
      >
        <FaHome className={styles.navIcon} />
        <span className={styles.navLabel}>Home</span>
      </Link>
      <Link
        to="/qr-code"
        className={isActive("/qr-code") ? styles.navItemActive : styles.navItem}
      >
        <FaQrcode className={styles.navIcon} />
        <span className={styles.navLabel}>QR code</span>
      </Link>
      <Link
        to="/sharetank"
        className={
          isActive("/sharetank") ? styles.navItemActive : styles.navItem
        }
      >
        <FaGasPump className={styles.navIcon} />
        <span className={styles.navLabel}>Share Tank</span>
      </Link>
      <Link
        to="/more"
        className={isActive("/more") ? styles.navItemActive : styles.navItem}
      >
        <FaBars className={styles.navIcon} />
        <span className={styles.navLabel}>More</span>
      </Link>
    </nav>
  );
};

export default BottomNav;
