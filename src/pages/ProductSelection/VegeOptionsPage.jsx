import React from "react";
import Nav from "../../components/shared/Nav";
import Horizontalscroll from "../../components/shared/Horizontalscroll";
import Content from "../../components/shared/Content";
import BottomNav from "../../mcfolders/components/BottomNav";
import styles from "../../styles/Shared/ProductMobileFrame.module.css";

const Vegeoptions = () => {
      return (
            <div className={styles.mobileFrame}>
                  <div className={styles.container}>
                        <Nav />
                        <Horizontalscroll />
                        <Content category="Vegetarian" title="Vegetarian Food" />

                        <BottomNav />
                  </div>
            </div>
      );
};

export default Vegeoptions;
