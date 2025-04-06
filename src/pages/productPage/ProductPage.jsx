import React, { useState, useEffect } from "react";
import StatusBar from "../../components/shared/StatusBar";
import Nav from "../../components/shared/Nav";
import Horizontalscroll from "../../components/shared/Horizontalscroll";
import Content from "../../components/shared/Content";
import BottomNav from "../../components/shared/BottomNav";
import styles from "../../styles/Orderhotdrinkscss/Orderhotdrinks.module.css";

const ProductPage = () => {
      const { productId } = useParams(); // ID from the URL
      const [product, setProduct] = useState(null);

      useEffect(() => {
            // Fetch product data from MongoDB
            const fetchProduct = async () => {
                  try {
                        // MongoDB fetching logic
                        const response = await fetch(`/api/products/${productId}`);
                        const data = await response.json();
                        setProduct(data);
                  } catch (error) {
                        console.error("Error fetching product:", error);
                  }
            };

            fetchProduct();
      }, [productId]);

      if (!product) {
            return <div>Loading...</div>;
      }

      return (
            <div className={styles.mobileFrame}>
                  <div className={styles.container}>
                        <StatusBar />
                        <Nav />
                        <Horizontalscroll />
                        <div className={styles.content}>
                              <h1>{product.name}</h1>
                              <img src={product.image} alt={product.name} />
                              <p>{product.description}</p>
                              {/* Render size, milk, strength, flavour, price, etc. based on product data */}
                              {/* ... */}
                        </div>
                        <BottomNav />
                  </div>
            </div>
      );
};

export default ProductPage;
