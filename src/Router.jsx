import { BrowserRouter, Routes, Route } from "react-router-dom";
import Orderfoodhomepage from "./pages/Orderfoodhomepage/Orderfoodhomepage";
import Onboarding from "./components/Onboarding";

function Router() {
      return (
            <BrowserRouter>
                  <Routes>
                        <Route path="/" element={<Onboarding />} />
                        <Route path="/orderfood" element={<Orderfoodhomepage />} />
                  </Routes>
            </BrowserRouter>
      );
}
export default Router;
