import React, { useRef, useState } from "react";
import styles from "../../styles/Shared/Horizontalscroll.module.css";

const HorizontalScroll = () => {
      const items = [
            "White Coffee",
            "+ Chocolate",
            "Tea",
            "Black Coffee",
            "Gingerbread Latte",
            "Cappuccino",
            "Americano",
            "Latte",
            "Chai Latte",
            "Flat White",
            "Mochachino",
            "Short Black",
            "Lemon Ginger Honey Tea",
            "English Tea",
            "Long Black",
            "Hot Chocolate",
            "Flat White",
            "Chai Latte",
            "Fluffy",
            "Benoffee Frappe",
            "Mocha Frappe",
            "Chocolate Frappe",
            "Ice Cold Foam Frappucino",
            "Ice Latte",
            "Ice Cold Foam Machiatto",
            "Ice Match",
            "Iced Mocha",
            "Banana Berry Smoothie",
            "Coffee Frappe",
            "Iced Americano",
            "Iced Chocolate",
            "Hokey Pokey Frappe",
            "Tropical Smoothie",
      ];

      const scrollRef = useRef(null);
      const [isDragging, setIsDragging] = useState(false);
      const [startX, setStartX] = useState(0);
      const [scrollLeft, setScrollLeft] = useState(0);

      const handleMouseDown = (e) => {
            setIsDragging(true);
            setStartX(e.pageX - scrollRef.current.offsetLeft);
            setScrollLeft(scrollRef.current.scrollLeft);
      };

      const handleMouseMove = (e) => {
            if (!isDragging) return;
            const x = e.pageX - scrollRef.current.offsetLeft;
            const walk = (x - startX) * 1.5;
            scrollRef.current.scrollLeft = scrollLeft - walk;
      };

      const handleMouseUpOrLeave = () => {
            setIsDragging(false);
      };

      return (
            <div
                  ref={scrollRef}
                  className={styles.scrollContainer}
                  onMouseDown={handleMouseDown}
                  onMouseMove={handleMouseMove}
                  onMouseUp={handleMouseUpOrLeave}
                  onMouseLeave={handleMouseUpOrLeave}
                  style={{ cursor: isDragging ? "grabbing" : "grab" }}
            >
                  {items.map((item, index) => (
                        <button key={index} className={styles.itemButton}>
                              {item}
                        </button>
                  ))}
            </div>
      );
};

export default HorizontalScroll;
