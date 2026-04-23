import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';

import Destinations from './components/Destinations';
import Testimonials from './components/Testimonials';
import About from './components/About';
import Contact from './components/Contact';
import Auth from './components/Auth';
import OurDifference from './components/OurDifference';
import Services from './components/Services';
import ScrollToTop from './components/ScrollToTop';
import Footer from './components/Footer';
import WhatsAppWidget from './components/WhatsAppWidget';

import AdminDashboard from './components/AdminDashboard';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const WelcomePopup = () => {
  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    const hasSeenWelcome = localStorage.getItem('hasSeenWelcome');
    if (!hasSeenWelcome) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1500); // Show after 1.5s
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    localStorage.setItem('hasSeenWelcome', 'true');
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-md">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="bg-white rounded-[2.5rem] shadow-2xl w-full max-w-lg relative overflow-hidden text-center p-12"
          >
            {/* Background Accent */}
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-orange-500 to-orange-400"></div>
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-orange-500/5 rounded-full blur-3xl"></div>
            
            <button
              onClick={handleClose}
              className="absolute top-6 right-6 p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
            >
              <X size={20} />
            </button>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-6 inline-flex items-center justify-center w-20 h-20 bg-orange-50 rounded-3xl text-orange-500"
            >
              <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl font-black text-slate-900 mb-4 tracking-tight"
            >
              Welcome to <span className="text-orange-500">Sunshine</span>
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-slate-600 text-lg mb-10 leading-relaxed font-medium"
            >
              Discover the world's most extraordinary destinations curated just for you. Your next adventure starts now.
            </motion.p>

            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              onClick={handleClose}
              className="w-full bg-[#0B1120] text-white py-5 rounded-2xl font-bold text-lg hover:bg-slate-800 transition-all shadow-xl shadow-slate-900/20 active:scale-95"
            >
              Start Exploring
            </motion.button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

const Home = () => (
  <>
    <WelcomePopup />
    <Hero />
  </>
);

const AppLayout = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <div className="app-container">
      {!isAdminRoute && <Navbar />}
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/destinations" element={<Destinations />} />
          <Route path="/services" element={<Services />} />
          <Route path="/our-difference" element={<OurDifference />} />
          <Route path="/testimonials" element={<Testimonials />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Auth />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </main>
      {!isAdminRoute && <WhatsAppWidget />}
      {!isAdminRoute && <Footer />}
    </div>
  );
};

function App() {
  return (
    <Router>
      <ScrollToTop />
      <AppLayout />
    </Router>
  );
}

export default App;
