import { useCard } from "../Context/CardContext";
import { Link, useNavigate } from "react-router-dom"; 
import { BsCart3 } from "react-icons/bs";
import { getAcessToken, cleartoken } from "../utills/auth";
import Login from "../Pages/Login";
import Home_productList from "../Pages/Home_productList";

const Navbar = () => {
    const { cartItems } = useCard(); 
    const navigate = useNavigate();
    
    // 1. Check if user is logged in
    const IsLoggedin = !!getAcessToken();
    const username = getAcessToken('username')


    // 2. Fetch username from localStorage safely
    // (Ensure you save the username as 'username' in your Login component when authentication succeeds)
   

    const handleLogout = () => {
         cleartoken();
         navigate("/login"); 
    };
    
    const cartCount = cartItems?.reduce((total, item) => total + item.quantity, 0) || 0;
    
    return (
        <nav className="bg-gray-800 p-4 flex justify-between items-center shadow-md">
            {/* Logo */}
            <Link to="/" className="text-white text-lg font-bold hover:text-gray-300 transition-colors">
                E-Commerce
            </Link>

             <div className="flex items-center gap-6">
                <Link to="/" className="text-white text-lg font-bold hover:text-gray-300 transition-colors">
                Home
            </Link>
                <a href="#shop" className="text-white text-lg font-bold hover:text-gray-300 transition-colors">
                Product
            </a>
                <Link to="/contact" className="text-white text-lg font-bold hover:text-gray-300 transition-colors">
                Contact us
            </Link>
                </div>
            
            {/* Navigation Controls */}
            <div className="flex items-center gap-6"> 
                
                {/* Auth Links & Welcome Message */}
                <div className="flex items-center gap-4">
                    {!IsLoggedin ? (
                        <>
                            <Link to="/login" className="text-white text-md font-medium hover:text-gray-300 transition-colors">Login</Link>
                            <Link to="/signup" className="text-white text-md font-medium hover:text-gray-300 transition-colors">Signup</Link>
                        </>
                    ) : (
                        <>
                            {/* ✅ Logged in user ka name yahan show hoga */}
                            {/* <span className="text-gray-300 text-md font-semibold bg-gray-700 px-3 py-1 rounded-lg">
                                Hello, <span className="text-blue-400 capitalize"></span>
                            </span> */}
                            <button onClick={handleLogout} className="text-white text-md font-medium hover:text-red-400 cursor-pointer transition-colors">
                                Logout
                            </button>
                        </>
                    )}
                </div>

                {/* Cart Icon */}
                <div className="flex items-center">
                    <Link to="/cart" className="text-white relative hover:text-gray-300 transition-colors">
                        <div className="flex items-center gap-1">
                            <BsCart3 className="text-xl" /> 
                            <span className="font-medium">Cart</span>
                        </div>
                        {cartCount > 0 && (
                            <span className="absolute -top-2 -right-3 bg-red-600 text-white text-xs font-bold rounded-full h-5 w-5 flex justify-center items-center">
                                {cartCount}
                            </span>
                        )}
                    </Link> 
                </div>
            </div>
        </nav>   
    );
};       

export default Navbar;