import { useState } from "react";
import { useNavigate } from "react-router-dom";
import orderCoffeeImg from "../assets/onboarding_img/order_coffee.png";
import comparePriceImg from "../assets/onboarding_img/compare_price.png";
import shareTankImg from "../assets/onboarding_img/sharetank.png";
import styles from "./Onboarding.module.css";

const Onboarding = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  const slides = [
    {
      title: "Order Your Coffee",
      description:
        "Browse our menu and order your favorite coffee with just a few taps.",
      image: orderCoffeeImg,
    },
    {
      title: "Quick Delivery",
      description: "Get your coffee delivered to your location in minutes.",
      image: comparePriceImg,
    },
    {
      title: "Easy Payment",
      description: "Pay securely with your preferred payment method.",
      image: shareTankImg,
    },
  ];

  const handleNext = () => {
    if (currentSlide === slides.length - 1) {
      // If on last slide, handle Get Started click
      localStorage.setItem("hasSeenOnboarding", "true");
      navigate("/signup");
    } else {
      // Otherwise, go to next slide
      setCurrentSlide(currentSlide + 1);
    }
  };

  const handleSkip = () => {
    localStorage.setItem("hasSeenOnboarding", "true");
    navigate("/signup");
  };

  const handleBack = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const handleFinish = () => {
    localStorage.setItem("hasSeenOnboarding", "true");
    navigate("/signup");
  };

  return (
    <div className={styles.container}>
      {currentSlide > 0 && (
        <button className={styles.backButton} onClick={handleBack}>
          Back
        </button>
      )}
      {currentSlide < slides.length - 1 && (
        <button className={styles.skipButton} onClick={handleSkip}>
          Skip
        </button>
      )}
      <div className={styles.sliderContainer}>
        <div
          className={styles.slide}
          style={{ transform: `translateX(-${currentSlide * 33}%)` }}
        >
          {slides.map((slide, index) => (
            <div key={index} className={styles.slideContent}>
              <div className={styles.illustrationContainer}>
                <img
                  src={slide.image}
                  alt={slide.title}
                  className={styles.illustration}
                />
              </div>
              <h2 className={styles.slideTitle}>{slide.title}</h2>
              <p className={styles.slideDescription}>{slide.description}</p>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.sliderControls}>
        <div className={styles.dots}>
          {slides.map((_, index) => (
            <button
              key={index}
              className={`${styles.dot} ${
                index === currentSlide ? styles.active : ""
              }`}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>
        <button className={styles.nextButton} onClick={handleNext}>
          {currentSlide === slides.length - 1 ? "Get Started" : "Next"}
        </button>
      </div>
    </div>
  );
};

export default Onboarding;
