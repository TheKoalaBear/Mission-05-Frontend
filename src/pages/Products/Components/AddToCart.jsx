import react from "react";
import { useCartFlow } from "./CartFlow";
import productStyles from "../Products.module.css";

const AddToCart = ({ product, selectedMilk, selectedStrength, selectedFlavour }) => {
      // const { addToCart } = useCartFlow();
      const handleAddToCart = () => {
            const selectedOptions = {
                  ...product,
                  selectedMilk,
                  selectedStrength,
                  selectedFlavour,
            };
            addToCart({ ...product, selectedOptions });
            alert("Item added to cart!");
      };

      return (
            <button className={`${productStyles.button} ${productStyles.addToCartButton}`} onClick={handleAddToCart}>
                  Add to Cart
            </button>
      );
};

export default AddToCart;
