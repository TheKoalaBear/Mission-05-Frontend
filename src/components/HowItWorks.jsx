import React from "react";
import { useNavigate } from "react-router-dom";
import {
  FaArrowLeft,
  FaMapMarkerAlt,
  FaUsers,
  FaMobile,
  FaCar,
  FaQrcode,
  FaMapPin,
  FaShareAlt,
  FaGasPump,
  FaCookieBite,
} from "react-icons/fa";
import styles from "./HowItWorks.module.css";
import BottomNav from "./BottomNav";
const HowItWorks = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <button className={styles.backButton} onClick={() => navigate(-1)}>
          <FaArrowLeft />
        </button>
        <h1 className={styles.title}>
          <FaCar className={styles.titleIcon} />
          How it works
        </h1>
      </div>

      {/* Features Section */}
      <div className={styles.featuresContainer}>
        <div className={styles.featureCard}>
          <h2>Buy fuel now, use it later</h2>
          <p>
            Lock the lowest pump price within 30km of your location and buy it
            to use later!
          </p>
          <div className={styles.illustration}>
            <FaMapPin className={styles.illustrationIcon} />
          </div>
        </div>

        <div className={styles.featureCard}>
          <h2>Share it with others</h2>
          <p>
            Your free to share the fuel in your Sharetank with up to 4 others,
            or keep it just for you.
          </p>
          <div className={styles.illustration}>
            <FaShareAlt className={styles.illustrationIcon} />
          </div>
        </div>
        <div className={styles.featureCard}>
          <h2>Use it at any Z station</h2>
          <p>
            Reedem your fuel at any of the Z stations across New Zealand using Z
            app
          </p>
          <div className={styles.illustration}>
            <FaGasPump className={styles.illustrationIcon} />
          </div>
        </div>
        <div className={styles.featureCard}>
          <h2>Earn Airpoints Dollars</h2>
          <p>On Sharetank top-ups</p>
          <div className={styles.illustration}>
            <FaCookieBite className={styles.illustrationIcon} />
          </div>
        </div>
      </div>

      {/* Ways to Use Section */}
      <div className={styles.waysContainer}>
        <h2 className={styles.waysTitle}>Way to use fuel</h2>

        <div className={styles.waysList}>
          <div className={styles.wayItem}>
            <div className={styles.wayNumber}>1</div>
            <div className={styles.wayContent}>
              <h3>Pay in app</h3>
              <p>
                Drive in, open your app, select your pump number and use your
                Sharetank litres as payment
              </p>
            </div>
          </div>

          <div className={styles.wayItem}>
            <div className={styles.wayNumber}>2</div>
            <div className={styles.wayContent}>
              <h3>Pay by plate</h3>
              <p>
                Register your vehicle and we'll automatically prepare the pump
                for you when you arrive. Simply pull in, fuel up, and go!
              </p>
              <a href="#" className={styles.learnMore}>
                Learn more
              </a>
            </div>
          </div>

          <div className={styles.wayItem}>
            <div className={styles.wayNumber}>3</div>
            <div className={styles.wayContent}>
              <h3>In store or at the pump</h3>
              <p>
                Use the litres by scanning your QR code when paying inside the
                store or before fueling at the pump
              </p>
              <button className={styles.scanQRButton}>Scan QR code</button>
            </div>
          </div>
        </div>
      </div>
      <BottomNav />
    </div>
  );
};

export default HowItWorks;
