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
      <section className="relative min-h-screen flex items-center justify-center bg-[#132222] text-white overflow-hidden py-20 px-6">
      {/* Background Subtle Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60 pointer-events-none z-10" />

      {/* Centered Hero Image Container */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="relative w-full max-w-[800px] aspect-[4/3] md:aspect-[16/10] opacity-80 md:opacity-100 mix-blend-lighten">
          {/* <img 
            src="https://images.unsplash.com/photo-1526047932273-341f2a7631f9?q=80&w=1200&auto=format&fit=crop" // Replace with your exact rose in glass cloche image URL
            alt="Roses in glass dome" 
            className="w-full h-full object-cover filter brightness-90 contrast-115"
          /> */}
        </div>
      </div>

      {/* Scattered Petals Decorative Elements (Optional Visual Flavor) */}
      <div className="absolute bottom-10 left-1/4 w-4 h-2 bg-red-800/40 blur-[1px] rounded-full transform rotate-12 hidden md:block" />
      <div className="absolute bottom-16 right-1/3 w-6 h-3 bg-red-900/50 blur-[0.5px] rounded-full transform -rotate-45 hidden md:block" />

      {/* Main Content Content Area */}
      <div className="relative z-20 max-w-4xl mx-auto text-center flex flex-col items-center justify-center h-full">
        
        {/* Top Subtitle */}
        <p className="text-[10px] md:text-xs tracking-[0.3em] uppercase text-gray-400 font-medium mb-4 max-w-md md:max-w-none">
          Digital product Serving tech Valley For 121 Years
        </p>

        {/* Main Elegant Title */}
        <h1 className="font-serif text-5xl sm:text-6xl md:text-8xl font-normal tracking-wide leading-[1.05] max-w-3xl selection:bg-red-900">
          Create a <span className="italic block md:inline">Digital</span> <br className="hidden md:block"/> 
          <span className="block mt-1 md:mt-0">Moment</span>
        </h1>

        {/* Supporting Description */}
        <p className="mt-6 text-xs md:text-sm text-gray-300 font-light tracking-wide max-w-md md:max-w-lg leading-relaxed mix-blend-plus-lighter">
          Choose from our selection of stunning arrangements or stop into the shop to create the perfect Electronic device.
        </p>

        {/* Minimalist Ghost Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row gap-4 w-full sm:w-auto px-6 sm:px-0">
          <a 
            href="#shop" 
            className="border border-white/40 hover:border-white bg-black/10 hover:bg-white/10 backdrop-blur-sm text-white text-xs tracking-[0.2em] uppercase px-8 py-4 transition-all duration-300 text-center min-w-[200px]"
          >
            Shop Now
          </a>
          <a 
            href="/contact" 
            className="border border-white/40 hover:border-white bg-black/10 hover:bg-white/10 backdrop-blur-sm text-white text-xs tracking-[0.2em] uppercase px-8 py-4 transition-all duration-300 text-center min-w-[200px]"
          >
           Contact us
          </a>
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