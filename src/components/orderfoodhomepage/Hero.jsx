import React from "react";
import styles from "../../pages/Orderfoodhomepage/Orderfoodhomepage.module.css";

const Hero = () => {
      return (
            <div className={styles.hero}>
                  <div className={styles.imageContainer}>
                        <img
                              src="src/assets/orderfoodhomepage_img/image1.png"
                              className={styles.coffeeHero}
                              alt="Hero"
                        />
                        <img
                              src="src/assets/orderfoodhomepage_img/leftarrow.png"
                              className={styles.leftArrow}
                              alt="Back"
                        />
                  </div>
                  <div className={styles.textContainer}>
                        <img src="src/assets/orderfoodhomepage_img/Z-logo.png" className={styles.zLogo} alt="Logo" />
                        <h2 className={styles.headline}>"Your Coffee, Your Way – Ready When You Are!"</h2>
                  </div>
            </div>
      );
};

export default Hero;
