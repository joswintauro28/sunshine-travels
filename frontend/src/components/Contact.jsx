import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Mail, MapPin, Send, CheckCircle, LogIn, Sparkles, Globe, User } from 'lucide-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const countryCodes = [
    { code: '+91', name: 'IN', flag: '🇮🇳' },
    { code: '+1', name: 'US', flag: '🇺🇸' },
    { code: '+44', name: 'UK', flag: '🇬🇧' },
    { code: '+971', name: 'AE', flag: '🇦🇪' },
];

const Contact = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: ''
    });
    const [selectedCode, setSelectedCode] = useState('+91');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [status, setStatus] = useState({ loading: false, success: false, error: null });

    useEffect(() => {
        window.scrollTo(0, 0);
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
            const user = JSON.parse(savedUser);
            setIsLoggedIn(true);
            setFormData(prev => ({
                ...prev,
                name: user.full_name || user.name || '',
                email: user.email || ''
            }));
        }
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'phone') {
            const cleanValue = value.replace(/\D/g, '');
            setFormData(prev => ({ ...prev, [name]: cleanValue }));
        } else if (name === 'message') {
            const words = value.trim().split(/\s+/);
            if (words.length <= 200 || value.length < formData.message.length) {
                setFormData(prev => ({ ...prev, [name]: value }));
            }
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const wordCount = formData.message.trim() ? formData.message.trim().split(/\s+/).length : 0;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus({ loading: true, success: false, error: null });
        const submissionData = { ...formData };

        try {
            const response = await axios.post('http://localhost:8000/contact', submissionData);
            if (response.data.status === 'success') {
                setStatus({ loading: false, success: true, error: null });
                setFormData({ name: '', email: '', phone: '', message: '' });
            }
        } catch (err) {
            setStatus({ loading: false, success: false, error: 'Transmission failed. Please retry.' });
        }
    };

    return (
        <section className="relative min-h-screen pt-32 pb-20 flex items-center justify-center overflow-hidden">
            {/* Beautiful Tropical Background */}
            <div className="absolute inset-0 z-0">
                <img
                    src="https://images.unsplash.com/photo-1540206351-d6465b3ac5c1?auto=format&fit=crop&q=80&w=2400"
                    alt="Tropical Resort"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-slate-900/10 backdrop-blur-[1px]"></div>
                <div className="absolute inset-0 bg-gradient-to-b from-slate-900/30 via-transparent to-slate-900/50"></div>
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="max-w-4xl mx-auto">
                    <motion.div 
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white/10 backdrop-blur-3xl rounded-[3rem] border border-white/30 overflow-hidden shadow-2xl flex flex-col md:flex-row"
                    >
                        {/* Left Side: Simple Info */}
                        <div className="md:w-[35%] p-10 space-y-8 text-white relative">
                            <div className="space-y-4">
                                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500 text-[10px] font-bold uppercase tracking-widest shadow-lg">
                                    <Sparkles size={12} /> Contact Us
                                </span>
                                <h1 className="text-4xl md:text-5xl font-black uppercase leading-tight">
                                    Plan Your <br /><span className="text-orange-400">Dream</span> <br />Holiday.
                                </h1>
                            </div>

                            <div className="space-y-6 pt-6">
                                <div>
                                    <div className="flex items-center gap-3 text-orange-400 mb-1">
                                        <Phone size={16} />
                                        <span className="text-[10px] font-bold uppercase tracking-widest opacity-70">Phone</span>
                                    </div>
                                    <p className="text-sm font-bold">+91 98802 32901</p>
                                </div>
                                
                                <div>
                                    <div className="flex items-center gap-3 text-orange-400 mb-1">
                                        <Mail size={16} />
                                        <span className="text-[10px] font-bold uppercase tracking-widest opacity-70">Email</span>
                                    </div>
                                    <p className="text-sm font-bold">hello@sunshinetravels.com</p>
                                </div>

                                <div>
                                    <div className="flex items-center gap-3 text-orange-400 mb-1">
                                        <MapPin size={16} />
                                        <span className="text-[10px] font-bold uppercase tracking-widest opacity-70">Address</span>
                                    </div>
                                    <p className="text-sm font-bold leading-snug">Tiger Circle, Manipal, Karnataka</p>
                                </div>
                            </div>

                            <div className="pt-8 border-t border-white/10">
                                <div className="flex items-center gap-2 text-orange-400 mb-4">
                                    <Globe size={16} />
                                    <span className="text-[10px] font-bold uppercase tracking-widest">Connect With:</span>
                                </div>
                                <ul className="space-y-3">
                                    {['MR. ROHIT – REEM IND.', 'MR. ARNOLD – NATURYA', 'MS. SHIPRA – NIVEUS'].map((item, i) => (
                                        <li key={i} className="text-[10px] font-bold text-gray-300 flex items-start gap-2">
                                            <span className="text-orange-500">•</span> {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {/* Right Side: Easy Form */}
                        <div className="md:w-[65%] p-10 lg:p-14 bg-white/90 backdrop-blur-xl">
                            <AnimatePresence mode="wait">
                                {status.success ? (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="h-full flex flex-col items-center justify-center text-center space-y-6"
                                    >
                                        <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center text-orange-500 shadow-lg">
                                            <CheckCircle size={32} />
                                        </div>
                                        <div className="space-y-2">
                                            <h3 className="text-2xl font-black text-slate-900 uppercase">Message Sent</h3>
                                            <p className="text-slate-500 font-medium">We will contact you very soon.</p>
                                        </div>
                                        <button onClick={() => setStatus({ ...status, success: false })} className="text-orange-500 font-bold uppercase text-xs tracking-widest hover:underline">
                                            Send another message
                                        </button>
                                    </motion.div>
                                ) : !isLoggedIn ? (
                                    <div className="h-full flex flex-col items-center justify-center text-center space-y-8">
                                        <div className="w-16 h-16 bg-slate-900 text-white rounded-2xl flex items-center justify-center shadow-xl">
                                            <LogIn size={32} />
                                        </div>
                                        <div className="space-y-3">
                                            <h3 className="text-2xl font-black text-slate-900 uppercase">Please Login</h3>
                                            <p className="text-slate-500 font-medium">You need to sign in to send us a message.</p>
                                        </div>
                                        <button
                                            onClick={() => navigate('/login')}
                                            className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-orange-500 transition-all shadow-lg"
                                        >
                                            Login Now
                                        </button>
                                    </div>
                                ) : (
                                    <form onSubmit={handleSubmit} className="space-y-8">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <div className="flex items-center gap-2 text-slate-500">
                                                    <User size={14} />
                                                    <label className="text-[10px] font-bold uppercase tracking-widest">Your Name</label>
                                                </div>
                                                <input
                                                    type="text" name="name" required value={formData.name} onChange={handleChange}
                                                    placeholder="Enter your name"
                                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:border-orange-500 focus:bg-white outline-none transition-all font-bold text-slate-900"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <div className="flex items-center gap-2 text-slate-500">
                                                    <Mail size={14} />
                                                    <label className="text-[10px] font-bold uppercase tracking-widest">Email Address</label>
                                                </div>
                                                <input
                                                    type="email" name="email" required readOnly value={formData.email}
                                                    className="w-full bg-slate-100 border border-slate-200 rounded-xl px-4 py-3 opacity-70 outline-none font-bold text-slate-900 cursor-not-allowed"
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <div className="flex items-center gap-2 text-slate-500">
                                                <Phone size={14} />
                                                <label className="text-[10px] font-bold uppercase tracking-widest">Phone Number</label>
                                            </div>
                                            <input
                                                type="tel" name="phone" required placeholder="Phone number" value={formData.phone} onChange={handleChange}
                                                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:border-orange-500 focus:bg-white outline-none transition-all font-bold text-slate-900"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <div className="flex items-center justify-between text-slate-500">
                                                <div className="flex items-center gap-2">
                                                    <Send size={14} />
                                                    <label className="text-[10px] font-bold uppercase tracking-widest">Your Message</label>
                                                </div>
                                                <span className={`text-[10px] font-bold uppercase tracking-widest ${wordCount >= 200 ? 'text-red-500' : 'text-slate-400'}`}>
                                                    {wordCount}/200 words
                                                </span>
                                            </div>
                                            <textarea
                                                name="message" required rows="3" value={formData.message} onChange={handleChange}
                                                placeholder="Tell us where you want to go..."
                                                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:border-orange-500 focus:bg-white outline-none transition-all font-bold text-slate-900 resize-none"
                                            ></textarea>
                                        </div>

                                        <button
                                            type="submit" disabled={status.loading}
                                            className="w-full bg-slate-900 text-white py-4 rounded-xl font-black uppercase tracking-widest text-xs hover:bg-orange-500 transition-all shadow-lg flex items-center justify-center gap-3"
                                        >
                                            {status.loading ? 'Sending...' : <>Send Message <Send size={16} /></>}
                                        </button>
                                    </form>
                                )}
                            </AnimatePresence>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
