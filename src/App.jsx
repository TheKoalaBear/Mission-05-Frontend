import { useState } from "react";
import "./App.css";
import PayByPlate from "./components/PayByPlate";
import VehiclePreferences from "./components/VehiclePreferences";
import PriceComparison from "./components/PriceComparison";
import PaymentLoading from "./components/PaymentLoading";
import PaymentForm from "./components/PaymentForm";
import PaymentSuccess from "./components/PaymentSuccess";

function App() {
  const [currentView, setCurrentView] = useState("priceComparison");
  const [vehicleData, setVehicleData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [paymentView, setPaymentView] = useState(null); // null, "loading", "form", "success"

  const handleAddVehicle = () => {
    setIsEditing(false);
    setCurrentView("vehiclePreferences");
  };

  const handleEditVehicle = () => {
    setIsEditing(true);
    setCurrentView("vehiclePreferences");
  };

  const handleBackToPayByPlate = () => {
    setCurrentView("payByPlate");
  };

  const handleSaveVehicle = (data) => {
    setVehicleData(data);
    setCurrentView("payByPlate");
    console.log(`Vehicle ${isEditing ? "updated" : "saved"}:`, data);
  };

  const handleNavigateToPayByPlate = () => {
    setCurrentView("payByPlate");
  };

  const handleNavigateToPriceComparison = () => {
    setCurrentView("priceComparison");
  };

  // Payment flow navigation
  const handleStartPaymentFlow = () => {
    setPaymentView("loading");
  };

  const handlePaymentFormLoad = () => {
    setPaymentView("form");
  };

  const handlePaymentSubmit = (formData) => {
    console.log("Payment submitted:", formData);
    setPaymentView("success");
  };

  const handleReturnToMainApp = () => {
    setPaymentView(null);
  };

  // If we're in the payment flow, show the appropriate payment screen
  if (paymentView === "loading") {
    return (
      <div className="app">
        <PaymentLoading onLoadComplete={handlePaymentFormLoad} />
      </div>
    );
  }

  if (paymentView === "form") {
    return (
      <div className="app">
        <PaymentForm onPaymentSubmit={handlePaymentSubmit} onBackClick={handleReturnToMainApp} />
      </div>
    );
  }

  if (paymentView === "success") {
    return (
      <div className="app">
        <PaymentSuccess onGoHome={handleReturnToMainApp} />
      </div>
    );
  }

  // Original view-based navigation
  if (currentView === "payByPlate") {
    return (
      <div className="app">
        <PayByPlate
          onAddVehicle={handleAddVehicle}
          onEditVehicle={handleEditVehicle}
          vehicleData={vehicleData}
          onNavigateToPriceComparison={handleNavigateToPriceComparison}
        />
      </div>
    );
  } else if (currentView === "vehiclePreferences") {
    return (
      <div className="app">
        <VehiclePreferences
          onBackClick={handleBackToPayByPlate}
          onSave={handleSaveVehicle}
          existingVehicle={isEditing ? vehicleData : null}
          isEditing={isEditing}
          onAddPayment={handleStartPaymentFlow}
        />
      </div>
    );
  } else {
    return (
      <div className="app">
        <PriceComparison onNavigateToPayByPlate={handleNavigateToPayByPlate} />
      </div>
    );
  }
}

export default App;
