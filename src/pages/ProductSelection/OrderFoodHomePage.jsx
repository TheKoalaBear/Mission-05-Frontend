import React from "react";
// import StatusBar from "../../components/shared/StatusBar";
import Hero from "../../components/orderFoodHomePage/Hero";
import Content from "../../components/orderFoodHomePage/Content";
import BottomNav from "../../mcfolders/components/BottomNav";
import styles from "../../styles/Orderfoodhomepagecss/Orderfoodhomepage.module.css";

const Orderfoodhomepage = () => {
  return (
    <div className={styles.mobileFrame}>
      <div className={styles.container}>
        {/* <StatusBar /> */}
        <div className={styles.hero}>
          <div className={styles.textContainer}>
            <img
              className={styles.zLogo}
              src="src/assets/orderfoodhomepage_img/Z-logo.png"
              alt="Logo"
            />
            <h2 className={styles.headline}>
              "Your Coffee, Your Way – Ready When You Are!"
            </h2>
          </div>
        </div>
        <Content />
        <BottomNav />
      </div>
    </div>
  );
};

export default Orderfoodhomepage;
