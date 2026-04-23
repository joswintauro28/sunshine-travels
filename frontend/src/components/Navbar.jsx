import React, { useState, useEffect } from 'react';
import { Menu, X, Sun, User } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/logo.png';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const location = useLocation();
  const isAuthPage = location.pathname === '/login';
  const isContactPage = location.pathname === '/contact';
  const hideBookNow = isAuthPage || isContactPage;

  const checkAuth = () => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    } else {
      setUser(null);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    checkAuth();

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('authChange', checkAuth);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('authChange', checkAuth);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    window.dispatchEvent(new Event('authChange'));
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 border-b border-slate-100 ${isScrolled ? 'bg-[#F8F8F8]/95 backdrop-blur-md shadow-lg py-1' : 'bg-[#F8F8F8] py-1 shadow-sm'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center py-1">
        <div className="flex items-center gap-3">
          <Link to="/">
            <img src={logo} alt="Sunshine Travels Logo" className="h-16 md:h-24 w-auto object-contain transition-all duration-300" />
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-6 text-slate-900 font-bold text-[12px]">
          <Link to="/" className="hover:text-orange-500 transition-colors uppercase tracking-widest">Home</Link>
          <Link to="/destinations" className="hover:text-orange-500 transition-colors uppercase tracking-widest">Destinations</Link>
          <Link to="/services" className="hover:text-orange-500 transition-colors uppercase tracking-widest">Services</Link>
          <Link to="/our-difference" className="hover:text-orange-500 transition-colors uppercase tracking-widest whitespace-nowrap">Our Difference</Link>
          <Link to="/testimonials" className="hover:text-orange-500 transition-colors uppercase tracking-widest">Testimonials</Link>
          <Link to="/about" className="hover:text-orange-500 transition-colors uppercase tracking-widest">About us</Link>
          <Link to="/contact" className="hover:text-orange-500 transition-colors uppercase tracking-widest">Contact</Link>

          <div className="flex items-center gap-3 ml-6">
            {!user && !isAuthPage && (
              <Link to="/login" className="px-6 py-2.5 rounded-full bg-slate-900 text-white font-bold uppercase tracking-widest text-[10px] hover:bg-orange-500 transition-all flex items-center gap-2 shadow-lg">
                <User size={14} />
                Login
              </Link>
            )}
            {user && (
              <div className="flex items-center gap-4 bg-slate-50 px-4 py-2 rounded-full border border-slate-200 shadow-sm">
                <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold text-xs">
                  {user.full_name?.charAt(0) || user.name?.charAt(0) || 'U'}
                </div>
                <span className="text-slate-900 text-[10px] font-bold uppercase tracking-tighter">{user.full_name || user.name}</span>
                <button onClick={handleLogout} className="text-slate-400 hover:text-red-500 transition-all text-[10px] uppercase font-bold border-l border-slate-200 pl-3">Logout</button>
              </div>
            )}
            {!hideBookNow && <Link to="/contact" className="px-8 py-3 rounded-full bg-orange-500 text-white font-bold uppercase tracking-widest text-[10px] hover:bg-slate-900 transition-all shadow-xl shadow-orange-500/20">Book Now</Link>}
          </div>
        </div>

        {/* Mobile Toggle */}
        <button className="lg:hidden text-slate-900" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:hidden bg-[#F8F8F8] border-b border-slate-100 absolute w-full py-8 flex flex-col items-center gap-6 text-slate-900 font-bold uppercase tracking-widest text-xs"
        >
          <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
          <Link to="/destinations" onClick={() => setIsMobileMenuOpen(false)}>Destinations</Link>
          <Link to="/services" onClick={() => setIsMobileMenuOpen(false)}>Services</Link>
          <Link to="/our-difference" onClick={() => setIsMobileMenuOpen(false)}>Our Difference</Link>
          <Link to="/testimonials" onClick={() => setIsMobileMenuOpen(false)}>Testimonials</Link>
          <Link to="/about" onClick={() => setIsMobileMenuOpen(false)}>About us</Link>
          <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)}>Contact</Link>

          <div className="flex flex-col w-full px-8 gap-4 mt-4">
            {!user && !isAuthPage && (
              <Link to="/login" onClick={() => setIsMobileMenuOpen(false)} className="w-full bg-slate-900 text-white py-4 rounded-xl flex justify-center items-center gap-2 font-bold uppercase tracking-widest text-xs">
                <User size={18} />
                Login
              </Link>
            )}
            {user && (
              <div className="flex flex-col gap-4 w-full p-6 bg-slate-50 rounded-2xl border border-slate-100">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                    {user.full_name?.charAt(0) || user.name?.charAt(0) || 'U'}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-slate-900 text-sm font-bold">{user.full_name || user.name}</span>
                    <span className="text-slate-400 text-[10px] tracking-wider">{user.email}</span>
                  </div>
                </div>
                <button onClick={() => { handleLogout(); setIsMobileMenuOpen(false); }} className="w-full py-3 bg-white border border-slate-200 rounded-xl text-red-500 text-[10px] font-bold uppercase tracking-widest shadow-sm">Logout</button>
              </div>
            )}
            {!hideBookNow && <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)} className="w-full bg-orange-500 text-white py-4 rounded-xl flex justify-center items-center font-bold uppercase tracking-widest text-xs shadow-lg shadow-orange-500/20">Book Now</Link>}
          </div>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;
