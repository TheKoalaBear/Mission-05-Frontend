import React from "react";
import HeaderNav from "../../components/shared/HeaderNav";
import Horizontalscroll from "../../components/shared/Horizontalscroll";
import Content from "../../components/shared/Content";
import BottomNav from "../../mcfolders/components/BottomNav";
import styles from "../../styles/Shared/ProductMobileFrame.module.css";

function Makecombo() {
      return (
            <div>
                  <div className={styles.mobileFrame}>
                        <div className={styles.container}>
                              <HeaderNav />
                              <Horizontalscroll />
                              <Content category="Make Combo" title="Make Combo" />

                              <BottomNav />
                        </div>
                  </div>
            </div>
      );
}

export default Makecombo;
