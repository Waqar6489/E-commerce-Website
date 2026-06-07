import React from 'react';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useCard } from '../Context/CardContext';

function ProductDetail() {
    const { id } = useParams();
    const VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const {addToCart} = useCard();

    useEffect(() => {
        fetch(`${VITE_API_BASE_URL}/api/products/${id}/`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch product');
                }
                return response.json();
            })
            .then(data => {
                setProduct(data);
                setLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setLoading(false);
            });
    }, [id]);

    if (loading) 
        return <div className="container mx-auto px-4 py-8">Loading...</div>;
    if (error) 
        return <div className="container mx-auto px-4 py-8">Error: {error}</div>;
    if (!product) 
        return <div className="container mx-auto px-4 py-8">Product not found</div>;

    return (
        <div className="w-full min-h-screen bg-gray-50 p-4 md:p-8">
            <div className="mx-auto mb-12 lg:mx-10 lg:mb-12">
                <div className="animate-fade-in">
                    <h1 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-3">
                        Product Details
                    </h1>
                    <div className="h-1 w-24 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mt-4"></div>
                </div>
            </div>
            <div className="mx-auto gap-10 bg-white rounded-lg shadow-md p-6 flex flex-col md:flex-row">
                <img src={product.image} alt={product.name} className="w-full md:w-1/2 h-200 object-fit rounded-lg mb-4 md:mb-0 md:mr-6" />
                <div className="w-full md:w-1/2">
                    <Link to="/" className="text-blue-600 hover:text-blue-800 mb-4 inline-block">← Back to Products</Link>
                    <h2 className="text-3xl font-bold mb-4">{product.name}</h2>
                    <b className='text-xl'>Description:</b>
                    <div className="text-gray-600 mb-4 text-justify" dangerouslySetInnerHTML={{ __html: product.long_description }} /> 
                    <p className="text-xl font-bold text-gray-800 mb-6">Stock: {product.stock}</p>
                    <p className="text-2xl font-bold text-blue-600">${product.price}</p>
                    <button onClick={()=> addToCart(product)} className="mt-6 cursor-pointer bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300 transform hover:active:scale-95 shadow-md hover:shadow-lg"> Add to Cart</button>
                </div>
            </div>
        </div>
    );
}

export default ProductDetail;