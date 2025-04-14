import React from "react";
import { Link } from "react-router-dom";
import styles from "../../styles/Shared/Content.module.css";

const MakeComboHorizontalScrollComponentForContent = ({ productsByCategory, categoryGroups }) => {
      return (
            <>
                  {categoryGroups.map((title) => (
                        <div key={title} className={styles.horizontalSection}>
                              <h2 className={styles.subTitle}>{title}</h2>
                              <div className={styles.horizontalScroll}>
                                    {productsByCategory[title]?.length > 0 ? (
                                          productsByCategory[title].map((product) => (
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
                                          <p>No items in this category.</p>
                                    )}
                              </div>
                        </div>
                  ))}
            </>
      );
};

export default MakeComboHorizontalScrollComponentForContent;
