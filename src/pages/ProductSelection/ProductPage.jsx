import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Nav from "../../components/shared/HeaderNav";
import BottomNav from "../../mcfolders/components/BottomNav";
import ProductCard from "../../components/shared/ProductCardAndPrice";
import ProductQuantity from "../../components/shared/ProductQuantity";
import { useCart } from "../../components/shared/CartContext";
import MilkStrengthFlavourOptions from "../../components/shared/MilkStrengthFlavourOptions";
// import useProductOptions from "../../components/shared/UseProductOptions";

// Styles
import styles from "../../styles/shared/ProductMobileFrame.module.css";
import productStyles from "../../styles/shared/ProductPage.module.css";

const ProductPage = () => {
      const { productId } = useParams();
      const [product, setProduct] = useState(null);

      // Temp will use again (:D)
      const [selectedMilk, setSelectedMilk] = useState("");
      const [selectedStrength, setSelectedStrength] = useState("");
      const [selectedFlavour, setSelectedFlavour] = useState("");

      // Add to cart will come back and u8se
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

                              <MilkStrengthFlavourOptions
                                    product={product}
                                    selectedMilk={selectedMilk}
                                    setSelectedMilk={setSelectedMilk}
                                    selectedStrength={selectedStrength}
                                    setSelectedStrength={setSelectedStrength}
                                    selectedFlavour={selectedFlavour}
                                    setSelectedFlavour={setSelectedFlavour}
                              />
                        </div>

                        <BottomNav />
                  </div>
            </div>
      );
};

export default ProductPage;
