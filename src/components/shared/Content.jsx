import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import styles from "../../styles/Shared/Content.module.css";

const Content = ({ category, title }) => {
      const [products, setProducts] = useState([]);
      const [loading, setLoading] = useState(true);
      const [error, setError] = useState(null);

      useEffect(() => {
            const fetchProducts = async () => {
                  setLoading(true);
                  try {
                        const response = await fetch(`/api/products?category=${category}`);
                        if (!response.ok) {
                              throw new Error("Failed to fetch products");
                        }
                        const data = await response.json();
                        setProducts(data);
                  } catch (error) {
                        setError(error.message);
                  } finally {
                        setLoading(false);
                  }
            };

            if (category) {
                  fetchProducts();
            }
      }, [category]);

      if (loading) {
            return <div>Loading products...</div>;
      }

      if (error) {
            return <div>Error: {error}</div>;
      }

      return (
            <>
                  {title && (
                        <div className={styles.titleContainer}>
                              <h1 className={styles.title}>{title}</h1>
                        </div>
                  )}
                  <div className={styles.content}>
                        {products.length > 0 ? (
                              products.map((product) => (
                                    <Link
                                          to={`/productpage/${product._id}`}
                                          key={product._id}
                                          className={styles.productCard}
                                    >
                                          <img
                                                src={product.image?.[0]}
                                                alt={product.name}
                                                className={styles.productImage}
                                          />
                                          <h2>{product.name}</h2>
                                    </Link>
                              ))
                        ) : (
                              <p>No products available in this category.</p>
                        )}
                  </div>
            </>
      );
};

export default Content;
