import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
// import StatusBar from "../../components/shared/StatusBar";
import Nav from "../../components/shared/Nav";
import BottomNav from "../../mcfolders/components/BottomNav";
import ProductCard from "../../components/shared/ProductSize";
import ProductQuantity from "../../components/shared/ProductQuantity";
import { useCart } from "./CartContext";
import useProductOptions from "./UseProductOptions";

// Styles
import styles from "../../styles/Shared/ProductMobileFrame.module.css";
import productStyles from "../../styles/Shared/ProductPage.module.css";

const ProductPage = () => {
      const { productId } = useParams();
      const [product, setProduct] = useState(null);

      const {
            selectedMilk,
            setSelectedMilk,
            selectedStrength,
            setSelectedStrength,
            selectedFlavour,
            setSelectedFlavour,
      } = useProductOptions();

      //   const { addToCart } = useCart();

      useEffect(() => {
            // Fetch product data from MongoDB
            const fetchProduct = async () => {
                  try {
                        const response = await fetch(`/api/products/${productId}`);
                        const data = await response.json();
                        console.log("Fetched product:", data);
                        setProduct(data);
                  } catch (error) {
                        console.error("Error fetching product:", error);
                  }
            };

            fetchProduct();
      }, [productId]);

      if (!product) {
            return <div>Loading...</div>;
      }

      return (
            <div className={styles.mobileFrame}>
                  <div className={styles.container}>
                        {/* <StatusBar /> */}
                        <Nav />

                        <div className={productStyles.wrapped}>
                              <div className={productStyles.productLayout}>
                                    <div className={productStyles.productImage}>
                                          <img src={product.image?.[0]} alt={product.name} />
                                    </div>

                                    <div className={productStyles.productDetails}>
                                          <h1>{product.name}</h1>
                                          <p>{product.description}</p>
                                    </div>
                              </div>

                              {!(product.category === "Savoury" || product.category === "Vegetarian") && <h3>Size</h3>}

                              <ProductCard product={product} />

                              <h3>Quantity</h3>
                              <ProductQuantity />
                              {product.milkOptions && product.milkOptions.length > 0 && (
                                    <div className={productStyles.optionSection}>
                                          <h3 className={productStyles.optionTitle}>Milk</h3>
                                          <div className={productStyles.optionGrid}>
                                                {product.milkOptions.map((option, index) => (
                                                      <label key={index} className={productStyles.optionItem}>
                                                            <input
                                                                  type="radio"
                                                                  name="milk"
                                                                  value={option}
                                                                  checked={selectedMilk === option}
                                                                  onChange={() => {
                                                                        setSelectedMilk((prev) =>
                                                                              prev === option ? "" : option
                                                                        );
                                                                  }}
                                                                  className={productStyles.radioInput}
                                                            />
                                                            <span className={productStyles.customRadio}></span>
                                                            {option}
                                                      </label>
                                                ))}
                                          </div>
                                    </div>
                              )}

                              {product.strengthOptions && product.strengthOptions.length > 0 && (
                                    <div className={productStyles.optionSection}>
                                          <h3 className={productStyles.optionTitle}>Strength</h3>
                                          <div className={productStyles.optionGrid2}>
                                                {product.strengthOptions.map((option, index) => (
                                                      <label key={index} className={productStyles.optionItem}>
                                                            <input
                                                                  type="radio"
                                                                  name="strength"
                                                                  value={option}
                                                                  checked={selectedStrength === option}
                                                                  onChange={() => setSelectedStrength(option)}
                                                                  className={productStyles.radioInput}
                                                            />
                                                            <span className={productStyles.customRadio}></span>
                                                            <span className={productStyles.optionLabel}>
                                                                  {option}
                                                                  {option.toLowerCase().includes("extra shot") && (
                                                                        <span
                                                                              className={productStyles.extraCost2}
                                                                        ></span>
                                                                  )}
                                                            </span>
                                                      </label>
                                                ))}
                                                <h4>+ 90 cents</h4>
                                          </div>
                                    </div>
                              )}

                              {product.flavourOptions && product.flavourOptions.length > 0 && (
                                    <div className={productStyles.optionSection}>
                                          <h3 className={productStyles.optionTitle}>Flavour </h3>
                                          <div className={productStyles.extraCost}></div>
                                          <div className={productStyles.optionGrid2}>
                                                {product.flavourOptions.map((option, index) => (
                                                      <label key={index} className={productStyles.optionItem}>
                                                            <input
                                                                  type="radio"
                                                                  name="flavour"
                                                                  value={option}
                                                                  checked={selectedFlavour === option}
                                                                  onChange={() => setSelectedFlavour(option)}
                                                                  className={productStyles.radioInput}
                                                            />

                                                            <span className={productStyles.customRadio}></span>
                                                            <span className={productStyles.optionLabel}>
                                                                  {option}
                                                                  <span className={productStyles.extraCost}>
                                                                        {" "}
                                                                        + $1.00
                                                                  </span>
                                                            </span>
                                                      </label>
                                                ))}
                                          </div>
                                    </div>
                              )}

                              {/* Had to style buttons seperately */}
                              <div className={productStyles.actionButtons}>
                                    <div className={productStyles.cancelButtonWrapper}>
                                          <button className={productStyles.cancelButton}>Cancel</button>
                                    </div>
                                    <div className={productStyles.addToCartButtonWrapper}>
                                          <button
                                                className={productStyles.addToCartButton}
                                                onClick={() => {
                                                      const selectedOptions = {
                                                            milk: selectedMilk,
                                                            strength: selectedStrength,
                                                            flavour: selectedFlavour,
                                                      };
                                                      addToCart(product, selectedOptions);
                                                      alert("Item added to cart!");
                                                }}
                                          >
                                                Add to Cart
                                          </button>
                                    </div>
                              </div>
                        </div>

                        <BottomNav />
                  </div>
            </div>
      );
};

export default ProductPage;
