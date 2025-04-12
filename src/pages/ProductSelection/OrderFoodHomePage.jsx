import React from "react";
// import StatusBar from "../../components/shared/StatusBar";
import Hero from "../../components/orderFoodHomePage/Hero";
import Content from "../../components/orderFoodHomePage/Content";
import BottomNav from "../../components/shared/BottomNav";
import styles from "../../styles/Orderfoodhomepagecss/Orderfoodhomepage.module.css";

const Orderfoodhomepage = () => {
      return (
            <div className={styles.mobileFrame}>
                  <div className={styles.container}>
                        {/* <StatusBar /> */}
                        <Hero />
                        <Content />
                        <BottomNav />
                  </div>
            </div>
      );
};

export default Orderfoodhomepage;
