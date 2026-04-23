import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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

const Home = () => (
  <>
    <Hero />
  </>
);

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="app-container">
        <Navbar />
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
        <WhatsAppWidget />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
