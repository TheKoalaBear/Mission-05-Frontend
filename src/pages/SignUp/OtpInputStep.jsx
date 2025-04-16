import React, { useRef, useEffect } from "react";
import styles from "./Signup.module.css";

const OtpInputStep = ({
  otp,
  onOtpChange,
  onOtpKeyDown,
  onSubmit,
  isLoading,
  error,
  onResend,
}) => {
  const otpInputs = useRef([]);

  // Focus first input on mount
  useEffect(() => {
    if (otpInputs.current[0]) {
      otpInputs.current[0].focus();
    }
  }, []);

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <div className={styles.headerImageContainer}>
        <div className={styles.bowContainer2}>
          <div className={styles.blueBow}></div>
          <div className={styles.yellowBow}></div>
          <div className={styles.whiteBow}></div>
        </div>
      </div>
      <div className={styles.formContent}>
        <div className={styles.inputGroup}>
          <label htmlFor="otp-0">Confirmation Code</label>
          <div className={styles.otpInputContainer}>
            {otp.map((digit, index) => (
              <input
                key={index}
                id={`otp-${index}`}
                ref={(el) => (otpInputs.current[index] = el)}
                type="text"
                inputMode="numeric"
                maxLength="1"
                value={digit}
                onChange={(e) => onOtpChange(e, index, otpInputs)} // Pass refs if needed for focus logic
                onKeyDown={(e) => onOtpKeyDown(e, index, otpInputs)} // Pass refs if needed
                required
                className={styles.otpInput}
                autoComplete="off"
              />
            ))}
          </div>
        </div>
        {error && <div className={styles.error}>{error}</div>}
        <button
          type="submit"
          className={styles.button}
          disabled={isLoading || otp.join("").length !== 6}
        >
          Verify & Login
        </button>
        <button
          type="button"
          className={styles.linkButton}
          onClick={onResend} // Add a handler for resend
        >
          Resend Code
        </button>
      </div>
    </form>
  );
};

export default OtpInputStep;
