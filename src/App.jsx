import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import "./App.css";

// Hamish
import PayByPlate, { PayByPlateWithNav } from "./pages/PayByPlate/PayByPlate";
import VehiclePreferences, {
  VehiclePreferencesWithNav,
} from "./pages/PayByPlate/VehiclePreferences";
import PriceComparison, {
  PriceComparisonWithNav,
} from "./pages/PriceComparison/PriceComparison";
import PaymentForm, {
  PaymentFormWithNav,
} from "./pages/PayByPlate/AddingCardDetails/PaymentForm";
import PaymentLoading, {
  PaymentLoadingWithNav,
} from "./pages/PayByPlate/AddingCardDetails/PaymentLoading";
import PaymentSuccess, {
  PaymentSuccessWithNav,
} from "./pages/PayByPlate/AddingCardDetails/PaymentSuccess";

// Services
import { saveVehicle } from "./services/vehicleService";

// Main branch components

import Signup from "./pages/SignUp/SignUp";
import Onboarding from "./pages/SignUp/Onboarding";
import Dashboard from "./pages/Dashboard/Dashboard";
import ShareTank from "./pages/Sharetank/ShareTank";
import PaymentDetails from "./pages/PaymentDetails/PaymentDetails";
import HowItWorks from "./pages/Sharetank/HowItWorks";
import TopUpPage from "./pages/Sharetank/TopUpPage";
import { CartFlowProvider } from "./pages/Products/Components/CartFlow";
import Orderhotdrinks from "./pages/OrderFoodHome/HotDrinks/HotDrinks";
import Ordercolddrinks from "./pages/OrderFoodHome/ColdDrinks/ColdDrinks";
import Grabfood from "./pages/OrderFoodHome/GrabFood/GrabFood";
import Vegeoptions from "./pages/OrderFoodHome/Vegetarian/Vegetarian";
import Makecombo from "./pages/OrderFoodHome/MakeCombo/MakeCombo";
import Productpage from "./pages/Products/Products";
import ShoppingCart from "./pages/ShoppingCart/ShoppingCart";
import OrderFoodHomepage from "./pages/OrderFoodHome/OrderFoodHome";
import TankActivity from "./pages/Sharetank/TankActivity";
import { useState, useEffect } from "react";

function App() {
  // State for vehicle data management
  const [vehicleData, setVehicleData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  // State from main branch
  const hasSeenOnboarding = localStorage.getItem("hasSeenOnboarding");

  // Initial loading setup
  useEffect(() => {
    // Check if we've been to the app before in this session
    const hasLoaded = sessionStorage.getItem("hasLoaded");
    if (!hasLoaded) {
      sessionStorage.setItem("hasLoaded", "true");
    }
  }, []);

  // Function to handle vehicle data saving
  const handleSaveVehicle = async (data) => {
    const result = await saveVehicle(data, isEditing);

    if (result.success) {
      // Update local state
      setVehicleData(result.data);
    }

    return result;
  };

  return (
    <Router>
      <CartFlowProvider>
        <div className="app">
          <Routes>
            {/* Main Routes */}
            <Route
              path="/"
              element={
                hasSeenOnboarding ? (
                  <Dashboard />
                ) : (
                  <Navigate to="/onboarding" />
                )
              }
            />
            <Route path="/signup" element={<Signup />} />
            <Route
              path="/onboarding"
              element={hasSeenOnboarding ? <Navigate to="/" /> : <Onboarding />}
            />
            <Route path="/dashboard" element={<Dashboard />} />

            {/* Sharetank Routes */}
            <Route path="/sharetank" element={<ShareTank />} />
            <Route path="/payment-details" element={<PaymentDetails />} />
            <Route path="/top-up" element={<TopUpPage />} />
            <Route path="/tank-activity" element={<TankActivity />} />
            <Route path="/how-it-works" element={<HowItWorks />} />

            {/* Vehicle Payment Routes */}
            <Route
              path="/price-comparison"
              element={<PriceComparisonWithNav />}
            />
            <Route
              path="/pay-by-plate"
              element={
                <PayByPlateWithNav
                  vehicleData={vehicleData}
                  setIsEditing={setIsEditing}
                />
              }
            />
            <Route
              path="/vehicle-preferences"
              element={
                <VehiclePreferencesWithNav
                  vehicleData={vehicleData}
                  isEditing={isEditing}
                  handleSaveVehicle={handleSaveVehicle}
                />
              }
            />
            <Route path="/payment" element={<PaymentFormWithNav />} />
            <Route
              path="/payment/processing"
              element={<PaymentLoadingWithNav />}
            />
            <Route
              path="/payment/success"
              element={<PaymentSuccessWithNav />}
            />

            {/* My Account Routes */}
            <Route path="/personal-info" element={<Dashboard />} />
            <Route path="/notifications" element={<Dashboard />} />
            <Route path="/loyalty" element={<Dashboard />} />
            <Route path="/ev-tag" element={<Dashboard />} />

            {/* Promotions Routes */}
            <Route path="/vouchers" element={<Dashboard />} />
            <Route path="/invite" element={<Dashboard />} />

            {/* Help & Support Routes */}
            <Route path="/find-z" element={<Dashboard />} />
            <Route path="/legal" element={<Dashboard />} />
            <Route path="/feedback" element={<Dashboard />} />
            <Route path="/contact" element={<Dashboard />} />

            {/* QR Code Route */}
            <Route path="/qr-code" element={<Dashboard />} />

            {/* Product Pages */}
            <Route path="/orderfood" element={<OrderFoodHomepage />} />
            <Route path="/orderhotdrinks" element={<Orderhotdrinks />} />
            <Route path="/ordercolddrinks" element={<Ordercolddrinks />} />
            <Route path="/grabfood" element={<Grabfood />} />
            <Route path="/vegeoptions" element={<Vegeoptions />} />
            <Route path="/makecombo" element={<Makecombo />} />
            <Route path="/productpage/:productId" element={<Productpage />} />
            <Route path="/shoppingcart" element={<ShoppingCart />} />
          </Routes>
        </div>
      </CartFlowProvider>
    </Router>
  );
}
export default App;
