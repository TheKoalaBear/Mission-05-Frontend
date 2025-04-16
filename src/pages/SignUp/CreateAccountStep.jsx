import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import styles from "./Signup.module.css";

const CreateAccountStep = ({
  formData,
  onChange,
  onSubmit,
  onBack,
  isLoading,
  error,
}) => {
  return (
    <div className={styles.formContainer}>
      <div className={styles.stepHeader}>
        <button onClick={onBack} className={styles.backButton}>
          <FaArrowLeft />
        </button>
        <h2 className={styles.stepTitle}>Create account</h2>
      </div>
      <div className={styles.bowContainer2}>
        <div className={styles.blueBow}></div>
        <div className={styles.yellowBow}></div>
        <div className={styles.whiteBow}></div>
      </div>
      <form className={styles.form} onSubmit={onSubmit}>
        <div className={styles.formContent}>
          <div className={styles.inputGroup}>
            <label htmlFor="firstName">First name</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={onChange}
              placeholder="Please enter your first name"
              required
              className={styles.inputField}
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="lastName">Last name</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={onChange}
              placeholder="Please enter your last name"
              required
              className={styles.inputField}
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="email">E-mail</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={onChange}
              placeholder="Please enter your email address"
              required
              className={styles.inputField}
            />
          </div>
          {error && <div className={styles.error}>{error}</div>}
          <button type="submit" className={styles.button} disabled={isLoading}>
            {isLoading ? "Creating..." : "Create account"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateAccountStep;
