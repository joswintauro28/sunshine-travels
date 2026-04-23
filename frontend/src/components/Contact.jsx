import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Mail, MapPin, Send, CheckCircle, LogIn, Globe, Sparkles } from 'lucide-react';
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
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus({ loading: true, success: false, error: null });
        const submissionData = { ...formData, phone: `${selectedCode}${formData.phone}` };

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
        <section className="relative min-h-screen pt-32 pb-20 flex items-center justify-center overflow-hidden bg-slate-900">
            {/* Immersive Background */}
            <div className="absolute inset-0 z-0">
                <img
                    src="https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&q=80&w=2400"
                    alt="Private Jet Interior"
                    className="w-full h-full object-cover opacity-40 grayscale-[0.5]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-slate-900"></div>
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="max-w-6xl mx-auto">
                    <div className="bg-white/5 backdrop-blur-2xl rounded-[3rem] border border-white/10 overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] flex flex-col lg:flex-row">

                        {/* Left Side: Editorial Content */}
                        <div className="lg:w-1/2 p-12 lg:p-20 space-y-12 text-white bg-white/5">
                            <motion.div
                                initial={{ opacity: 0, x: -30 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="space-y-6"
                            >
                                <span className="inline-block px-4 py-1.5 rounded-full bg-orange-500 text-[10px] font-bold uppercase tracking-wider">
                                    Contact Us
                                </span>
                                <h1 className="text-5xl md:text-7xl font-bold uppercase">
                                    Start Your <br /><span className="text-orange-400">Next</span> <br />Journey.
                                </h1>
                                <p className="text-gray-400 text-lg max-w-sm">
                                    Tell us about your dream trip and we will help you plan it perfectly.
                                </p>
                            </motion.div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-white/10">
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3 text-orange-400">
                                        <Phone size={18} />
                                        <span className="text-xs font-bold uppercase tracking-widest">Call Us</span>
                                    </div>
                                    <p className="text-sm font-medium">+91 98802 32901</p>
                                    <p className="text-sm font-medium">hello@sunshinetravels.com</p>
                                </div>
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3 text-orange-400">
                                        <MapPin size={18} />
                                        <span className="text-xs font-bold uppercase tracking-widest">Office</span>
                                    </div>
                                    <p className="text-sm font-medium">Ground Floor, Tiger Circle, Manipal, Karnataka 576104</p>
                                </div>
                            </div>
                        </div>

                        {/* Right Side: Professional Form */}
                        <div className="lg:w-1/2 p-12 lg:p-20 bg-white">
                            <AnimatePresence mode="wait">
                                {status.success ? (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="h-full flex flex-col items-center justify-center text-center space-y-6"
                                    >
                                        <div className="w-20 h-20 bg-orange-50 rounded-full flex items-center justify-center text-orange-500">
                                            <CheckCircle size={40} />
                                        </div>
                                        <h3 className="text-3xl font-bold text-slate-900 uppercase">Message Sent</h3>
                                        <p className="text-slate-500">We will get back to you within 24 hours.</p>
                                        <button onClick={() => setStatus({ ...status, success: false })} className="text-orange-500 font-bold uppercase text-xs tracking-widest hover:underline">
                                            Send another message
                                        </button>
                                    </motion.div>
                                ) : !isLoggedIn ? (
                                    <div className="h-full flex flex-col items-center justify-center text-center space-y-8">
                                        <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-900 shadow-lg">
                                            <LogIn size={32} />
                                        </div>
                                        <div className="space-y-4">
                                            <h3 className="text-3xl font-bold text-slate-900 uppercase">Login Required</h3>
                                            <p className="text-slate-500">Please sign in to send us a message.</p>
                                        </div>
                                        <button
                                            onClick={() => navigate('/login')}
                                            className="w-full bg-slate-900 text-white py-5 rounded-2xl font-bold hover:bg-orange-500 transition-all shadow-2xl uppercase tracking-widest text-sm"
                                        >
                                            Login
                                        </button>
                                    </div>
                                ) : (
                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Full Name</label>
                                                <input
                                                    type="text" name="name" required value={formData.name} onChange={handleChange}
                                                    className="w-full border-b-2 border-slate-100 py-3 focus:border-orange-500 outline-none transition-all font-medium text-slate-900"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Email Address</label>
                                                <input
                                                    type="email" name="email" required readOnly value={formData.email}
                                                    className="w-full border-b-2 border-slate-100 py-3 opacity-60 outline-none font-medium text-slate-900 cursor-not-allowed"
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Phone Number</label>
                                            <div className="flex gap-4">
                                                <select
                                                    value={selectedCode} onChange={(e) => setSelectedCode(e.target.value)}
                                                    className="border-b-2 border-slate-100 py-3 outline-none bg-transparent font-medium"
                                                >
                                                    {countryCodes.map(c => <option key={c.code} value={c.code}>{c.flag} {c.code}</option>)}
                                                </select>
                                                <input
                                                    type="tel" name="phone" required placeholder="Phone Number" value={formData.phone} onChange={handleChange}
                                                    className="grow border-b-2 border-slate-100 py-3 focus:border-orange-500 outline-none transition-all font-medium text-slate-900"
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Your Message</label>
                                            <textarea
                                                name="message" required rows="3" value={formData.message} onChange={handleChange}
                                                className="w-full border-b-2 border-slate-100 py-3 focus:border-orange-500 outline-none transition-all font-medium text-slate-900 resize-none"
                                            ></textarea>
                                        </div>

                                        {status.error && <p className="text-red-500 text-xs font-bold uppercase">{status.error}</p>}

                                        <button
                                            type="submit" disabled={status.loading}
                                            className="w-full bg-slate-900 text-white py-5 rounded-2xl font-bold hover:bg-orange-500 transition-all shadow-2xl flex items-center justify-center gap-3 uppercase tracking-widest text-sm"
                                        >
                                            {status.loading ? 'Sending...' : <>Send Message <Send size={18} /></>}
                                        </button>
                                    </form>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
