import React from 'react';
import { Link } from 'react-router-dom';
import { useCard } from '../Context/CardContext';


function ProductCard({product}){
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
    const {addToCart} = useCard()
    return (
        
            <div className="group relative overflow-hidden rounded-xl bg-white shadow-md hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1 hover:scale-105 flex flex-col h-full border border-gray-100">
                {/* Image Container */}
                <Link to={`/products/${product.id}`}>
                <div className="relative overflow-hidden bg-white h-55 flex items-center justify-center">
                    <img 
                        src={`${API_BASE_URL}${product.image}`} 
                    alt={product.name} 
                    className="w-full h-full object-fit" 
                />
                {/* Overlay on Hover */}
                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
            </div>
            
            {/* Content Container */}
            <div className="p-5 flex flex-col flex-grow justify-between">
                {/* Title */}
                <div>
                    <h2 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors duration-300">
                        {product.name}
                    </h2>
                    
                    {/* Description */}
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2 leading-relaxed">
                        {product.short_description}
                    </p>
                </div>
            
                
                {/* Price and Button */}
               
                
            </div>
            </Link>
             <div className="flex items-center justify-between pt-4 border-t border-gray-100 p-5">
                    <p className="text-2xl font-bold text-blue-600">
                        ${parseFloat(product.price).toFixed(2)}
                    </p>
                    <button onClick={()=>  addToCart(product)} className=" cursor-pointer bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300 transform hover:active:scale-95 shadow-md hover:shadow-lg">
                        Add To Cart
                    </button>
                </div>
            
            {/* Hover Indicator Line */}
            <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-blue-400 via-blue-600 to-blue-800 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
        </div>
        
        
    );
}
export default ProductCard;