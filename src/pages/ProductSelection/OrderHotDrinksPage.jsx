import React from "react";
// import StatusBar from "../../components/shared/StatusBar";
import Nav from "../../components/shared/Nav";
import Horizontalscroll from "../../components/shared/Horizontalscroll";
import Content from "../../components/shared/Content";
import BottomNav from "../../mcfolders/components/BottomNav";
import styles from "../../styles/Shared/ProductMobileFrame.module.css";

const Orderhotdrinks = () => {
      return (
            <div className={styles.mobileFrame}>
                  <div className={styles.container}>
                        {/* <StatusBar /> */}
                        <Nav />
                        <Horizontalscroll />
                        <Content category="Hot Drink" title="Hot Drink" />

                        <BottomNav />
                  </div>
            </div>
      );
};

export default Orderhotdrinks;
