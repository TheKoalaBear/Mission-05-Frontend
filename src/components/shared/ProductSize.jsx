import React from "react";
import productStyles from "../../styles/Shared/ProductSize.module.css";

// Images
import mediumImage from "/src/assets/orderfoodhomepage_img/medium.png";
import largeImage from "/src/assets/orderfoodhomepage_img/large.png";

function ProductSize({ product }) {
      return (
            <div className={productStyles.sizesSection}>
                  <div className={productStyles.sizeCard}>
                        <div className={productStyles.sizeCardContent}>
                              <img src={mediumImage} alt="Medium" className={productStyles.sizeImage} />
                              <div className={productStyles.sizeTextGroup}>
                                    <h6>Medium</h6>
                                    <h5>${product.price.medium}</h5>
                              </div>
                        </div>
                  </div>
                  <div className={productStyles.sizeCard}>
                        <div className={productStyles.sizeCardContent}>
                              <img src={largeImage} alt="Large" className={productStyles.sizeImage} />
                              <div className={productStyles.sizeTextGroup}>
                                    <h6>Large</h6>
                                    <h5>${product.price.large}</h5>
                              </div>
                        </div>
                  </div>
            </div>
      );
}

export default ProductSize;
