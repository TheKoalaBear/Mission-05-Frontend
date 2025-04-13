import React from "react";
import styles from "../../styles/Shared/Nav.module.css";

const Nav = () => {
      return (
            <nav className={styles.nav}>
                  <button className={styles.button}></button>
                  <div className={styles.logoContainer}>
                        <div className={styles.logo}>
                              <img src="\src\assets\hotdrinkspage_img\zbroadwaylogo.PNG"></img>
                        </div>
                        <span className={styles.logoText}>Z Broadway</span>
                  </div>
                  <button className={styles.button}></button>
            </nav>
      );
};

export default Nav;
