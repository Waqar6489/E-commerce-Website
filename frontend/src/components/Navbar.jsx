import { useCard } from "../Context/CardContext";
import { Link } from "react-router-dom";

const Navbar = () => {
    // ✅ FIX: 'cardItems' ko badal kar 'cartItems' kiya
    const { cartItems } = useCard(); 
    
    // ✅ FIX: Yahan bhi 'cartItems' use hoga
    const cartCount = cartItems?.reduce((total, item) => total + item.quantity, 0) || 0;
    
    return (
        <nav className="bg-gray-800 p-4 flex justify-between items-center">
            <Link to="/" className="text-white text-lg font-bold">E-Commerce</Link>
            <div className="flex items-center">
                <Link to="/cart" className="text-white relative hover:text-gray-50">
                    🛒 Cart
                    {cartCount > 0 && (
                        <span className="absolute -top-2 -right-3 bg-red-600 text-white text-md rounded-full h-5 w-5 flex justify-center items-center">
                            {cartCount}
                        </span>
                    )}
                </Link> 
            </div>
        </nav>   
    );
};       

export default Navbar;