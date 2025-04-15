import React, { useState } from "react";
import styles from "../../styles/shared/ProductPageQuantityControls.module.css";

function ProductQuantity() {
      const [quantity, setQuantity] = useState(0);
      const increaseQuantity = () => setQuantity(quantity + 1);
      const decreaseQuantity = () => setQuantity(Math.max(quantity - 1, 0));
      return (
            <div className={styles.quantityControls}>
                  <label className={styles.quantityLabel}></label>
                  <div className={styles.container}>
                        <button onClick={decreaseQuantity}>-</button>
                        <span className={styles.quantityDisplay}>{quantity}</span>
                        <button onClick={increaseQuantity}>+</button>
                  </div>
            </div>
      );
}

export default ProductQuantity;
