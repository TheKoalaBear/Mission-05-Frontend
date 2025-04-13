import React from "react";
import Content from "../../components/shared/HomePageContent";
import BottomNav from "../../mcfolders/components/BottomNav";
import styles from "../../styles/Orderfoodhomepagecss/Orderfoodhomepage.module.css";

const Orderfoodhomepage = () => {
      return (
            <div className={styles.mobileFrame}>
                  <div className={styles.container}>
                        <div className={styles.hero}>
                              <img
                                    className={styles.leftArrow}
                                    src="src/assets/orderfoodhomepage_img/leftarrow.png"
                                    alt="Arrow"
                              />
                              <div className={styles.textContainer}>
                                    <img
                                          className={styles.zLogo}
                                          src="src/assets/orderfoodhomepage_img/Z-logo.png"
                                          alt="Logo"
                                    />

                                    <h2 className={styles.headline}>"Your Coffee, Your Way – Ready When You Are!"</h2>
                              </div>
                        </div>
                        <Content />
                        <BottomNav />
                  </div>
            </div>
      );
};

export default Orderfoodhomepage;
