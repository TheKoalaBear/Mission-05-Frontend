import React from "react";
import styles from "./Signup.module.css";

const PermissionStep = ({ type, onAllow, onDeny }) => {
  const title = type === "notification" ? "Notifications" : "Location";
  const description =
    type === "notification"
      ? "Notifications may include alerts, sounds, and icon badges. These can be configured in Settings."
      : "Allow this application to access your device's Location. These can be configured in Settings.";

  return (
    <div className={styles.permissionContainer}>
      <div className={styles.headerImageContainer}>
        {/* Maybe add logo or relevant icon here */}
        <div className={styles.bowContainer2}>
          <div className={styles.blueBow}></div>
          <div className={styles.yellowBow}></div>
          <div className={styles.whiteBow}></div>
        </div>
      </div>
      <div className={styles.permissionContent}>
        {/* <h3>{title}</h3>  Optional Title */}
        <p style={{ paddingLeft: "2.5rem", paddingRight: "2.5rem" }}>
          {description}
        </p>
        <div className={styles.permissionButtons}>
          <button onClick={onDeny} className={styles.permissionButtonDeny}>
            Don't Allow
          </button>
          <button onClick={onAllow} className={styles.permissionButtonAllow}>
            Allow
          </button>
        </div>
      </div>
    </div>
  );
};

export default PermissionStep;
