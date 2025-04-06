import { BrowserRouter, Routes, Route } from "react-router-dom";
import Onboarding from "./components/Onboarding";
import Orderhotdrinks from "./pages/orderHotDrinksPage/OrderHotDrinks";
import Ordercolddrinks from "./pages/orderColdDrinksPage/OrderColdDrinks";
import Grabfood from "./pages/grabFoodPage/GrabFood";
import Vegeoptions from "./pages/vegeOptions/VegeOptions";
import Makecombo from "./pages/makeComboPage/MakeCombo";
import OrderFoodHomepage from "./pages/orderFoodHomePage/OrderFoodHomePage";

function Router() {
      return (
            <BrowserRouter>
                  <Routes>
                        <Route path="/" element={<Onboarding />} />
                        <Route path="/orderfood" element={<OrderFoodHomepage />} />
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
