import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import MakeComboHorizontalScrollComponentForContent from "./MakeComboHorizontalScrollComponentForContent";

import styles from "../../styles/Shared/Content.module.css";

const categoryGroups = ["Hot Drink", "Cold Drink", "Savoury", "Vegetarian"];

const Content = ({ category, title }) => {
      const location = useLocation();
      const isMakeCombo = location.pathname === "/makecombo";

      const [productsByCategory, setProductsByCategory] = useState({});
      const [products, setProducts] = useState([]);
      const [loading, setLoading] = useState(true);
      const [error, setError] = useState(null);

      useEffect(() => {
            const fetchAll = async () => {
                  setLoading(true);
                  try {
                        if (isMakeCombo) {
                              const results = {};
                              for (const cat of categoryGroups) {
                                    const res = await fetch(`/api/products?category=${encodeURIComponent(cat)}`);
                                    if (!res.ok) throw new Error("Failed to fetch products");
                                    results[cat] = await res.json();
                              }
                              setProductsByCategory(results);
                        } else if (category) {
                              const res = await fetch(`/api/products?category=${category}`);
                              if (!res.ok) throw new Error("Failed to fetch products");
                              setProducts(await res.json());
                        }
                  } catch (err) {
                        setError(err.message);
                  } finally {
                        setLoading(false);
                  }
            };

            fetchAll();
      }, [isMakeCombo, category]);

      if (loading) return <div>Loading products...</div>;
      if (error) return <div>Error: {error}</div>;

      return (
            <>
                  {title && (
                        <div className={styles.titleContainer}>
                              <h1 className={styles.title}>{title}</h1>
                        </div>
                  )}

                  {isMakeCombo ? (
                        <MakeComboHorizontalScrollComponentForContent
                              productsByCategory={productsByCategory}
                              categoryGroups={categoryGroups}
                        />
                  ) : (
                        <div className={styles.content}>
                              {products.length > 0 ? (
                                    products.map((product) => (
                                          <Link
                                                to={`/productpage/${product._id}`}
                                                key={product._id}
                                                className={styles.productCard}
                                          >
                                                <div className={styles.productImageContainer}>
                                                      <img
                                                            src={product.image?.[0]}
                                                            alt={product.name}
                                                            className={styles.productImage}
                                                      />
                                                </div>
                                                <div
                                                      style={{
                                                            backgroundColor: "rgb(254, 249, 245)",
                                                      }}
                                                >
                                                      <h2>{product.name}</h2>
                                                </div>
                                          </Link>
                                    ))
                              ) : (
                                    <p>No products available in this category.</p>
                              )}
                        </div>
                  )}
            </>
      );
};

export default Content;
