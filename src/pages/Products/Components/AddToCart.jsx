import react from "react";
import { useLocation } from "react-router-dom";
import { useCartFlow } from "./CartFlow";
import productStyles from "../Products.module.css";

const AddToCart = ({ product, selectedMilk, selectedStrength, selectedFlavour }) => {
      const location = useLocation();
      const isMakeCombo = location.pathname === "/makecombo";
      const { addToCart } = useCartFlow();

      const handleAddToCart = () => {
            const selectedOptions = {
                  ...product,
                  selectedMilk,
                  selectedStrength,
                  selectedFlavour,
            };

            //check if product is from makecombo page
            addToCart({ ...product, selectedOptions, addedFromMakeCombo: isMakeCombo });

            alert("Item added to cart!");
      };

      return (
            <button className={`${productStyles.button} ${productStyles.addToCartButton}`} onClick={handleAddToCart}>
                  Add to Cart
            </button>
      );
};

export default AddToCart;
