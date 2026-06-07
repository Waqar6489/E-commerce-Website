import {useState, useEffect} from 'react';
import ProductList from '../components/ProductCard';

function Home_productList() {
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/products/`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        setProduct(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setError(error);
        setLoading(false);
      });
  }, []);
  
  if (error) {
    return (
      <div className="w-full h-screen flex flex-col items-center justify-center bg-gradient-to-br from-red-50 to-red-100 p-4">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md text-center">
          <div className="text-5xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-red-600 mb-2">Oops! Something went wrong</h2>
          <p className="text-gray-600 mb-4">{error.message}</p>
          <button 
            onClick={() => window.location.reload()}
            className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-6 rounded-lg transition-all duration-300"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-gray-50 p-4 md:p-8">
      {/* Header Section */}
      <div className="mx-auto mb-12 lg:mx-10 lg:mb-12">
        <div className="animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-3">
            Our Products
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl">
            Discover our amazing collection of high-quality products designed just for you.
          </p>
          <div className="h-1 w-24 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mt-4"></div>
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center items-center min-h-96">
          <div className="relative w-16 h-16">
            <div className="absolute inset-0 rounded-full border-4 border-gray-200"></div>
            <div className="absolute inset-0 rounded-full border-4 border-blue-600 border-t-transparent animate-spin"></div>
          </div>
        </div>
      )}

      {/* Products Grid */}
      {!loading && product.length > 0 && (
        <div className=" mx-auto lg:mx-10 lg:mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
            {product.map((prod, index) => (
              <div 
                key={prod.id} 
                className="animate-fade-in"
                style={{
                  animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`
                }}
              >
                <ProductList product={prod} />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {!loading && product.length === 0 && (
        <div className="flex justify-center items-center min-h-96">
          <div className="text-center">
            <div className="text-6xl mb-4">📦</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">No Products Available</h2>
            <p className="text-gray-600">Check back soon for our amazing products!</p>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        .animate-fade-in {
          animation: fadeIn 0.6s ease-out;
        }
      `}</style>
    </div>
  );
}

export default Home_productList;