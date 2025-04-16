import React from "react";
import { useNavigate } from "react-router-dom";
import Content from "./Components/HomePageContent";
import BottomNav from "../../components/global/BottomNav";
import styles from "./OrderFoodHome.module.css";

const OrderFoodHomePage = () => {
      const navigate = useNavigate();
      return (
            <div className={styles.mobileFrame}>
                  <div className={styles.container}>
                        <div className={styles.hero}>
                              <img
                                    className={styles.leftArrow}
                                    onClick={() => navigate("/dashboard")}
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

export default OrderFoodHomePage;
