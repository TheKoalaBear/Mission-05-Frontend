import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./pages/ProductSelection/CartContext";
import Onboarding from "./components/Onboarding";
import Orderhotdrinks from "./pages/ProductSelection/OrderHotDrinks";
import Ordercolddrinks from "./pages/ProductSelection/OrderColdDrinks";
import Grabfood from "./pages/ProductSelection/GrabFood";
import Vegeoptions from "./pages/ProductSelection/VegeOptions";
import Makecombo from "./pages/ProductSelection/MakeCombo";
import Productpage from "./pages/ProductSelection/ProductPage";
import OrderFoodHomepage from "./pages/ProductSelection/OrderFoodHomePage";

function Router() {
      return (
            <CartProvider>
                  <BrowserRouter>
                        <Routes>
                              <Route path="/" element={<Onboarding />} />
                              <Route path="/orderfood" element={<OrderFoodHomepage />} />
                              <Route path="/orderhotdrinks" element={<Orderhotdrinks />} />
                              <Route path="/ordercolddrinks" element={<Ordercolddrinks />} />
                              <Route path="/grabfood" element={<Grabfood />} />
                              <Route path="/vegeoptions" element={<Vegeoptions />} />
                              <Route path="/makecombo" element={<Makecombo />} />
                              <Route path="/productpage/:productId" element={<Productpage />} />
                        </Routes>
                  </BrowserRouter>
            </CartProvider>
      );
}
export default Router;
