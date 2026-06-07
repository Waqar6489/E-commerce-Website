import { Routes, Route } from 'react-router-dom'
import Home_productList from "./Pages/Home_productList";
import ProductDetail from "./Pages/ProductDetail";
import Navbar from "./components/Navbar";
import CartPage from './Pages/Cartpage';
function APP(){
  return (
    <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home_productList />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<CartPage />} />
      </Routes>
    </div>
  );
}
export default APP;