import React from "react";
import HeaderNav from "../../../components/shared/HeaderNav";
import Horizontalscroll from "../../../components/shared/Horizontalscroll";
import Content from "../../../components/shared/Content";
import BottomNav from "../../../components/global/BottomNav";
import styles from "../../../styles/shared/ProductMobileFrame.module.css";

const Ordercolddrinks = () => {
      return (
            <div className={styles.mobileFrame}>
                  <div className={styles.container}>
                        <HeaderNav />
                        <Horizontalscroll />
                        <Content category="Cold Drink" title="Cold Drink" />

                        <BottomNav />
                  </div>
            </div>
      );
};

export default Ordercolddrinks;
