import React from "react";
import HeaderNav from "../../../components/shared/HeaderNav";
import Horizontalscroll from "../../../components/shared/HorizontalScroll";
import Content from "../../../components/shared/Content";
import BottomNav from "../../../components/global/BottomNav";
import styles from "../../../styles/shared/ProductMobileFrame.module.css";

const Grabfood = () => {
      return (
            <div className={styles.mobileFrame}>
                  <div className={styles.container}>
                        <HeaderNav />
                        <Horizontalscroll />
                        <Content category="Savoury" title="Food" />

                        <BottomNav />
                  </div>
            </div>
      );
};

export default Grabfood;
