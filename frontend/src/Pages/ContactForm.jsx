import { useState } from "react";

    

const ContactForm = () => {
    // Fixed: Standardized camelCase initialization
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });

    const [status, setStatus] = useState({ loading: false, error: null, success: null });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const BACKEND_API = import.meta.env.VITE_API_BASE_URL;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus({ loading: true, success: null, error: null });

        try {
            // Added trailing slash to match standard Django URL patterns
            const res = await fetch(`${BACKEND_API}/api/contact/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // Capitalized 'Content-Type' for standard practice
                },
                body: JSON.stringify(formData)
            });
            
            const data = await res.json();
            
            if (res.ok) {
                setTimeout(() => {
                     setStatus({ loading: false, success: '', error: null });
                }, 2500);
                setStatus({ loading: false, success: 'Thank you for contact us. We will respond within 24 hours', error: null });

                setFormData({ name: '', email: '', subject: '', message: '' }); // Form resets properly now
            } else {
                // Handle validation errors from Django
                
                const errorMsg = data.detail || Object.values(data).flat().join(', ') || 'Something went wrong.';
                
                setStatus({ loading: false, success: null, error: errorMsg });
            }
        } catch (err) {
            // Extracted message string so React doesn't try to render an error object
            setStatus({ loading: false, success: null, error: err.message || 'Network error. Could not connect to the server.' });
        }
    };

    return (
        <div className="w-full flex items-center justify-center h-full flex-col mt-10 mb-10">
            <div className="text-center mb-8">
                <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 pb-2">
                    Contact form
                </h1>
                <div className="h-1 w-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mx-auto mt-2"></div>
            </div>

            <div className="w-full bg-white p-6 md:p-10 rounded-2xl shadow-xl border border-gray-100 max-w-lg">
                <form onSubmit={handleSubmit} className="space-y-5 w-full">
                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">Full Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
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
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="abc@gmail.com"
                            required
                            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">Subject</label>
                        <input
                            type="text"
                            name="subject"
                            value={formData.subject}
                            placeholder="Write your purpose"
                            onChange={handleChange}
                            required
                            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">Message</label>
                        <textarea
                            name="message"
                            value={formData.message}
                            placeholder="write your query"
                            onChange={handleChange}
                            required
                            rows="4"
                            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                        />
                    </div>

                    <button type="submit" disabled={status.loading} className="w-full cursor-pointer mt-4 font-semibold py-3 px-4 rounded-xl text-white bg-blue-500 shadow-md transition-all duration-300 transform active:scale-98 flex justify-center items-center gap-2">
                        {status.loading ? 'Sending...' : 'Send Message'}
                    </button>
                </form>
                
                {status.success && <p className="text-green-600 mt-4 font-medium">{status.success}</p>}
                {status.error && <p className="text-red-500 mt-4 font-medium">{status.error}</p>}
            </div>
        </div>
    );
}

export default ContactForm;