import React from "react";
import styles from "../../styles/Orderfoodhomepagecss/Hero.module.css";

const Hero = () => {
      return (
            <div className={styles.hero}>
                  <div className={styles.imageContainer}>
                        <img
                              className={styles.coffeeHero}
                              src="src/assets/orderfoodhomepage_img/image1.png"
                              alt="Hero"
                        />
                  </div>
                  <div className={styles.textContainer}>
                        <img className={styles.zLogo} src="src/assets/orderfoodhomepage_img/Z-logo.png" alt="Logo" />
                        <h2 className={styles.headline}>"Your Coffee, Your Way – Ready When You Are!"</h2>
                  </div>
            </div>
      );
};

export default Hero;
