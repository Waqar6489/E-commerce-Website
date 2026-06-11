import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
    const BASE_API = import.meta.env.VITE_API_BASE_URL;
    const [Form, SetForm] = useState({ username: "", email: "", password: "", password2: "" });
    const [loading, Setloading] = useState(false);
    const [message, Setmessage] = useState({ text: null, type: null });
    const navigate = useNavigate();

    const handleChange = (e) => {
        SetForm({
            ...Form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        Setloading(true);
        Setmessage({ text: "", type: "" });

        // Basic client-side check for matching passwords
        if (Form.password !== Form.password2) {
            Setmessage({ text: "Passwords do not match!", type: "error" });
            Setloading(false);
            return;
        }

        try {
            const resp = await fetch(`${BASE_API}/api/register/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json" // Fixed typo (hyphen instead of underscore)
                },
                body: JSON.stringify(Form)
            });

            const data = await resp.json();

            if (resp.ok) {
                Setmessage({ text: "Your account was successfully created!", type: "success" });
                setTimeout(() => {
                    Setloading(false);
                    navigate('/login');
                }, 1000);
            } else {
                Setloading(false);
                // Fixed logic to extract API error messages safely without crashing
                let errorText = "Signup failed";
                if (data.username) errorText = Array.isArray(data.username) ? data.username[0] : data.username;
                else if (data.email) errorText = Array.isArray(data.email) ? data.email[0] : data.email;
                else if (data.password) errorText = Array.isArray(data.password) ? data.password[0] : data.password;
                else if (data.detail) errorText = data.detail;
                else if (typeof data === "string") errorText = data;

                Setmessage({ text: errorText, type: "error" });
            }
        } catch (error) {
            console.error(error);
            Setmessage({ text: "Server connection failed.", type: "error" });
            Setloading(false);
        }
    };

    return (
        <div className="w-full flex items-center justify-center h-screen flex-col">
            <div className="text-center mb-8">
                <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 pb-2">
                    Signup
                </h1>
                <div className="h-1 w-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mx-auto mt-2"></div>
            </div>
            
            <div className="bg-white p-6 md:p-10 rounded-2xl shadow-xl border border-gray-100 w-full max-w-md">
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">Full Name</label>
                        <input 
                            type="text" 
                            name="username" 
                            value={Form.username} 
                            placeholder="Ali Khan" 
                            onChange={handleChange} 
                            required
                            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">Email</label>
                        <input 
                            type="email" 
                            name="email" 
                            value={Form.email} 
                            onChange={handleChange} 
                            placeholder="abc@gmail.com"
                            required
                            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        />
                    </div>
                    
                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">Password</label>
                        <input 
                            type="password" 
                            name="password" 
                            value={Form.password} 
                            onChange={handleChange} 
                            required
                            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        />
                    </div>
                    
                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">Confirm Password</label>
                        <input 
                            type="password" 
                            name="password2" 
                            value={Form.password2} 
                            onChange={handleChange} 
                            required
                            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        />
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
                                Signing up...
                            </>
                        ) : "Signup"}
                    </button>
                    
                    
                    <div className="text-md text-gray-600 mb-1 text-center">
                        <p>Already have an account? <Link to='/Login' className="text-blue-600 hover:underline cursor-pointer">Login</Link></p>
                    </div>

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
    );
};

export default Signup;