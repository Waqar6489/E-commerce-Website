import { useEffect } from "react";
import { Link } from "react-router-dom";

const PrivacyPolicy = () => {
    // Page load hone par screen top par scroll ho jaye
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="w-full min-h-screen bg-gray-50 font-sans antialiased">
            
            {/* ✨ Header Banner */}
            <div className="pt-28 pb-16 bg-gradient-to-br from-gray-900 via-indigo-950 to-gray-900 text-white text-center px-4">
                <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-3">
                    Privacy Policy
                </h1>
                <p className="text-gray-400 text-sm md:text-base max-w-xl mx-auto">
                    Last updated: June 2026. Your privacy is important to us. Read how we protect and manage your personal data.
                </p>
                <div className="h-1 w-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto mt-4"></div>
            </div>

            {/* 📄 Content Section */}
            <div className="max-w-4xl mx-auto px-6 py-12 md:py-16">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-10 space-y-8 text-gray-600 leading-relaxed">
                    
                    <section className="space-y-3">
                        <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                            <span>1.</span> Information We Collect
                        </h2>
                        <p>
                            When you visit our E-Commerce platform, make a purchase, or create an account, we collect certain personal information necessary to fulfill your requests. This includes:
                        </p>
                        <ul className="list-disc pl-6 space-y-1.5 text-sm">
                            <li><strong>Personal Details:</strong> Name, shipping address, billing address, and phone number provided during checkout.</li>
                            <li><strong>Account Data:</strong> Email address and encrypted password credentials if you register an account.</li>
                            <li><strong>Device Information:</strong> IP address, browser type, and interaction logs with our products to optimize runtime frontend speeds.</li>
                        </ul>
                    </section>

                    <section className="space-y-3">
                        <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                            <span>2.</span> How We Use Your Data
                        </h2>
                        <p>
                            We process your data strictly to maintain reliable platform services, including:
                        </p>
                        <ul className="list-disc pl-6 space-y-1.5 text-sm">
                            <li>Processing, packaging, and dispatching your dynamic order requests.</li>
                            <li>Verifying payments and ensuring transactional protection against fraudulent actions.</li>
                            <li>Communicating dispatch timelines, order status updates, or replying to customer support queries.</li>
                        </ul>
                    </section>

                    <section className="space-y-3">
                        <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                            <span>3.</span> Data Protection & Safety
                        </h2>
                        <p>
                            We integrate secure industry practices to safeguard your operations. Since our system relies on a clean decoupled architecture (Django Rest Framework backend + React frontend), all API calls transmitting personal details are processed securely. Your passwords are fully hashed at the database layer, and we do not store raw payment card data on our local databases.
                        </p>
                    </section>

                    <section className="space-y-3">
                        <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                            <span>4.</span> Third-Party Disclosure
                        </h2>
                        <p>
                            We do not sell or trade your personal information. We only share details with trusted third parties who assist us in operating our website and fulfilling shipments (e.g., local courier networks and payment gateways), provided they agree to keep your information strictly confidential.
                        </p>
                    </section>

                    <section className="space-y-3">
                        <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                            <span>5.</span> Your Rights & Control
                        </h2>
                        <p>
                            You have full access control over your data. At any given moment, you can request to inspect, alter, or permanently wipe your account records from our Django backend databases by reaching out to our support team.
                        </p>
                    </section>

                    {/* Back to Shop Button */}
                    <div className="border-t pt-8 flex justify-between items-center flex-wrap gap-4">
                        <p className="text-xs text-gray-400">
                            Have questions? Contact us at support@yourdomain.com
                        </p>
                        <Link 
                            to="/" 
                            className="bg-gray-950 hover:bg-gray-800 text-white font-medium px-5 py-2.5 rounded-xl text-sm transition-all shadow-sm cursor-pointer"
                        >
                            Back to Store
                        </Link>
                    </div>

                </div>
            </div>

           
        </div>
    );
};

export default PrivacyPolicy;