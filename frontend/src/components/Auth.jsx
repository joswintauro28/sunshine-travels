import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, User, ArrowRight, CheckCircle, AlertCircle, Eye, EyeOff, Sparkles } from 'lucide-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RedirectModal = ({ isOpen, onClose, onLater }) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm"
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="relative bg-white rounded-[3rem] p-10 md:p-14 w-full max-w-sm shadow-2xl overflow-hidden text-center"
                    >
                        <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 rounded-bl-full -mr-16 -mt-16" />
                        
                        <div className="relative z-10 space-y-6">
                            <div className="w-20 h-20 bg-orange-500/10 text-orange-500 rounded-full flex items-center justify-center mx-auto">
                                <Sparkles size={32} />
                            </div>
                            <div className="space-y-2">
                                <h2 className="text-2xl font-bold text-slate-900 uppercase tracking-tighter">Welcome!</h2>
                                <p className="text-slate-500 text-sm">Tell us about your travel plans so we can help you better.</p>
                            </div>

                            <div className="flex flex-col gap-3">
                                <button
                                    onClick={onClose}
                                    className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold uppercase tracking-widest text-[10px] hover:bg-orange-500 transition-all shadow-xl flex items-center justify-center gap-2"
                                >
                                    Share Query <ArrowRight size={14} />
                                </button>
                                <button
                                    onClick={onLater}
                                    className="w-full py-2 text-slate-400 font-bold uppercase tracking-widest text-[10px] hover:text-slate-900 transition-colors"
                                >
                                    Maybe Later
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

const Auth = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
    const [errors, setErrors] = useState({});
    const [status, setStatus] = useState({ loading: false, success: false, error: null });
    const [showQueryModal, setShowQueryModal] = useState(false);
    const [loggedInUser, setLoggedInUser] = useState(null);
    const navigate = useNavigate();

    const validate = () => {
        let newErrors = {};
        if (!isLogin && !formData.name) newErrors.name = 'Name required';
        if (!formData.email) newErrors.email = 'Email required';
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email invalid';
        if (!formData.password) newErrors.password = 'Password required';
        else if (formData.password.length < 6) newErrors.password = 'Min 6 characters';
        if (!isLogin && formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Mismatch';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: null });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;
        setStatus({ loading: true, success: false, error: null });
        
        try {
            if (isLogin) {
                const params = new URLSearchParams();
                params.append('username', formData.email);
                params.append('password', formData.password);
                const response = await axios.post('http://localhost:8000/api/v1/login/access-token', params, {
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                });
                const { access_token } = response.data;
                localStorage.setItem('token', access_token);
                const userResponse = await axios.get('http://localhost:8000/api/v1/test-token', {
                    headers: { Authorization: `Bearer ${access_token}` }
                });
                const user = userResponse.data;
                localStorage.setItem('user', JSON.stringify(user));
                setLoggedInUser(user);
                window.dispatchEvent(new Event('authChange'));
                setStatus({ loading: false, success: true, error: null });
                
                if (user.is_superuser) {
                    setTimeout(() => navigate('/admin'), 1500);
                } else {
                    // Show query modal for normal users
                    setTimeout(() => setShowQueryModal(true), 1500);
                }
            } else {
                const signupData = { email: formData.email, password: formData.password, full_name: formData.name };
                await axios.post('http://localhost:8000/api/v1/users/open', signupData);
                setStatus({ loading: false, success: true, error: null });
                setTimeout(() => { setIsLogin(true); setStatus({ loading: false, success: false, error: null }); }, 2000);
            }
        } catch (err) {
            setStatus({ loading: false, success: false, error: err.response?.data?.detail || 'Transmission failed.' });
        }
    };

    const handleModalClose = () => {
        setShowQueryModal(false);
        navigate('/contact');
    };

    const handleLater = () => {
        setShowQueryModal(false);
        navigate('/');
    };

    return (
        <>
            <RedirectModal 
                isOpen={showQueryModal} 
                onClose={handleModalClose} 
                onLater={handleLater}
            />
            
            <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-900 px-6 py-32 md:py-40">
                {/* High-End Background */}
                <div className="absolute inset-0 z-0">
                    <img 
                        src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&q=80&w=2400" 
                        alt="Luxury Resort" 
                        className="w-full h-full object-cover opacity-30 grayscale-[0.3]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-tr from-slate-900 via-slate-900/60 to-transparent"></div>
                </div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="relative z-10 w-full max-w-[450px]"
                >
                    <div className="bg-white/5 backdrop-blur-3xl p-10 md:p-14 rounded-[3.5rem] border border-white/10 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)]">
                        <div className="text-center space-y-4 mb-12">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 text-orange-400 text-[10px] font-bold uppercase tracking-wider">
                                <Sparkles size={12} /> Sunshine Travels
                            </div>
                            <h1 className="text-4xl font-bold text-white uppercase">
                                {isLogin ? 'Welcome Back' : 'Create Account'}
                            </h1>
                            <p className="text-gray-400 text-sm">
                                {isLogin ? 'Sign in to your account' : 'Register to start your journey'}
                            </p>
                        </div>

                        <AnimatePresence mode="wait">
                            {status.success ? (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="text-center py-12 space-y-6"
                                >
                                    <div className="w-20 h-20 bg-orange-500/20 rounded-full flex items-center justify-center mx-auto text-orange-500 border border-orange-500/30">
                                        <CheckCircle size={40} />
                                    </div>
                                    <h3 className="text-2xl font-bold text-white uppercase">Success</h3>
                                    <p className="text-gray-400">
                                        {isLogin && !loggedInUser?.is_superuser ? 'Please share your query...' : 'Redirecting you now...'}
                                    </p>
                                </motion.div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="space-y-5">
                                        {!isLogin && (
                                            <div className="space-y-1">
                                                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 pl-1">Full Name</label>
                                                <div className="relative group">
                                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-orange-400 transition-colors" size={18} />
                                                    <input
                                                        type="text" name="name" value={formData.name} onChange={handleChange}
                                                        className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-4 text-white focus:outline-none focus:border-orange-500/50 transition-all"
                                                    />
                                                </div>
                                                {errors.name && <p className="text-red-400 text-[10px] uppercase font-bold pl-1">{errors.name}</p>}
                                            </div>
                                        )}

                                        <div className="space-y-1">
                                            <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 pl-1">Email Address</label>
                                            <div className="relative group">
                                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-orange-400 transition-colors" size={18} />
                                                <input
                                                    type="email" name="email" value={formData.email} onChange={handleChange}
                                                    className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-4 text-white focus:outline-none focus:border-orange-500/50 transition-all"
                                                />
                                            </div>
                                            {errors.email && <p className="text-red-400 text-[10px] uppercase font-bold pl-1">{errors.email}</p>}
                                        </div>

                                        <div className="space-y-1">
                                            <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 pl-1">Password</label>
                                            <div className="relative group">
                                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-orange-400 transition-colors" size={18} />
                                                <input
                                                    type={showPassword ? "text" : "password"} name="password" value={formData.password} onChange={handleChange}
                                                    className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-12 py-4 text-white focus:outline-none focus:border-orange-500/50 transition-all"
                                                />
                                                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white">
                                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                                </button>
                                            </div>
                                            {errors.password && <p className="text-red-400 text-[10px] uppercase font-bold pl-1">{errors.password}</p>}
                                        </div>
                                    </div>

                                    {status.error && (
                                        <div className="flex items-center gap-2 text-red-400 text-[10px] uppercase font-bold bg-red-400/10 p-3 rounded-xl border border-red-400/20">
                                            <AlertCircle size={14} /> {status.error}
                                        </div>
                                    )}

                                    <button
                                        type="submit" disabled={status.loading}
                                        className="w-full bg-white text-slate-900 py-5 rounded-2xl font-bold hover:bg-orange-500 hover:text-white transition-all shadow-2xl uppercase tracking-widest text-sm flex items-center justify-center gap-3"
                                    >
                                        {status.loading ? 'Signing in...' : <>{isLogin ? 'Sign In' : 'Sign Up'} <ArrowRight size={18} /></>}
                                    </button>

                                    <div className="text-center">
                                        <button
                                            type="button"
                                            onClick={() => { setIsLogin(!isLogin); setErrors({}); setStatus({ loading: false, success: false, error: null }); }}
                                            className="text-gray-500 hover:text-orange-400 text-[10px] font-bold uppercase tracking-widest transition-colors"
                                        >
                                            {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Sign In"}
                                        </button>
                                    </div>
                                </form>
                            )}
                        </AnimatePresence>
                    </div>
                </motion.div>
            </section>
        </>
    );
};

export default Auth;
