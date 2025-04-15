import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Signup from "./pages/SignUp/SignUp";
import Onboarding from "./pages/SignUp/Onboarding";
import Dashboard from "./pages/Dashboard/Dashboard";
import ShareTank from "./pages/Sharetank/ShareTank";
import PaymentDetails from "./pages/PaymentDetails/PaymentDetails";
import HowItWorks from "./pages/Sharetank/HowItWorks";
import TopUpPage from "./pages/Sharetank/TopUpPage";
// import { CartProvider } from "./pages/ProductSelection/CartContext";
// import { CartProvider } from "./pages/ProductSelection/CartContext"; // Don't delete
import Orderhotdrinks from "./pages/ProductSelection/OrderHotDrinksPage";
import Ordercolddrinks from "./pages/ProductSelection/OrderColdDrinksPage";
import Grabfood from "./pages/ProductSelection/GrabFoodPage";
import Vegeoptions from "./pages/ProductSelection/VegeOptionsPage";
import Makecombo from "./pages/ProductSelection/MakeComboPage";
import Productpage from "./pages/ProductSelection/ProductPage";
import ShoppingCart from "./pages/ProductSelection/ShoppingCartPage";
import OrderFoodHomepage from "./pages/ProductSelection/OrderFoodHomePage";
import TankActivity from "./pages/Sharetank/TankActivity";
import "./App.css";

function App() {
      // Check if user has seen onboarding
      const hasSeenOnboarding = localStorage.getItem("hasSeenOnboarding");

      return (
            <Router>
                  <div className="app">
                        <Routes>
                              {/* Main Routes */}
                              <Route
                                    path="/"
                                    element={hasSeenOnboarding ? <Dashboard /> : <Navigate to="/onboarding" />}
                              />
                              <Route path="/signup" element={<Signup />} />
                              <Route
                                    path="/onboarding"
                                    element={hasSeenOnboarding ? <Navigate to="/" /> : <Onboarding />}
                              />
                              <Route path="/dashboard" element={<Dashboard />} />
                              <Route path="/sharetank" element={<ShareTank />} />
                              <Route path="/payment-details" element={<PaymentDetails />} />
                              <Route path="/top-up" element={<TopUpPage />} />

                              {/* My Account Routes */}
                              <Route path="/personal-info" element={<Dashboard />} />
                              <Route path="/notifications" element={<Dashboard />} />
                              <Route path="/loyalty" element={<Dashboard />} />
                              <Route path="/activity" element={<Dashboard />} />
                              <Route path="/ev-tag" element={<Dashboard />} />
                              {/* My Account Routes */}
                              <Route path="/personal-info" element={<Dashboard />} />
                              <Route path="/notifications" element={<Dashboard />} />
                              <Route path="/loyalty" element={<Dashboard />} />
                              <Route path="/tank-activity" element={<TankActivity />} />
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

                              {/* How It Works Route */}
                              <Route path="/how-it-works" element={<HowItWorks />} />

                              {/* Puduct Pages */}
                              <Route path="/" element={<Onboarding />} />
                              <Route path="/orderfood" element={<OrderFoodHomepage />} />
                              <Route path="/orderhotdrinks" element={<Orderhotdrinks />} />
                              <Route path="/ordercolddrinks" element={<Ordercolddrinks />} />
                              <Route path="/grabfood" element={<Grabfood />} />
                              <Route path="/vegeoptions" element={<Vegeoptions />} />
                              <Route path="/makecombo" element={<Makecombo />} />
                              <Route path="/shoppingcart" element={<ShoppingCart />} />
                              <Route path="/productpage/:productId" element={<Productpage />} />
                        </Routes>
                  </div>
            </Router>
      );
}
export default App;
