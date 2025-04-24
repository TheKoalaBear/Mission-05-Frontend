import React, { useCallback, useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  FaHome,
  FaQrcode,
  FaGasPump,
  FaBars,
  FaSignOutAlt,
  FaUser,
  FaBell,
  FaStar,
  FaHistory,
  FaBolt,
  FaTicketAlt,
  FaUserPlus,
  FaMapMarkedAlt,
  FaGavel,
  FaCommentAlt,
  FaHeadset,
} from "react-icons/fa";
import styles from "./BottomNav.module.css";
import { authService } from "../../services/authService";

const BottomNav = ({ style }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showMoreMenu, setShowMoreMenu] = useState(false);

  const isActive = useCallback(
    (path) => {
      return location.pathname === path;
    },
    [location.pathname]
  );

  const handleLogout = async () => {
    try {
      await authService.logout();
      navigate("/signup"); // Redirect to signup after logout
    } catch (error) {
      console.error("Logout failed:", error);
      // Optionally show an error message to the user
    }
  };

  const toggleMoreMenu = (e) => {
    e.stopPropagation();
    setShowMoreMenu(!showMoreMenu);
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      if (showMoreMenu) {
        setShowMoreMenu(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [showMoreMenu]);

  return (
    <nav className={styles.bottomNav} style={style}>
      <Link to="/" className={isActive("/") ? styles.navItemActive : styles.navItem}>
        <FaHome className={styles.navIcon} />
        <span className={styles.navLabel}>Home</span>
      </Link>
      <Link to="/qr-code" className={isActive("/qr-code") ? styles.navItemActive : styles.navItem}>
        <FaQrcode className={styles.navIcon} />
        <span className={styles.navLabel}>QR code</span>
      </Link>
      <Link
        to="/sharetank"
        className={isActive("/sharetank") ? styles.navItemActive : styles.navItem}
      >
        <FaGasPump className={styles.navIcon} />
        <span className={styles.navLabel}>Share Tank</span>
      </Link>
      <button className={styles.navItem} onClick={toggleMoreMenu}>
        <FaBars className={styles.navIcon} />
        <span className={styles.navLabel}>More</span>
      </button>
      {showMoreMenu && (
        <div className={styles.moreMenu} onClick={(e) => e.stopPropagation()}>
          <div className={styles.menuSection}>
            <h3 className={styles.menuTitle}>My account</h3>
            <Link to="/personal-info" className={styles.menuItem}>
              <FaUser className={styles.menuIcon} />
              <span>Personal information</span>
            </Link>
            <Link to="/notifications" className={styles.menuItem}>
              <FaBell className={styles.menuIcon} />
              <span>Notification settings</span>
            </Link>
            <Link to="/loyalty" className={styles.menuItem}>
              <FaStar className={styles.menuIcon} />
              <span>Loyalty card</span>
            </Link>
            <Link to="/activity" className={styles.menuItem}>
              <FaHistory className={styles.menuIcon} />
              <span>Recent activity</span>
            </Link>
            <Link to="/ev-tag" className={styles.menuItem}>
              <FaBolt className={styles.menuIcon} />
              <span>EV charge tag</span>
            </Link>
          </div>

          <div className={styles.menuSection}>
            <h3 className={styles.menuTitle}>Promotions</h3>
            <Link to="/vouchers" className={styles.menuItem}>
              <FaTicketAlt className={styles.menuIcon} />
              <span>My vouchers</span>
            </Link>
            <Link to="/invite" className={styles.menuItem}>
              <FaUserPlus className={styles.menuIcon} />
              <span>Invite friends</span>
            </Link>
          </div>

          <div className={styles.menuSection}>
            <h3 className={styles.menuTitle}>Help & Support</h3>
            <Link to="/find-z" className={styles.menuItem}>
              <FaMapMarkedAlt className={styles.menuIcon} />
              <span>Find a Z</span>
            </Link>
            <Link to="/legal" className={styles.menuItem}>
              <FaGavel className={styles.menuIcon} />
              <span>Legal</span>
            </Link>
            <Link to="/feedback" className={styles.menuItem}>
              <FaCommentAlt className={styles.menuIcon} />
              <span>Give Feedback</span>
            </Link>
            <Link to="/contact" className={styles.menuItem}>
              <FaHeadset className={styles.menuIcon} />
              <span>Contact us</span>
            </Link>
          </div>

          <button className={styles.logoutButton} onClick={handleLogout}>
            <FaSignOutAlt className={styles.menuIcon} />
            <span>Logout</span>
          </button>
        </div>
      )}
    </nav>
  );
};

export default BottomNav;
