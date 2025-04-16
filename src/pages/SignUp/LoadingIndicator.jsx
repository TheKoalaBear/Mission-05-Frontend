import React from "react";
import styles from "./Signup.module.css";
import ZEnergyLogo from "../../assets/orderfoodhomepage_img/Z_Energy_logo.png"; // Verify path

const LoadingIndicator = ({ message = "Please wait..." }) => (
  <div className={styles.loadingContainer}>
    <img src={ZEnergyLogo} alt="Z Energy Logo" className={styles.logoLoading} />
    <span className={styles.loader}></span>
    <p>{message}</p>
  </div>
);

export default LoadingIndicator;
