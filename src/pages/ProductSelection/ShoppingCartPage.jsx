import React from "react";
import HeaderNav from "../../components/shared/HeaderNav";
import styles from "../../styles/shared/ShoppingCartPage.module.css";
import stylesFrame from "../../styles/shared/ProductMobileFrame.module.css";

const CartItem = ({ imageSrc, name, options, price }) => (
      <div className={styles.cartItem}>
            <img src={imageSrc} alt={name} className={styles.productImage} />
            <div className={styles.itemDetails}>
                  <div className={styles.itemName}>{name}</div>
                  {options.map((opt, idx) => (
                        <div key={idx} className={styles.itemOption}>
                              {opt}
                        </div>
                  ))}
            </div>
            <div className={styles.itemPrice}>{price}</div>
      </div>
);

const QuantityControls = () => (
      <div className={styles.quantityControls}>
            <button>-</button>
            <span>0</span>
            <button>+</button>
            <button className={styles.editBtn}>✏️</button>
            <button className={styles.deleteBtn}>🗑️</button>
      </div>
);
// Need to add some conditional logic to show the edit and delete buttons only when the item is in the cart
const ShoppingCartPage = () => {
      return (
            <div className={stylesFrame.mobileFrame}>
                  <div className={stylesFrame.container}>
                        <HeaderNav></HeaderNav>
                        <h2>Confirm your order</h2>

                        <CartItem imageSrc="/coffee.png" name="Coffee" options={["Milk", "Extra"]} price="<Price>" />
                        <QuantityControls />

                        <CartItem imageSrc="/cold-drink.png" name="Cold Drinks" options={[]} price="<Price>" />
                        <QuantityControls />

                        <CartItem imageSrc="/hot-food.png" name="Hot Food" options={[]} price="<Price>" />
                        <QuantityControls />

                        <div className={styles.totalSection}>
                              <span>Total</span>
                              <span className={styles.totalPrice}>$00.00</span>
                        </div>
                  </div>
            </div>
      );
};

export default ShoppingCartPage;
