import React from "react";
import styles from "../../styles/Shared/BottomNav.module.css";

const Bottomnav = () => {
      return (
            <nav className={styles.navbar}>
                  <div className={styles.navItem}>
                        <img src="src/assets/orderfoodhomepage_img/homeIcon.png" alt="Home" />
                        <span>Home</span>
                  </div>
                  <div className={styles.navItem}>
                        <img src="src/assets/orderfoodhomepage_img/qrCode2.png" alt="QR Code" />
                        <span>QR Code</span>
                  </div>
                  <div className={styles.navItem}>
                        <img src="src/assets/orderfoodhomepage_img/shareTank.png" alt="Share" />
                        <span>Share</span>
                  </div>
                  <div className={styles.navItem}>
                        <img src="src/assets/orderfoodhomepage_img/hamNav.png" alt="More" />
                        <span>More</span>
                  </div>
            </nav>
      );
};

export default Bottomnav;
