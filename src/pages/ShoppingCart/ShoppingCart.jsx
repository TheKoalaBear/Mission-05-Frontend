import React from "react";
import HeaderNav from "../../components/shared/HeaderNav";
import ProductQuantity from "../Products/Components/ProductQuantity";
import { useCartFlow } from "../Products/Components/CartFlow";
import styles from "./ShoppingCart.module.css";
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

const QuantityControls = (itemIndex, quantity) => (
      <div className={styles.quantityControls}>
            <button>-</button>
            <span>0</span>
            <button>+</button>
            <button className={styles.editBtn}></button>
            <button className={styles.deleteBtn}></button>
      </div>
);
// Need to add some conditional logic to show the edit and delete buttons only when the item is in the cart
const ShoppingCartPage = () => {
      const { state } = useCartFlow();

      const totalPrice = state.items.reduce((total, item) => total + item.price * item.quantity, 0);
      return (
            <div className={stylesFrame.mobileFrame}>
                  <div className={stylesFrame.container}>
                        <HeaderNav></HeaderNav>
                        <h2>Confirm your order</h2>

                        {state.items.map((item, idx) => (
                              <CartItem
                                    key={idx}
                                    imageSrc={item.imageSrc}
                                    name={item.name}
                                    options={[
                                          item.selectedMilk,
                                          item.selectedStrength,
                                          ...(item.selectedFlavour || []),
                                    ]}
                                    price={item.price}
                                    quantity={item.quantity}
                              />
                        ))}

                        <div className={styles.totalSection}>
                              <div>Total</div>
                              <div className={styles.totalPrice}>$00.00</div>
                        </div>
                  </div>
            </div>
      );
};

export default ShoppingCartPage;
