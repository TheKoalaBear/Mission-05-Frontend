import React from "react";
import Nav from "../../components/shared/Nav";
import Horizontalscroll from "../../components/shared/Horizontalscroll";
import Content from "../../components/shared/Content";
import BottomNav from "../../mcfolders/components/BottomNav";
import styles from "../../styles/Shared/ProductMobileFrame.module.css";

const Grabfood = () => {
      return (
            <div className={styles.mobileFrame}>
                  <div className={styles.container}>
                        <Nav />
                        <Horizontalscroll />
                        <Content category="Savoury" title="Food" />

                        <BottomNav />
                  </div>
            </div>
      );
};

export default Grabfood;
