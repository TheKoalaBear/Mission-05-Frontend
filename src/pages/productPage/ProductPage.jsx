import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import StatusBar from "../../components/shared/StatusBar";
import Nav from "../../components/shared/Nav";
import BottomNav from "../../components/shared/BottomNav";
import ProductCard from "../../components/shared/ProductSize";
import ProductQuantity from "../../components/shared/ProductQuantity";
import styles from "../../styles/Shared/MobileFrame.module.css";
import productStyles from "../../styles/Shared/ProductPage.module.css";

const ProductPage = () => {
      const { productId } = useParams();
      const [product, setProduct] = useState(null);

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
                        <StatusBar />
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
                                    <div>
                                          <h3>Milk Options</h3>
                                          <div>
                                                {product.milkOptions.map((option, index) => (
                                                      <button key={index}>{option}</button>
                                                ))}
                                          </div>
                                    </div>
                              )}

                              {product.strengthOptions && product.strengthOptions.length > 0 && (
                                    <div>
                                          <h3>Strength Options</h3>
                                          <div>
                                                {product.strengthOptions.map((option, index) => (
                                                      <button key={index}>{option}</button>
                                                ))}
                                          </div>
                                    </div>
                              )}

                              {product.flavourOptions && product.flavourOptions.length > 0 && (
                                    <div>
                                          <h3>Flavor Options</h3>
                                          <div>
                                                {product.flavourOptions.map((option, index) => (
                                                      <button key={index}>{option}</button>
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
                                          <button className={productStyles.addToCartButton}>Add to Cart</button>
                                    </div>
                              </div>
                        </div>

                        <BottomNav />
                  </div>
            </div>
      );
};

export default ProductPage;
