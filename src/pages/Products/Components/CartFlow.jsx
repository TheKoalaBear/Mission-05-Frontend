import React, { createContext, useReducer, useContext } from "react";

const cartFlow = createContext();
const initialState = {
      items: [],
      totalPrice: 0,
};

const cartReducer = (state, action) => {
      switch (action.type) {
            case "ADD_TO_CART":
                  const existingItem = state.items.find(
                        (item) =>
                              item.id === action.payload.id &&
                              item.addedFromMakeCombo === action.payload.addedFromMakeCombo
                  );
                  if (existingItem) {
                        return {
                              ...state,
                              items: state.items.map((item) =>
                                    item.id === action.payload.id ? { ...item, quantity: item.quantity + 1 } : item
                              ),
                        };
                  } else {
                        return {
                              ...state,
                              items: [...state.items, { ...action.payload, quantity: 1 }],
                        };
                  }

            case "REMOVE_FROM_CART":
                  return {
                        ...state,
                        items: state.items.filter((item, index) => index !== action.payload),
                  };

            case "CLEAR_CART":
                  return {
                        ...state,
                        items: [],
                  };

            case "UPDATE_QUANTITY":
                  return {
                        ...state,
                        items: state.items.map((item, index) =>
                              index === action.payload.index ? { ...item, quantity: action.payload.quantity } : item
                        ),
                  };

            default:
                  return state;
      }
};

export const CartFlowProvider = ({ children }) => {
      const [state, dispatch] = useReducer(cartReducer, initialState);

      const addToCart = (product) => {
            dispatch({ type: "ADD_TO_CART", payload: product });
      };

      const removeFromCart = (index) => {
            dispatch({ type: "REMOVE_FROM_CART", payload: index });
      };

      const clearCart = () => {
            dispatch({ type: "CLEAR_CART" });
      };

      return <cartFlow.Provider value={{ state, addToCart, removeFromCart, clearCart }}>{children}</cartFlow.Provider>;
};

export const useCartFlow = () => useContext(cartFlow);
