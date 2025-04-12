import React from "react";
import { Link } from "react-router-dom";
import styles from "../../styles/Orderfoodhomepagecss/Content.module.css";

const Content = () => {
      return (
            <>
                  <p className={styles.description}>
                        "Fuel up on the go with locally sourced pies, veggie options, and your favorite coffee – all
                        just a tap away."
                  </p>

                  <div className={styles.grid}>
                        <Link to="/orderhotdrinks" className={styles.card}>
                              <img
                                    src="src/assets/orderfoodhomepage_img/hotdrink.png"
                                    alt="Hot Drinks"
                                    className={styles.cardImageLeft}
                              />
                              <span>Order Hot Drinks</span>
                        </Link>

                        <Link to="/ordercolddrinks" className={styles.card}>
                              <img
                                    src="src/assets/orderfoodhomepage_img/coldDrink.png"
                                    alt="Cold Drinks"
                                    className={styles.cardImageLeft}
                              />
                              <span>Order Cold Drinks</span>
                        </Link>

                        {/* Do the same for other cards */}
                        <Link to="/grabfood" className={styles.card}>
                              <img
                                    src="src/assets/orderfoodhomepage_img/hotFood.png"
                                    alt="Food"
                                    className={styles.cardImageLeft}
                              />
                              <span>Grab some food</span>
                        </Link>

                        <Link to="/vegeoptions" className={styles.card}>
                              <img
                                    src="src/assets/orderfoodhomepage_img/vegeOption.png"
                                    alt="Veggie Options"
                                    className={styles.cardImageLeft}
                              />
                              <span>Vege options</span>
                        </Link>

                        <Link to="/makecombo" className={styles.cardLarge}>
                              <span>Make it a COMBO</span>
                              <img
                                    src="src/assets/orderfoodhomepage_img/combo.png"
                                    alt="Combo"
                                    className={styles.cardImageRight}
                              />
                        </Link>
                  </div>
            </>
      );
};

export default Content;
