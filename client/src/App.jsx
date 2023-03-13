import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import GeneralPageLayout from "./components/PageLayout/GeneralPageLayout";

import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import ShoppingCart from "./pages/ShoppingCart";
import OrderHistory from "./pages/OrderHistory";
import Products from "./pages/Products";
import ProductSearch from "./pages/ProductSearch";
import Checkout from "./pages/Checkout";
import OrderConfirmation from "./pages/OrderConfirmation";
import NotFound from "./pages/NotFound";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<GeneralPageLayout showNavBar />}>
          <Route index element={<Home />} />
          <Route path="/products/:productId" element={<ProductDetails />} />
          <Route path="/cart" element={<ShoppingCart />} />
          <Route path="/orders" element={<OrderHistory />} />
        </Route>

        <Route path="/" element={<GeneralPageLayout showNavBar showSideBar />}>
          <Route path="/products" element={<Products />} />
          <Route path="/search" element={<ProductSearch />} />
        </Route>

        <Route path="/checkout" element={<Checkout />} />
        <Route path="/confirmation/:orderId" element={<OrderConfirmation />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};
export default App;
