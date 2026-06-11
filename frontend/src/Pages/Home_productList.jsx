import { useState, useEffect } from 'react';
import ProductList from '../components/ProductCard';
import { FaShippingFast } from "react-icons/fa";
import { FaBox } from "react-icons/fa";
import { HiArrowPath } from "react-icons/hi2";
import { RiSecurePaymentFill } from "react-icons/ri";
import { GrSearch } from "react-icons/gr";



function Home_productList() {
  const [product, setProduct] = useState([]);
  const [categories, setCategories] = useState([]); // Backend categories ke liye state
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  
  // Search aur Category filter states
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    // Both products aur categories ko sath fetch karne ke liye Promise.all use kiya
    Promise.all([
      fetch(`${API_BASE_URL}/api/products/`).then(res => {
        if (!res.ok) throw new Error(`Products HTTP error ${res.status}`);
        return res.json();
      }),
      // ✅ Django API endpoint apni category modal ke mutabiq check kar lein
      fetch(`${API_BASE_URL}/api/categories/`).then(res => {
        if (!res.ok) throw new Error(`Categories HTTP error ${res.status}`);
        return res.json();
      }).catch(err => {
        console.error("Categories fetch failed, using fallback empty array", err);
        return []; // Agar category API nahi bani toh khali array return karega taake app crash na ho
      })
    ])
    .then(([productsData, categoriesData]) => {
      setProduct(productsData);
      setCategories(categoriesData);
      setLoading(false);
    })
    .catch(error => {
      console.error('Error fetching data:', error);
      setError(error);
      setLoading(false);
    });
  }, [API_BASE_URL]);

  // Frontend Live Client-side Filter Engine
  const filteredProducts = product.filter(prod => {
    const matchesSearch = prod.name.toLowerCase().includes(search.toLowerCase());
    // Django serialiser standard ke mutabiq category aksar name string ya object id hoti hai
    const matchesCategory = selectedCategory === "All" || 
                            prod.category === selectedCategory || 
                            prod.category?.name === selectedCategory;
    return matchesSearch && matchesCategory;
  });
  
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
    <div className="w-full min-h-screen bg-white font-sans antialiased">
      
      {/* ✨ 1. PREMIUM HERO SECTION */}
      <section className="relative pt-24 pb-20 md:pt-32 md:pb-28 bg-gradient-to-br from-gray-900 via-indigo-950 to-gray-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1557683316-973673baf926?q=80&w=1000')] bg-cover opacity-10 mix-blend-overlay"></div>
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid md:grid-cols-2 gap-12 items-center relative z-10">
          <div className="space-y-6 text-center md:text-left">
            <span className="inline-block bg-blue-500/20 text-blue-400 font-semibold px-4 py-1.5 rounded-full text-xs tracking-wider uppercase backdrop-blur-sm">
              New Season Arrival
            </span>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight">
              Elevate Your <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                Shopping Experience
              </span>
            </h1>
            <p className="text-gray-300 text-base md:text-lg max-w-md mx-auto md:mx-0">
              Discover amazing collections of high-quality premium products designed just for you with cutting-edge layouts.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row justify-center md:justify-start gap-4">
              <a href="#shop" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-8 py-3.5 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-center active:scale-98">
                Explore Shop
              </a>
            </div>
          </div>
          <div className="hidden md:flex justify-center relative">
            <div className="absolute w-72 h-72 bg-blue-500/30 rounded-full blur-3xl -top-10 -left-10 animate-pulse"></div>
            <img 
              src="https://images.unsplash.com/photo-1484704849700-f032a568e944?w=600&auto=format&fit=crop&q=80" 
              alt="Hero Showcase" 
              className="rounded-2xl shadow-2xl border border-gray-800 object-cover w-[450px] h-[400px] transform hover:scale-102 transition-transform duration-500"
            />
          </div>
        </div>
      </section>

      {/* 🎛️ 2. FILTER & SEARCH CONTROL SECTION */}
      <section id="shop" className="max-w-7xl mx-auto px-4 md:w-8xl pt-16 pb-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 border-b pb-6">
          
          {/* Dynamic Categories Buttons from Backend */}
          <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
            <button
              onClick={() => setSelectedCategory("All")}
              className={`px-5 py-2 rounded-xl text-sm font-medium transition-all cursor-pointer whitespace-nowrap
                ${selectedCategory === "All" ? "bg-gray-900 text-white shadow-sm" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
            >
              All Products
            </button>
            {categories.map((cat) => {
              const catName = typeof cat === 'string' ? cat : cat.name;
              return (
                <button
                  key={cat.id || catName}
                  onClick={() => setSelectedCategory(catName)}
                  className={`px-5 py-2 rounded-xl text-sm font-medium transition-all cursor-pointer whitespace-nowrap
                    ${selectedCategory === catName ? "bg-gray-900 text-white shadow-sm" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
                >
                  {catName}
                </button>
              );
            })}
          </div>

          {/* Search Input field */}
          <div className="w-full md:w-80 relative">
            <input 
              type="text" 
              placeholder="Search products..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full border border-gray-200 rounded-xl pl-10 pr-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all bg-gray-50/50"
            />
            <span className="absolute left-3 top-4 text-gray-400 text-sm"><GrSearch></GrSearch></span>
          </div>
        </div>
      </section>

      {/* Header Info Below Hero */}
      <div className="max-w-7xl mx-auto px-4  md:w-8xl mt-8 mb-8">
        <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Trending Items</h2>
        <div className="h-1 w-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mt-2"></div>
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

      {/* 🛍️ 3. PRODUCTS GRID */}
      {!loading && filteredProducts.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 md:w-8xl lg:mb-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
            {filteredProducts.map((prod, index) => (
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
      {!loading && filteredProducts.length === 0 && (
        <div className="flex justify-center items-center min-h-96">
          <div className="text-center">
            <div className="text-6xl mb-4">📦</div>
            <h2 className="text-2xl font-bold text-gray-gray-800 mb-2">No Products Found</h2>
            <p className="text-gray-600">Try adjusting your search or filters parameters!</p>
          </div>
        </div>
      )}

      {/* 🛡️ 4. SERVICES TRUST BANNER */}
      <section className="bg-gray-50 border-y border-gray-100 py-16 mt-12">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-center md:text-left">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-4 p-2">
            <div className="text-3xl bg-blue-50 p-3 rounded-2xl text-blue-600"><FaShippingFast></FaShippingFast></div>
            <div>
              <h4 className="font-bold text-gray-800 text-base">Free Shipping</h4>
              <p className="text-gray-500 text-xs mt-1">On orders over $150 safely packaged</p>
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center md:items-start gap-4 p-2">
            <div className="text-3xl bg-purple-50 p-3 rounded-2xl text-purple-600"><FaBox></FaBox></div>
            <div>
              <h4 className="font-bold text-gray-800 text-base">24 Hours Dispatch</h4>
              <p className="text-gray-500 text-xs mt-1">Fastest processing runtime pipeline</p>
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center md:items-start gap-4 p-2">
            <div className="text-3xl bg-green-50 p-3 rounded-2xl text-green-600"><HiArrowPath></HiArrowPath></div>
            <div>
              <h4 className="font-bold text-gray-800 text-base">7 Days Easy Return</h4>
              <p className="text-gray-500 text-xs mt-1">100% money back full safety policy</p>
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center md:items-start gap-4 p-2">
            <div className="text-3xl bg-orange-50 p-3 rounded-2xl text-orange-600"><RiSecurePaymentFill></RiSecurePaymentFill></div>
            <div>
              <h4 className="font-bold text-gray-800 text-base">Secure Checkout</h4>
              <p className="text-gray-500 text-xs mt-1">Verified transactional SSL operations</p>
            </div>
          </div>
        </div>
      </section>


      {/* Styles kept from your core setup */}
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
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        .animate-fade-in {
          animation: fadeIn 0.6s ease-out;
        }
        .scrollbar-none::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-none {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}

export default Home_productList;