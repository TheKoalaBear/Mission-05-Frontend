import React, { useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import styles from "../../styles/Shared/Horizontalscroll.module.css";

const HorizontalScroll = () => {
      const items = [
            { name: "Chocolate", link: "http://localhost:5173/productpage/67f4d0b25269ad8d08f114f2" },
            { name: "Tea", link: "http://localhost:5173/productpage/67f4d0b25269ad8d08f114f0" },
            { name: "Black Coffee", link: "http://localhost:5173/productpage/67f4d0b25269ad8d08f114ee" },
            { name: "Gingerbread Latte", link: "http://localhost:5173/productpage/67f4d0b25269ad8d08f114e7" },
            { name: "Cappuccino", link: "http://localhost:5173/productpage/67f4d0b25269ad8d08f114e8" },
            { name: "Americano", link: "http://localhost:5173/productpage/67f4d0b25269ad8d08f114e9" },
            { name: "Latte", link: "http://localhost:5173/productpage/67f4d0b25269ad8d08f114ea" },
            { name: "Chai Latte", link: "http://localhost:5173/productpage/67f4d0b25269ad8d08f114eb" },
            { name: "Flat White", link: "http://localhost:5173/productpage/67f4d0b25269ad8d08f114ec" },
            { name: "Mochachino", link: "http://localhost:5173/productpage/67f4d0b25269ad8d08f114ed" },
            { name: "Short Black", link: "http://localhost:5173/productpage/67f4d0b25269ad8d08f114ee" },
            { name: "Lemon Ginger Honey Tea", link: "http://localhost:5173/productpage/67f4d0b25269ad8d08f114ef" },
            { name: "English Tea", link: "http://localhost:5173/productpage/67f4d0b25269ad8d08f114f0" },
            { name: "Long Black", link: "http://localhost:5173/productpage/67f4d0b25269ad8d08f114f1" },
            { name: "Hot Chocolate", link: "http://localhost:5173/productpage/67f4d0b25269ad8d08f114f2" },
            { name: "Flat White", link: "http://localhost:5173/productpage/67f4d0b25269ad8d08f114f3" },
            { name: "Chai Latte", link: "http://localhost:5173/productpage/67f4d0b25269ad8d08f114f4" },
            { name: "Fluffy", link: "http://localhost:5173/productpage/67f4d0b25269ad8d08f114f5" },
            { name: "Benoffee Frappe", link: "http://localhost:5173/productpage/67f4d0b25269ad8d08f114d9" },
            { name: "Mocha Frappe", link: "http://localhost:5173/productpage/67f4d0b25269ad8d08f114da" },
            { name: "Chocolate Frappe", link: "http://localhost:5173/productpage/67f4d0b25269ad8d08f114db" },
            { name: "Ice Cold Foam Frappucino", link: "http://localhost:5173/productpage/67f4d0b25269ad8d08f114dc" },
            { name: "Ice Latte", link: "http://localhost:5173/productpage/67f4d0b25269ad8d08f114dd" },
            { name: "Ice Cold Foam Machiatto", link: "http://localhost:5173/productpage/67f4d0b25269ad8d08f114de" },
            { name: "Ice Match", link: "http://localhost:5173/productpage/67f4d0b25269ad8d08f114df" },
            { name: "Iced Mocha", link: "http://localhost:5173/productpage/67f4d0b25269ad8d08f114e0" },
            { name: "Banana Berry Smoothie", link: "http://localhost:5173/productpage/67f4d0b25269ad8d08f114e1" },
            { name: "Coffee Frappe", link: "http://localhost:5173/productpage/67f4d0b25269ad8d08f114e2" },
            { name: "Iced Americano", link: "http://localhost:5173/productpage/67f4d0b25269ad8d08f114e3" },
            { name: "Iced Chocolate", link: "http://localhost:5173/productpage/67f4d0b25269ad8d08f114e4" },
            { name: "Hokey Pokey Frappe", link: "http://localhost:5173/productpage/67f4d0b25269ad8d08f114e5" },
            { name: "Tropical Smoothie", link: "http://localhost:5173/productpage/67f4d0b25269ad8d08f114e6" },
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
                        <a key={index} href={item.link} className={styles.itemButton}>
                              {item.name}
                        </a>
                  ))}
            </div>
      );
};

export default HorizontalScroll;
