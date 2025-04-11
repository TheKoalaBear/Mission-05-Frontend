import React, { useState, useEffect } from "react";
import productStyles from "../../styles/Shared/ProductPage.module.css";

const Cards = ({ category }) => {
      const [products, setProducts] = useState([]);

      useEffect(() => {
            // Only grabbing category
            const fetchProducts = async () => {
                  try {
                        const response = await fetch(`/api/products?category=${category}`);
                        const data = await response.json();
                        setProducts(data);
                  } catch (error) {
                        console.error("Error fetching products:", error);
                  }
            };

            if (category) {
                  fetchProducts();
            }
      }, [category]);

      return (
            <div className={productStyles.cardsContainer}>
                  {products.length > 0 ? (
                        products.map((product) => (
                              <div key={product._id} className={productStyles.card}>
                                    <div className={productStyles.productImage}>
                                          <img src={product.image?.[0]} alt={product.name} />
                                    </div>
                                    <div className={productStyles.productDetails}>
                                          <h2>{product.name}</h2>
                                    </div>
                              </div>
                        ))
                  ) : (
                        <p>No products available.</p>
                  )}
            </div>
      );
};

export default Cards;
