import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import styles from "../../styles/shared/Content.module.css";

const MakeComboHorizontalScrollComponentForContent = ({ productsByCategory, categoryGroups }) => {
      const scrollRefs = useRef({});
      const [isDragging, setIsDragging] = useState(false);
      const [startX, setStartX] = useState(0);
      const [scrollLeft, setScrollLeft] = useState(0);

      const handleMouseDown = (e, title) => {
            setIsDragging(true);
            const scrollEl = scrollRefs.current[title];
            setStartX(e.pageX - scrollEl.offsetLeft);
            setScrollLeft(scrollEl.scrollLeft);
      };

      const handleMouseMove = (e, title) => {
            if (!isDragging) return;
            const scrollEl = scrollRefs.current[title];
            if (!scrollEl) return;
            const x = e.pageX - scrollEl.offsetLeft;
            const walk = (x - startX) * 1.5;
            scrollEl.scrollLeft = scrollLeft - walk;
      };
      // keep this because scroll acts weird if removed
      const handleMouseUpOrLeave = (title) => {
            setIsDragging(false);
      };

      return (
            <>
                  {categoryGroups.map((title) => (
                        <div key={title} className={styles.horizontalSection}>
                              <h2 className={styles.subTitle}>{title}</h2>
                              <div
                                    ref={(el) => (scrollRefs.current[title] = el)}
                                    className={styles.horizontalScroll}
                                    onMouseDown={(e) => handleMouseDown(e, title)}
                                    onMouseMove={(e) => handleMouseMove(e, title)}
                                    onMouseUp={() => handleMouseUpOrLeave(title)}
                                    onMouseLeave={() => handleMouseUpOrLeave(title)}
                                    style={{
                                          cursor: isDragging ? "grabbing" : "grab",
                                          userSelect: isDragging ? "none" : "auto",
                                    }}
                              >
                                    {productsByCategory[title]?.length > 0 ? (
                                          productsByCategory[title].map((product) => (
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
                                                      <div className={styles.productTitleContainer}>
                                                            <h2>{product.name}</h2>
                                                      </div>
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
