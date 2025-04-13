import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "../../styles/Shared/Nav.module.css";
// import { FaShoppingCart } from "react-icons/fa";
import { LuShoppingCart } from "react-icons/lu";
import { AiOutlineArrowLeft } from "react-icons/ai";

const Nav = () => {
      const navigate = useNavigate();
      return (
            <nav className={styles.nav}>
                  <div
                        className={styles.arrowButton}
                        onClick={() => navigate("/orderfood")}
                        style={{ cursor: "pointer" }}
                  >
                        <AiOutlineArrowLeft size={27} color="black" />
                  </div>

                  <div className={styles.logoContainer}>
                        <div className={styles.logo}>
                              <img src="/src/assets/hotdrinkspage_img/zbroadwaylogo.PNG" alt="Z Broadway Logo" />
                        </div>
                        <span className={styles.logoText}>Z Broadway</span>
                  </div>

                  <div className={styles.shoppingCartButton}>
                        <LuShoppingCart size={27} color="Black" />
                  </div>
            </nav>
      );
};

export default Nav;
