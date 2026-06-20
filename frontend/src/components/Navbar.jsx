import { useState } from "react";
import { useCard } from "../Context/CardContext";
import { Link, useNavigate } from "react-router-dom"; 
import { BsCart3 } from "react-icons/bs";
import { FiMenu, FiX } from "react-icons/fi"; // Added for responsive hamburger menu
import { getAcessToken, cleartoken } from "../utills/auth";

const Navbar = () => {
    const { cartItems } = useCard(); 
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false); // State to handle mobile menu visibility
    
    // Check if user is logged in
    const IsLoggedin = !!getAcessToken();
    const username = getAcessToken('username'); // Assumes this returns a string value

    const handleLogout = () => {
         cleartoken();
         setIsOpen(false);
         navigate("/login"); 
    };
    
    const cartCount = cartItems?.reduce((total, item) => total + item.quantity, 0) || 0;

    
    
    return (
        <nav className="bg-gray-800 p-4 shadow-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                {/* Logo */}
                <Link to="/" className="text-white text-xl font-bold hover:text-gray-300 transition-colors">
                    E-Commerce
                </Link>

                {/* Desktop Navigation Links (Hidden on Mobile) */}
                <div className="hidden md:flex items-center gap-6">
                    <Link to="/" className="text-white text-md font-medium hover:text-gray-300 transition-colors">
                        Home
                    </Link>
                    <a href="#shop" className="text-white text-md font-medium hover:text-gray-300 transition-colors">
                        Product
                    </a>
                    <Link to="/contact" className="text-white text-md font-medium hover:text-gray-300 transition-colors">
                        Contact us
                    </Link>
                </div>
                
                {/* Desktop Navigation Controls & Cart */}
                <div className="hidden md:flex items-center gap-6"> 
                    {/* Auth Links & Welcome Message */}
                    <div className="flex items-center gap-4">
                        {!IsLoggedin ? (
                            <>
                                <Link to="/login" className="text-white text-md font-medium hover:text-gray-300 transition-colors">Login</Link>
                                <Link to="/signup" className="text-white text-md font-medium hover:text-gray-300 transition-colors">Signup</Link>
                            </>
                        ) : (
                            <>
                                
                                <button onClick={handleLogout} className="text-white text-md font-medium hover:text-red-400 cursor-pointer transition-colors">
                                    Logout
                                </button>
                            </>
                        )}
                    </div>

                    {/* Cart Icon */}
                    <div className="flex items-center">
                        <Link to="/cart" className="text-white relative hover:text-gray-300 transition-colors">
                            <BsCart3 className="text-xl" /> 
                            {cartCount > 0 && (
                                <span className="absolute -top-2 -right-3 bg-red-600 text-white text-xs font-bold rounded-full h-5 w-5 flex justify-center items-center">
                                    {cartCount}
                                </span>
                            )}
                        </Link> 
                    </div>
                </div>

                {/* Mobile Icons Header Row (Cart & Hamburger) */}
                <div className="flex items-center gap-4 md:hidden">
                    {/* Cart Icon on Mobile */}
                    <Link to="/cart" className="text-white relative hover:text-gray-300 transition-colors mr-2">
                        <BsCart3 className="text-xl" /> 
                        {cartCount > 0 && (
                            <span className="absolute -top-2 -right-3 bg-red-600 text-white text-xs font-bold rounded-full h-5 w-5 flex justify-center items-center">
                                {cartCount}
                            </span>
                        )}
                    </Link> 

                    {/* Hamburger Button */}
                    <button 
                        onClick={() => setIsOpen(!isOpen)} 
                        className="text-white text-2xl focus:outline-none cursor-pointer "
                    >
                        {isOpen ? <FiX /> : <FiMenu />}
                    </button>
                </div>
            </div>

            {/* Mobile Dropdown Menu */}
            {isOpen && (
                <div className="md:hidden   mt-4 pt-4 border-t border-gray-700 flex flex-col gap-4 pb-2 animate-fadeIn">
                    <Link to="/" onClick={() => setIsOpen(false)} className="text-white text-md font-medium hover:text-gray-300 transition-colors">
                        Home
                    </Link>
                    <a href="#shop" onClick={() => setIsOpen(false)} className="text-white text-md font-medium hover:text-gray-300 transition-colors">
                        Product
                    </a>
                    <Link to="/contact" onClick={() => setIsOpen(false)} className="text-white text-md font-medium hover:text-gray-300 transition-colors">
                        Contact us
                    </Link>
                    
                    <hr className="border-gray-700 my-1" />

                    {/* Auth Status Mobile */}
                    {!IsLoggedin ? (
                        <div className="flex flex-col gap-4">
                            <Link to="/login" onClick={() => setIsOpen(false)} className="text-white text-md font-medium hover:text-gray-300 transition-colors">Login</Link>
                            <Link to="/signup" onClick={() => setIsOpen(false)} className="text-white text-md font-medium hover:text-gray-300 transition-colors">Signup</Link>
                        </div>
                    ) : (
                        <div className="flex flex-col gap-4 items-start">
                            
                            <button onClick={handleLogout} className="text-white text-md font-medium hover:text-red-400 text-left transition-colors">
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            )}
        </nav>   
    );
};   

export default Navbar;