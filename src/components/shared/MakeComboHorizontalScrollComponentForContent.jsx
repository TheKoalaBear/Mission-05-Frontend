import React from "react";
import { Link } from "react-router-dom";
import styles from "../../styles/Shared/Content.module.css";

const MakeComboHorizontalScrollComponentForContent = ({ productsByCategory, categoryGroups }) => {
      const scrollRef = useRef({});
      const [isDragging, setIsDragging] = useState(false);
      const [startX, setStartX] = useState(0);
      const [scrollLeft, setScrollLeft] = useState(0);

      const handleMouseDown = (e, title) => {
            setIsDragging(true);
            const scrollEl = scrollRefs.current[title];
            setStartX(e.pageX - scrollRef[title].offsetLeft);
            setScrollLeft(scrollRef[title].scrollLeft);
      };

      const handleMouseMove = (e, title) => {
            if (!isDragging) return;
            const x = e.pageX - scrollRef[title].offsetLeft;
            const walk = (x - startX) * 1.5;
            scrollRef[title].scrollLeft = scrollLeft - walk;
      };

      const handleMouseUpOrLeave = (title) => {
            setIsDragging(false);
      };

      return (
            <>
                  {categoryGroups.map((title) => (
                        <div key={title} className={styles.horizontalSection}>
                              <h2 className={styles.subTitle}>{title}</h2>
                              <div
                                    ref={(el) => (scrollRef.current[title] = el)}
                                    className={styles.horizontalScroll}
                                    onMouseDown={(e) => handleMouseDown(e, title)}
                                    onMouseMove={(e) => handleMouseMove(e, title)}
                                    onMouseUp={() => handleMouseUpOrLeave(title)}
                                    onMouseLeave={() => handleMouseUpOrLeave(title)}
                                    style={{ cursor: isDragging ? "grabbing" : "grab" }}
                              >
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
