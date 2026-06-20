import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-950 text-gray-400 pt-16 pb-8 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
        <div className="space-y-4">
          <Link to="/" className="text-white text-2xl font-black tracking-wider">E-COMMERCE</Link>
          <p className="text-sm text-gray-400 leading-relaxed">
            Creating smooth and premium dynamic shopping platforms powered by cutting edge frontend and backend architectures.
          </p>
        </div>
        <div>
          <h5 className="text-white font-semibold mb-4 tracking-wide uppercase text-sm">Quick Links</h5>
          <ul className="space-y-2.5 text-sm">
            <li><a href="#shop" className="hover:text-white transition-colors">Shop Catalog</a></li>
            <li><Link to="/cart" className="hover:text-white transition-colors">Your Cart</Link></li>
            <li><Link to="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
          </ul>
        </div>
        <div>
          <h5 className="text-white font-semibold mb-4 tracking-wide uppercase text-sm">Customer Care</h5>
          <ul className="space-y-2.5 text-sm">
            <li><a href="#" className="hover:text-white transition-colors">Help Center / FAQs</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Track Shipment</a></li>
            <li><a href="/contact" className="hover:text-white transition-colors">Contact Support</a></li>
          </ul>
        </div>
        <div className="space-y-4">
          <h5 className="text-white font-semibold tracking-wide uppercase text-sm">Stay Updated</h5>
          <p className="text-sm text-gray-400">Subscribe to get special offers and updates.</p>
          <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
            <input 
              type="email" 
              placeholder="Your email address" 
              className="bg-gray-800 text-white border border-gray-700 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-blue-500 w-full"
            />
            <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors cursor-pointer">
              Join
            </button>
          </form>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 md:px-12 border-t border-gray-800 pt-8 flex flex-col sm:flex-row justify-between items-center text-xs gap-4">
        <p>&copy; 2026 Premium E-Commerce Store. All rights reserved.</p>
        <div className="flex gap-6 text-gray-500">
          <a href="#" className="hover:text-white">Twitter</a>
          <a href="#" className="hover:text-white">GitHub</a>
          <a href="#" className="hover:text-white">LinkedIn</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;