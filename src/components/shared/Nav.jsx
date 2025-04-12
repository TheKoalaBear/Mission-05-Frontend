import React from "react";
import styles from "../../styles/Shared/Nav.module.css"; // Import the CSS module

const Nav = () => {
      return (
            <nav className={styles.nav}>
                  <button className={styles.button}>
                        {/* Replace with your left arrow icon */}
                        <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                        >
                              <path d="M19 12H6M12 5l-7 7 7 7" />
                        </svg>
                  </button>
                  <div className={styles.logoContainer}>
                        <div className={styles.logo}>
                              <img src="\src\assets\hotdrinkspage_img\zbroadwaylogo.PNG"></img>
                        </div>
                        <span className={styles.logoText}>Z Broadway</span>
                  </div>
                  <button className={styles.button}>
                        {/* Replace with your shopping cart icon */}
                        <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                        >
                              <circle cx="9" cy="21" r="1"></circle>
                              <circle cx="20" cy="21" r="1"></circle>
                              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                        </svg>
                  </button>
            </nav>
      );
};

export default Nav;
