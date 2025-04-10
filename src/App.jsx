import { useState } from "react";
import "./App.css";
import PayByPlate from "./components/PayByPlate";
import VehiclePreferences from "./components/VehiclePreferences";

function App() {
  const [currentView, setCurrentView] = useState("payByPlate");
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

  return (
    <div className="app">
      {currentView === "payByPlate" ? (
        <PayByPlate
          onAddVehicle={handleAddVehicle}
          onEditVehicle={handleEditVehicle}
          vehicleData={vehicleData}
        />
      ) : (
        <VehiclePreferences
          onBackClick={handleBackToPayByPlate}
          onSave={handleSaveVehicle}
          existingVehicle={isEditing ? vehicleData : null}
          isEditing={isEditing}
        />
      )}
    </div>
  );
}

export default App;
