import { useCard } from "../Context/CardContext";
import { Link } from "react-router-dom";

const CartPage = () => {
    // Check karein ke context mein 'UpdateQuantity' ki spelling yahi hai?
    const { cartItems, removeFromCart, UpdateQuantity } = useCard(); 

    const total = cartItems.reduce(
        (acc, item) => acc + item.price * item.quantity, 0
    );

    return (
        <div className="pt-20 min-h-screen bg-gray-50 p-8">
           <div className="flex flex-col justify-center items-center text-center mx-auto mb-12 lg:mx-10 lg:mb-12">
        
          <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-3">
            My Shopping Cart
          </h1>
          <div className="  h-1 w-34 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mt-4"></div>
        
        </div>
            
            {cartItems.length === 0 ? (
                <p className="text-lg text-center">Your cart is empty</p>
            ) : (
                <div className="max-w-7xl m-auto bg-white p-6 rounded-lg shadow-md">
                    {/* ✅ FIX: Yahan 'return' lagana zaroori hai ya phir () use karein */}
                    {cartItems.map((item) => (
                        <div key={item.id} className="flex justify-between items-center mb-4 border-b pb-4">
                            <div>
                                <h2 className="text-xl font-semibold">{item.name}</h2>
                                <p className="text-gray-600">${item.price}</p>
                            </div>
                            
                            <div className="flex items-center gap-3">
                                <button 
                                    className="cursor-pointer rounded bg-gray-200 px-3 py-1 hover:bg-gray-300"
                                    onClick={() => UpdateQuantity(item.id, item.quantity - 1)}
                                    disabled={item.quantity <= 1} // 1 se kam na ho sake
                                >
                                    -
                                </button>
                                
                                <span className="font-medium">{item.quantity}</span>
                                
                                <button 
                                    className="cursor-pointer rounded bg-gray-200 px-3 py-1 hover:bg-gray-300"
                                    onClick={() => UpdateQuantity(item.id, item.quantity + 1)}
                                >
                                    +
                                </button>
                                
                                <button 
                                    className="cursor-pointer rounded bg-red-500 text-white px-3 py-1 ml-4 hover:bg-red-600"
                                    onClick={() => removeFromCart(item.id)}
                                >
                                    Remove
                                </button>
                            </div>
                        </div>
                    ))}

                    <div className=" pt-4 mt-4 flex justify-between items-center">
                        <h2 className="text-2xl font-bold">Total Price:</h2>
                        <p className="text-2xl text-green-600 font-bold">${total.toFixed(2)}</p>
                    </div>
                    <div className="flex justify-end my-4">
                        <Link to ="/checkout">
                        <button className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300 transform hover:active:scale-95 shadow-md hover:shadow-lg">Proceed to Checkout</button>
                        </Link>
                    </div>
                </div>
                
            )}
        </div>
    );
};

export default CartPage;