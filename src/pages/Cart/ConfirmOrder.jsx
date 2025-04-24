import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiEdit2, FiArrowLeft } from "react-icons/fi";
import { FaMinus, FaPlus, FaRegTrashCan } from "react-icons/fa6";
import { IoCartOutline } from "react-icons/io5";
import BottomNav from "../../components/global/BottomNav";
import "./ConfirmOrder.css";

// Import images
import hotDrinkImg from "../../assets/confirmorder_png/hotdrink.png";
import coldDrinkImg from "../../assets/confirmorder_png/colddrink.png";
import hotFoodImg from "../../assets/confirmorder_png/hotfood.png";
import locationPin from "../../assets/confirmorder_png/Pin.png";

const ConfirmOrder = () => {
  const navigate = useNavigate();

  // Initial state for order items
  const [orderItems, setOrderItems] = useState([
    {
      id: 1,
      name: "Coffee",
      options: ["Milk", "Extra"],
      price: 5.0,
      quantity: 0,
      image: hotDrinkImg,
      category: "Hot Drinks",
    },
    {
      id: 2,
      name: "Cold Drinks",
      options: [],
      price: 4.5,
      quantity: 0,
      image: coldDrinkImg,
      category: "Cold Drinks",
    },
    {
      id: 3,
      name: "Hot Food",
      options: [],
      price: 6.5,
      quantity: 0,
      image: hotFoodImg,
      category: "Hot Food",
    },
  ]);

  // Handler functions
  const handleQuantityChange = (id, change) => {
    setOrderItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(0, item.quantity + change) } : item
      )
    );
  };

  const handleDeleteItem = (id) => {
    setOrderItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const handleEditItem = (id) => {
    // Navigate to edit page or show edit modal
    console.log(`Edit item ${id}`);
  };

  // Calculate total price
  const totalPrice = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Format price to 2 decimal places
  const formatPrice = (price) => {
    return `$${price.toFixed(2)}`;
  };

  return (
    <div className="order-container">
      {/* Header */}
      <header className="order-header">
        <Link to="/" className="nav-link" aria-label="Go back" tabIndex="0">
          <FiArrowLeft className="header-icon" />
        </Link>
        <div className="store-info">
          <img src={locationPin} alt="Location" className="location-pin" />
          <h1 className="store-name">Z Broadway</h1>
        </div>
        <Link to="/cart" className="nav-link" aria-label="View cart" tabIndex="0">
          <IoCartOutline className="header-icon" />
        </Link>
      </header>

      {/* Main content */}
      <main className="order-content">
        <h2 className="order-title">Confirm your order</h2>

        {/* Order items */}
        <div className="order-items">
          {orderItems.map((item) => (
            <div key={item.id} className="order-item-container">
              {/* Card with 3-column layout */}
              <div className="order-item">
                {/* Column 1: Image */}
                <div className="item-image">
                  <img src={item.image} alt={item.name} />
                </div>

                {/* Column 2: Item details */}
                <div className="item-info">
                  <h3 className="item-name">{item.name}</h3>
                  <div className="item-options">
                    {item.options.map((option, index) => (
                      <p key={index} className="item-option">
                        {option}
                      </p>
                    ))}
                  </div>
                </div>

                {/* Column 3: Price */}
                <div className="item-price">
                  <p className="price-text">{formatPrice(item.price)}</p>
                </div>
              </div>

              {/* Controls below the card */}
              <div className="item-controls">
                <button
                  onClick={() => handleQuantityChange(item.id, -1)}
                  className="quantity-control"
                  aria-label="Decrease quantity"
                  tabIndex="0"
                >
                  <FaMinus className="control-icon" />
                </button>

                <span className="quantity-text">{item.quantity}</span>

                <button
                  onClick={() => handleQuantityChange(item.id, 1)}
                  className="quantity-control"
                  aria-label="Increase quantity"
                  tabIndex="0"
                >
                  <FaPlus className="control-icon" />
                </button>

                <button
                  onClick={() => handleEditItem(item.id)}
                  className="edit-button"
                  aria-label="Edit item"
                  tabIndex="0"
                >
                  <FiEdit2 className="control-icon" />
                </button>

                <button
                  onClick={() => handleDeleteItem(item.id)}
                  className="delete-button"
                  aria-label="Delete item"
                  tabIndex="0"
                >
                  <FaRegTrashCan className="control-icon" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Total */}
        <div className="total-section">
          <div className="total-label">Total</div>
          <div className="total-amount">
            {totalPrice === 0 ? "$00.000" : formatPrice(totalPrice)}
          </div>
        </div>

        {/* Buttons */}
        <div className="action-buttons">
          <button
            onClick={() => navigate("/")}
            className="cancel-button"
            aria-label="Cancel order"
            tabIndex="0"
          >
            Cancel
          </button>
          <button
            onClick={() => navigate("/payment")}
            className="pay-button"
            aria-label="Pay for order"
            tabIndex="0"
          >
            Pay
          </button>
        </div>
      </main>

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
};

export default ConfirmOrder;
