import React from "react";
import productStyles from "./ProductCardAndPrice.module.css";

// Images
import mediumImage from "/src/assets/orderfoodhomepage_img/medium.png";
import largeImage from "/src/assets/orderfoodhomepage_img/large.png";
import defaultImage from "/src/assets/orderfoodhomepage_img/hotFood.png";

function ProductSize({ product }) {
      return (
            <div className={productStyles.sizesSection}>
                  {product.price.medium ? (
                        <div className={productStyles.sizeCard}>
                              <div className={productStyles.sizeCardContent}>
                                    <img src={mediumImage} alt="Medium" className={productStyles.sizeImage} />
                                    <div className={productStyles.sizeTextGroup}>
                                          <h6>Medium</h6>
                                          <h5>${product.price.medium.toFixed(2)}</h5>
                                    </div>
                              </div>
                        </div>
                  ) : null}
                  {product.price.large ? (
                        <div className={productStyles.sizeCard}>
                              <div className={productStyles.sizeCardContent}>
                                    <img src={largeImage} alt="Large" className={productStyles.sizeImage} />
                                    <div className={productStyles.sizeTextGroup}>
                                          <h6>Large</h6>
                                          <h5>${product.price.large.toFixed(2)}</h5>
                                    </div>
                              </div>
                        </div>
                  ) : null}

                  {!product.price.medium && !product.price.large && product.price.default && (
                        <div className={productStyles.sizeCard2}>
                              <div className={productStyles.sizeCardContent2}>
                                    <img src={defaultImage} alt="Large" className={productStyles.sizeImage2} />
                                    <div className={productStyles.sizeTextGroup2}>
                                          <h6>Price</h6>
                                          <h5>${product.price.default.toFixed(2)}</h5>
                                    </div>
                              </div>
                        </div>
                  )}
            </div>
      );
}

export default ProductSize;
