import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Onboarding from "./components/Onboarding";
import "./App.css";

function App() {
  // Check if user has seen onboarding (you might want to store this in localStorage)
  const hasSeenOnboarding = localStorage.getItem("hasSeenOnboarding");

  return (
    <Router>
      <div className="app">
        <Routes>
          <Route
            path="/"
            element={
              hasSeenOnboarding ? <Login /> : <Navigate to="/onboarding" />
            }
          />
          <Route
            path="/login"
            element={
              hasSeenOnboarding ? <Login /> : <Navigate to="/onboarding" />
            }
          />
          <Route
            path="/signup"
            element={
              hasSeenOnboarding ? <Signup /> : <Navigate to="/onboarding" />
            }
          />
          <Route path="/onboarding" element={<Onboarding />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
