import { BrowserRouter, Routes, Route } from "react-router-dom";
import Orderfoodhomepage from "./pages/Orderfoodhomepage/Orderfoodhomepage";
import Onboarding from "./components/Onboarding";
import Orderhotdrinks from "./pages/Orderhotdrinks/Orderhotdrinks";
import Ordercolddrinks from "./pages/Ordercolddrinks/Ordercolddrinks";
import Grabfood from "./pages/Grabfood/Grabfood";
import Vegeoptions from "./pages/Vegeoptions/Vegeoptions";
import Makecombo from "./pages/Makecombo/Makecombo";

function Router() {
      return (
            <BrowserRouter>
                  <Routes>
                        <Route path="/" element={<Onboarding />} />
                        <Route path="/orderfood" element={<Orderfoodhomepage />} />
                        <Route path="/orderhotdrinks" element={<Orderhotdrinks />} />
                        <Route path="/ordercolddrinks" element={<Ordercolddrinks />} />
                        <Route path="/grabfood" element={<Grabfood />} />
                        <Route path="/vegeoptions" element={<Vegeoptions />} />
                        <Route path="/makecombo" element={<Makecombo />} />
                  </Routes>
            </BrowserRouter>
      );
}
export default Router;
