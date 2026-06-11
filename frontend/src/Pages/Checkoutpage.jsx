import { useNavigate } from "react-router-dom";
import { useCard } from "../Context/CardContext";
import { useState } from "react";
import { authFetch } from "../utills/auth";

const Checkoutpage = () => {
    const BASE_URL = import.meta.env.VITE_API_BASE_URL;
    const navigate = useNavigate();
    
    // ✅ FIX: Context se 'cartItems' aur 'ClearCart' dono nikaal liye
    const { cartItems, ClearCart } = useCard();
    
    // ✅ Total Payment aur Items calculate karein
    const totalPayment = cartItems?.reduce((total, item) => total + item.price * item.quantity, 0) || 0;
    const totalItems = cartItems?.reduce((total, item) => total + item.quantity, 0) || 0;

    const [Form, SetForm] = useState({
        name: "",
        phone: "",
        address: "",
        payment_method: "COD",
    });
    
    const [loading, Setloading] = useState(false);
    const [message, Setmessage] = useState({ text: null, type: null });

    const handleChange = (e) => {
        SetForm({
            ...Form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Safety Check: Agar cart khali hai toh order place na ho
        if (cartItems.length === 0) {
            Setmessage({ text: "Your cart is empty!", type: "error" });
            return;
        }

        Setloading(true);
        Setmessage({ text: "", type: "" });
        
        // Backend ko bhejte waqt aap total_amount aur items bhi bhej sakte hain agar aapka Django view accept karta hai
        const orderData = {
            ...Form,
            total_amount: totalPayment,
            items: cartItems 
        };
        
        try {
            const res = await authFetch(`${BASE_URL}/api/create-order/`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(orderData) // Poora data backend ko bhej diya
            });
            
            const data = await res.json();
            
            if (res.ok) {
                Setmessage({ text: "🎉 Your order has been successfully placed!", type: "success" });
                ClearCart();
                setTimeout(() => {
                    navigate('/');
                }, 2500);
            } else {
                Setmessage({ text: data.error || "Failed to place order. Please try again.", type: "error" });
            }
        } catch (error) {
            Setmessage({ text: 'Server error occurred. Please try again later.', type: "error" });
        } finally {
            Setloading(false);
        }
    };
    
    return (
        <div className="pt-24 min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-4 md:p-8 flex flex-col justify-center items-center">
            
            {/* Header section */}
            <div className="text-center mb-8">
                <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 pb-2">
                    Checkout
                </h1>
                <div className="h-1 w-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mx-auto mt-2"></div>
            </div>
          
            <div className="w-full max-w-lg space-y-6">
                
                {/* 💳 KHOOBSURAT ORDER SUMMARY CARD */}
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-6 text-white shadow-xl">
                    <h2 className="text-lg font-semibold opacity-90 mb-4 border-b border-white/20 pb-2">Order Summary</h2>
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-sm opacity-80">Total Items:</span>
                        <span className="font-medium text-lg">{totalItems}</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-base font-medium opacity-90">Total Payable Amount:</span>
                        <span className="text-2xl font-bold">${totalPayment.toFixed(2)}</span>
                    </div>
                </div>

                {/* Shipping Form Card */}
                <div className="bg-white p-6 md:p-10 rounded-2xl shadow-xl border border-gray-100">
                    <h2 className="text-xl font-semibold text-gray-700 mb-6 border-b pb-3">Shipping Information</h2>
                    
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-1">Full Name</label>
                            <input 
                                type="text" 
                                name="name" 
                                value={Form.name} 
                                placeholder="John Doe" 
                                onChange={handleChange} 
                                required
                                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-1">Phone Number</label>
                            <input 
                                type="tel" 
                                name="phone" 
                                value={Form.phone} 
                                placeholder="03XXXXXXXXX" 
                                onChange={handleChange} 
                                required
                                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-1">Shipping Address</label>
                            <textarea  
                                name="address" 
                                value={Form.address} 
                                placeholder="House #, Street, Area, City" 
                                onChange={handleChange} 
                                required
                                rows="3"
                                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-1">Payment Method</label>
                            <select 
                                name="payment_method"
                                value={Form.payment_method}
                                onChange={handleChange}
                                required
                                className="w-full border border-gray-300 bg-white rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all cursor-pointer"
                            >
                                <option value="COD">💵 Cash on Delivery (COD)</option>
                                <option value="Card Payment">💳 Pay via Card</option>
                            </select>
                        </div>

                        <button 
                            type="submit"
                            disabled={loading}
                            className={`w-full mt-4 font-semibold py-3 px-4 rounded-xl text-white shadow-md transition-all duration-300 transform active:scale-98 flex justify-center items-center gap-2
                                ${loading 
                                    ? 'bg-gray-400 cursor-not-allowed' 
                                    : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 hover:shadow-lg cursor-pointer'
                                }`}
                        >
                            {loading ? (
                                <>
                                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Processing Order...
                                </>
                            ) : `Pay & Place Order ($${totalPayment.toFixed(2)})`}
                        </button>

                        {message.text && (
                            <div className={`p-3 rounded-xl text-center font-medium mt-4 text-sm border 
                                ${message.type === 'success' 
                                    ? 'bg-green-50 text-green-700 border-green-200' 
                                    : 'bg-red-50 text-red-700 border-red-200'}`}>
                                {message.text}
                            </div>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Checkoutpage;