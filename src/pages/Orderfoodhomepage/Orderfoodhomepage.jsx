import React from "react";
import StatusBar from "../../components/orderfoodhomepage/Statusbar";
import Hero from "../../components/orderfoodhomepage/Hero";
import Content from "../../components/orderfoodhomepage/Content";
import BottomNav from "../../components/orderfoodhomepage/Bottomnav";
import styles from "../../styles/Orderfoodhomepagecss/Orderfoodhomepage.module.css";

const Orderfoodhomepage = () => {
      return (
            <div className={styles.mobileFrame}>
                  <div className={styles.container}>
                        <StatusBar />
                        <Hero />
                        <Content />
                        <BottomNav />
                  </div>
            </div>
      );
};

export default Orderfoodhomepage;
