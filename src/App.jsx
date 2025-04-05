import "./App.css";
import { useState, useEffect } from "react";
import Onboarding from "./components/Onboarding";
import Signup from "./components/Signup";
import zLogo from "./assets/Z_Energy_logo.png";

function App() {
  const [loading, setLoading] = useState(true);
  const [showOnboarding, setShowOnboarding] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);

  const handleOnboardingComplete = () => {
    setShowOnboarding(false);
  };

  if (loading) {
    return (
      <div className="app loading-app">
        <div className="wave-bg"></div>
        <div className="loading-container">
          <div className="logo-container">
            <img src={zLogo} alt="Z Energy Logo" className="z-logo" />
          </div>
          <div className="loading-progress">
            
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      {showOnboarding ? (
        <Onboarding onComplete={handleOnboardingComplete} />
      ) : (
        <Signup />
      )}
    </div>
  );
}

export default App;
