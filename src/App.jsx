import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Signup from "./components/Signup";
import Onboarding from "./components/Onboarding";
import Dashboard from "./components/Dashboard";
import ShareTank from "./components/ShareTank";
import PaymentDetails from "./components/PaymentDetails";
import HowItWorks from "./components/HowItWorks";
import TopUpPage from "./components/TopUpPage";
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
            element={
              hasSeenOnboarding ? <Dashboard /> : <Navigate to="/onboarding" />
            }
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
        </Routes>
      </div>
    </Router>
  );
}

export default App;
