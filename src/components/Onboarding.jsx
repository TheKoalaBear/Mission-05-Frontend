import { useState } from "react";
import orderCoffeeImage from "../assets/onboarding_img/order_coffee.png";
import sharetankImage from "../assets/onboarding_img/sharetank.png";
import comparePricesImage from "../assets/onboarding_img/compare_price.png";
import "./Onboarding.css";

const slides = [
  {
    title: "Order Coffee",
    description: "Order your favorite coffee from our wide selection",
    illustration: (
      <img
        style={{ width: "249px", height: "300px" }}
        src={orderCoffeeImage}
        alt="Order Coffee"
      />
    ),
  },
  {
    title: "Sharetank",
    description: "Share your tank with your friends and family",
    illustration: (
      <img
        style={{ width: "249px", height: "300px" }}
        src={sharetankImage}
        alt="Quick Delivery"
      />
    ),
  },
  {
    title: "Compare Prices",
    description: "Compare prices of different products",
    illustration: (
      <img
        style={{ width: "249px", height: "300px" }}
        src={comparePricesImage}
        alt="Easy Payment"
      />
    ),
  },
];

const Onboarding = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const handleSkip = () => {
    // TODO: Implement skip functionality
    console.log("Skip onboarding");
  };

  const handleGetStarted = () => {
    // TODO: Implement get started functionality
    console.log("Get started");
  };

  return (
    <div className="onboarding-container">
      {currentSlide > 0 && (
        <div
          className="back-button"
          onClick={() => setCurrentSlide((prev) => prev - 1)}
        >
          ←
        </div>
      )}

      {currentSlide < slides.length - 1 && (
        <button className="skip-button" onClick={handleSkip}>
          Skip
        </button>
      )}

      <div className="slider-container">
        <div className="slide">
          <div className="illustration-container">
            {slides[currentSlide].illustration}
          </div>
          <h2 className="slide-title">{slides[currentSlide].title}</h2>
          <p className="slide-description">
            {slides[currentSlide].description}
          </p>
        </div>
      </div>

      <div className="slider-controls">
        <div className="dots">
          {slides.map((_, index) => (
            <div
              key={index}
              className={`dot ${index === currentSlide ? "active" : ""}`}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>

        {currentSlide < slides.length - 1 ? (
          <button className="next-button" onClick={nextSlide}>
            Next
          </button>
        ) : (
          <button className="get-started-button" onClick={handleGetStarted}>
            Get Started
          </button>
        )}
      </div>
    </div>
  );
};

export default Onboarding;
