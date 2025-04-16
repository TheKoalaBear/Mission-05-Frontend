import React from "react";
import styles from "./Signup.module.css"; // Assuming shared styles for now
import ZEnergyLogo from "../../assets/orderfoodhomepage_img/Z_Energy_logo.png"; // Verify path

const MobileInputStep = ({
  phoneNumber,
  onChange,
  onSubmit,
  isLoading,
  error,
}) => {
  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <div className={styles.headerImageContainer}>
        <img src={ZEnergyLogo} alt="Z Energy Logo" className={styles.logo} />
      </div>
      <div className={styles.bowContainer}>
        <div className={styles.blueBow}></div>
        <div className={styles.yellowBow}></div>
        <div className={styles.whiteBow}></div>
      </div>
      <div className={styles.formContent}>
        <div className={styles.inputGroup}>
          <label htmlFor="phoneNumber">Mobile number</label>
          <input
            type="tel"
            id="phoneNumber"
            name="phoneNumber" // Keep name for the main handleChange
            value={phoneNumber}
            onChange={onChange} // Use the passed onChange handler
            placeholder="+64"
            required
            className={styles.inputField}
            disabled={isLoading}
          />
          <small className={styles.hint}>
            We will text you to confirm your number
          </small>
        </div>
        {error && <div className={styles.error}>{error}</div>}
        <button type="submit" className={styles.button} disabled={isLoading}>
          Confirm
        </button>
        <div className={styles.troubleLink}>
          Having Trouble?{" "}
          <span className={styles.linkOptions}>More Options here</span>
        </div>
      </div>
    </form>
  );
};

export default MobileInputStep;
