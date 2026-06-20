import { Routes, Route } from 'react-router-dom'
import Home_productList from "./Pages/Home_productList";
import ProductDetail from "./Pages/ProductDetail";
import Navbar from "./components/Navbar";
import CartPage from './Pages/Cartpage';
import Checkoutpage from './Pages/Checkoutpage';
import Footer from './components/Footer';
import PrivacyPolicy from './Pages/PrivacyPolicy';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import { PrivateRoutes } from './components/PrivateRoutes';
import ContactForm from './Pages/ContactForm';

function APP(){
  return (
    <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home_productList />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<CartPage />} />
          <Route element={<PrivateRoutes />}>
              <Route path='/checkout'element={<Checkoutpage/>}/>
          </Route>
          <Route path='/privacy-policy' element={<PrivacyPolicy/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/contact' element={<ContactForm/>}/>
        </Routes>
        <Footer/>

    </div>
  );
}
export default APP;