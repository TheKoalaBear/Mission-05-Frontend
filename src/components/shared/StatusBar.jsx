import React from "react";
import styles from "../../styles/Orderfoodhomepagecss/Statusbar.module.css";

const Statusbar = () => {
      console.log("Rendering StatusBar");
      return (
            <div className={styles.statusBar}>
                  <span className={styles.time}>9:41</span>

                  <div className={styles.icons}>
                        <img src="src/assets/orderfoodhomepage_img/signal-wifi-battery.png" alt="Signal/wifi/battery" />
                  </div>
            </div>
      );
};

export default Statusbar;
