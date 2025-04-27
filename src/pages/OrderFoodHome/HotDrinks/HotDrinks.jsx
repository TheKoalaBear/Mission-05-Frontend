import React from "react";
import HeaderNav from "../../../components/shared/HeaderNav";
import Horizontalscroll from "../../../components/shared/HorizontalScroll";
import Content from "../../../components/shared/Content";
import BottomNav from "../../../components/global/BottomNav";
import styles from "../../../styles/shared/ProductMobileFrame.module.css";

const Orderhotdrinks = () => {
      return (
            <div className={styles.mobileFrame}>
                  <div className={styles.container}>
                        <HeaderNav />
                        <Horizontalscroll />
                        <Content category="Hot Drink" title="Hot Drink" />

                        <BottomNav />
                  </div>
            </div>
      );
};

export default Orderhotdrinks;
