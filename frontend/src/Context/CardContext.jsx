import {createContext, useContext, useState} from  'react';

const CardContext = createContext();
export const CardProvider = ({children}) => {
    const [cartItems, setCartItems] = useState([]);
    
    

    // Add to product to cart

    const addToCart = (product) => {
        const existing = cartItems.find(item => item.id === product.id);
        if(existing){
            setCartItems(cartItems.map(item => 
                item.id === product.id ? 
                {...item, quantity: item.quantity + 1} 
                : item));
        } else {
            setCartItems([...cartItems, {...product, quantity: 1}]);
        }
    };

    // Remove from cart

    const removeFromCart = (id) => {
        setCartItems(cartItems.filter(item => item.id !== id));
    };

    // update cart
    const UpdateQuantity = (id, quantity)=>{
        if(quantity < 1) return;
                setCartItems(cartItems.map(item => item.id === id ? {...item, quantity} : item)
            );

    }

    return (
        <CardContext.Provider value={{ cartItems, addToCart, removeFromCart, UpdateQuantity }}>
            {children}
        </CardContext.Provider>
    );
};

// Check karein ke useContext ke andar 'CardContext' hi likha ho
export const useCard = () => {
    const context = useContext(CardContext);
    
    // Yeh check lagane se aapko exact error pata chal jayega
    if (context === undefined) {
        throw new Error("useCard must be used within a CardProvider");
    }
    
    return context;
};
