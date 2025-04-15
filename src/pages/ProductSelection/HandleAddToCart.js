import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
      const [cart, setCart] = useState([]);

      useEffect(() => {
            const storedCart = localStorage.getItem("cart");
            if (storedCart) {
                  setCart(JSON.parse(storedCart));
            }
      }, []);

      useEffect(() => {
            localStorage.setItem("cart", JSON.stringify(cart));
      }, [cart]);

      const addToCart = (item) => {
            setCart((prevCart) => {
                  const existingItem = prevCart.find((i) => i.id === item.id && i.optionsKey === item.optionsKey);
                  if (existingItem) {
                        return prevCart.map((i) =>
                              i.id === item.id && i.optionsKey === item.optionsKey
                                    ? { ...i, quantity: i.quantity + item.quantity }
                                    : i
                        );
                  } else {
                        return [...prevCart, item];
                  }
            });
      };

      const removeFromCart = (id, optionsKey) => {
            setCart((prevCart) => prevCart.filter((item) => item.id !== id || item.optionsKey !== optionsKey));
      };

      const clearCart = () => setCart([]);

      return (
            <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
                  {children}
            </CartContext.Provider>
      );
};
