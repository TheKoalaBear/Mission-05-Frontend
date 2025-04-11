import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import "./App.css";
import PayByPlate from "./components/PayByPlate";
import VehiclePreferences from "./components/VehiclePreferences";
import PriceComparison from "./components/PriceComparison";
import Onboarding from "./components/Onboarding";
import PaymentForm from "./components/PaymentForm";
import PaymentLoading from "./components/PaymentLoading";
import PaymentSuccess from "./components/PaymentSuccess";
import { useState, useEffect } from "react";

// Default redirect component - ensures we start at PriceComparison
const DefaultRedirect = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Force navigation to price comparison on initial load
    navigate("/price-comparison", { replace: true });
  }, [navigate]);

  return null;
};

// PriceComparison wrapper to handle navigation
const PriceComparisonWithNav = () => {
  const navigate = useNavigate();

  const handleNavigateToPayByPlate = () => {
    navigate("/pay-by-plate");
  };

  return <PriceComparison onNavigateToPayByPlate={handleNavigateToPayByPlate} />;
};

// PayByPlate wrapper to handle navigation
const PayByPlateWithNav = ({ vehicleData, setIsEditing }) => {
  const navigate = useNavigate();

  const handleBackButton = () => {
    navigate("/price-comparison");
  };

  return (
    <PayByPlate
      vehicleData={vehicleData}
      onAddVehicle={() => {
        setIsEditing(false);
        navigate("/vehicle-preferences");
      }}
      onEditVehicle={() => {
        setIsEditing(true);
        navigate("/vehicle-preferences");
      }}
      onNavigateToPriceComparison={() => navigate("/price-comparison")}
      onBackClick={handleBackButton}
    />
  );
};

// VehiclePreferences wrapper to handle navigation
const VehiclePreferencesWithNav = ({ vehicleData, setVehicleData, isEditing }) => {
  const navigate = useNavigate();
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState(null);

  const handleSave = async (data) => {
    try {
      setIsSaving(true);
      setError(null);

      // Send data to backend API
      const response = await fetch("http://localhost:5000/api/vehicles", {
        method: isEditing ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to save vehicle data");
      }

      const savedVehicle = await response.json();

      // Update local state
      setVehicleData(savedVehicle);

      // Log and navigate
      console.log(`Vehicle ${isEditing ? "updated" : "saved"}:`, savedVehicle);
      navigate("/pay-by-plate");
    } catch (err) {
      console.error("Failed to save vehicle data:", err);
      setError("Failed to save vehicle data. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <VehiclePreferences
      onBackClick={() => navigate("/pay-by-plate")}
      onSave={handleSave}
      existingVehicle={isEditing ? vehicleData : null}
      isEditing={isEditing}
      onAddPayment={() => navigate("/payment/processing")}
      isSaving={isSaving}
      error={error}
    />
  );
};

// PaymentForm wrapper to handle navigation
const PaymentFormWithNav = () => {
  const navigate = useNavigate();

  return (
    <PaymentForm
      onBackClick={() => navigate("/vehicle-preferences")}
      onPaymentSubmit={(formData) => {
        console.log("Payment submitted:", formData);
        navigate("/payment/success");
      }}
    />
  );
};

// PaymentLoading wrapper to handle navigation
const PaymentLoadingWithNav = () => {
  const navigate = useNavigate();

  return (
    <PaymentLoading
      onLoadComplete={() => {
        navigate("/payment");
      }}
    />
  );
};

// PaymentSuccess wrapper to handle navigation
const PaymentSuccessWithNav = () => {
  const navigate = useNavigate();

  return (
    <PaymentSuccess
      onGoHome={() => {
        navigate("/vehicle-preferences");
      }}
    />
  );
};

function App() {
  const [vehicleData, setVehicleData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  // To ensure proper initial loading, we'll use localStorage to remember visited paths
  useEffect(() => {
    // On first load, force to price comparison screen
    const hasLoaded = sessionStorage.getItem("hasLoaded");
    if (!hasLoaded) {
      sessionStorage.setItem("hasLoaded", "true");
      // Delay to ensure proper routing
      setTimeout(() => {
        window.location.href = "/price-comparison";
      }, 0);
    }
  }, []);

  return (
    <Router>
      <div className="app">
        <Routes>
          {/* Root redirects to price-comparison */}
          <Route path="/" element={<DefaultRedirect />} />

          {/* Main Routes */}
          <Route path="/price-comparison" element={<PriceComparisonWithNav />} />
          <Route
            path="/pay-by-plate"
            element={<PayByPlateWithNav vehicleData={vehicleData} setIsEditing={setIsEditing} />}
          />
          <Route
            path="/vehicle-preferences"
            element={
              <VehiclePreferencesWithNav
                vehicleData={vehicleData}
                setVehicleData={setVehicleData}
                isEditing={isEditing}
              />
            }
          />
          <Route path="/onboarding" element={<Onboarding />} />

          {/* Payment Routes */}
          <Route path="/payment" element={<PaymentFormWithNav />} />
          <Route path="/payment/processing" element={<PaymentLoadingWithNav />} />
          <Route path="/payment/success" element={<PaymentSuccessWithNav />} />

          {/* Redirect any unknown routes to price comparison */}
          <Route path="*" element={<Navigate to="/price-comparison" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
