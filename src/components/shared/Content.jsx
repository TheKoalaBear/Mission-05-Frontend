import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import styles from "../../styles/Shared/Content.module.css";

const categoryGroups = ["Hot Drinks", "Cold Drinks", "Savoury", "Vegetarian"];

const Content = ({ category, title }) => {
      const location = useLocation();
      const isMakeCombo = location.pathname === "/makecombo";

      const [productsByCategory, setProductsByCategory] = useState({});
      const [products, setProducts] = useState([]);
      const [loading, setLoading] = useState(true);
      const [error, setError] = useState(null);
      // This is only for the make combo page
      useEffect(() => {
            const fetchAllCategories = async () => {
                  try {
                        const allResults = {};
                        for (const cat of categoryGroups) {
                              const response = await fetch(`/api/products?category=${encodeURIComponent(cat)}`);
                              if (!response.ok) throw new Error("Failed to fetch products");
                              const data = await response.json();
                              allResults[cat] = data;
                        }
                        setProductsByCategory(allResults);
                  } catch (error) {
                        setError(error.message);
                  } finally {
                        setLoading(false);
                  }
            };

            if (isMakeCombo) {
                  fetchAllCategories();
            }
      }, [isMakeCombo]);

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
