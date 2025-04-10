import { useState } from "react";
import "./App.css";
import PayByPlate from "./components/PayByPlate";
import VehiclePreferences from "./components/VehiclePreferences";
import PriceComparison from "./components/PriceComparison";

function App() {
  const [currentView, setCurrentView] = useState("priceComparison");
  const [vehicleData, setVehicleData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

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

  return (
    <div className="app">
      {currentView === "payByPlate" ? (
        <PayByPlate
          onAddVehicle={handleAddVehicle}
          onEditVehicle={handleEditVehicle}
          vehicleData={vehicleData}
          onNavigateToPriceComparison={handleNavigateToPriceComparison}
        />
      ) : currentView === "vehiclePreferences" ? (
        <VehiclePreferences
          onBackClick={handleBackToPayByPlate}
          onSave={handleSaveVehicle}
          existingVehicle={isEditing ? vehicleData : null}
          isEditing={isEditing}
        />
      ) : (
        <PriceComparison onNavigateToPayByPlate={handleNavigateToPayByPlate} />
      )}
    </div>
  );
}

export default App;
