import React from "react";
// import StatusBar from "../../components/shared/StatusBar";
import Nav from "../../components/shared/Nav";
import Horizontalscroll from "../../components/shared/Horizontalscroll";
import Content from "../../components/shared/Content";
import BottomNav from "../../components/global/BottomNav";
import styles from "../../styles/Orderhotdrinkscss/OrderHotDrinks.module.css";

const Ordercolddrinks = () => {
  return (
    <div className={styles.mobileFrame}>
      <div className={styles.container}>
        {/* <StatusBar /> */}
        <Nav />
        <Horizontalscroll />
        <Content category="Cold Drink" title="Cold Drink" />

        <BottomNav />
      </div>
    </div>
  );
};

export default Ordercolddrinks;
