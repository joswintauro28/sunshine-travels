import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Star, MapPin, ArrowRight, Compass, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const DestinationCard = ({ dest, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay: index * 0.1 }}
    viewport={{ once: true }}
    className={`group relative overflow-hidden rounded-[2.5rem] cursor-pointer shadow-2xl ${
      index % 3 === 0 ? 'md:col-span-2 h-[500px]' : 'h-[500px]'
    }`}
  >
    <img
      src={dest.image_url}
      alt={dest.name}
      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent"></div>
    
    <div className="absolute inset-0 p-10 flex flex-col justify-end text-white">
      <div className="flex items-center gap-3 mb-4">
        <div className="bg-orange-500 px-3 py-1 rounded-full flex items-center gap-1">
          <Star size={10} className="fill-white" />
          <span className="text-[10px] font-bold">{dest.rating}</span>
        </div>
        <span className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-60">Elite Choice</span>
      </div>

      <h3 className="text-3xl md:text-5xl font-bold mb-4 group-hover:text-orange-400 transition-colors leading-tight">
        {dest.name}
      </h3>

      <div className="flex items-center gap-2 text-slate-300 text-sm mb-6">
        <MapPin size={14} className="text-orange-400" />
        <span>{dest.location}</span>
      </div>

      <div className="flex items-center justify-between pt-6 border-t border-white/10 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
        <p className="text-gray-400 text-xs font-light max-w-[70%] line-clamp-1">{dest.description || "Uncover the hidden gem."}</p>
        <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center bg-white/10 backdrop-blur-md">
          <ArrowRight size={18} />
        </div>
      </div>
    </div>
  </motion.div>
);

const Destinations = () => {
  const [destinations, setDestinations] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchDestinations = async () => {
      try {
        const response = await axios.get('http://localhost:8000/destinations');
        setDestinations(response.data);
      } catch (error) {
        console.error('Error fetching destinations:', error);
      }
    };
    fetchDestinations();
  }, []);

  return (
    <div className="bg-[#FAF9F6] min-h-screen">
      {/* Compact & High-End Hero */}
      <section className="relative h-[55vh] flex items-center overflow-hidden pt-32">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&q=80&w=2000" 
            alt="Mountains" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 via-slate-900/40 to-transparent"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-2xl text-white space-y-6">
            <motion.span 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="inline-block px-4 py-1.5 rounded-full bg-orange-500 text-[12px] font-bold uppercase tracking-wider"
            >
              Destinations
            </motion.span>
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-5xl md:text-7xl font-bold uppercase"
            >
              Great <br />
              <span className="text-orange-400">Places</span> <br />
              to visit.
            </motion.h1>
          </div>
        </div>
      </section>

      {/* Modern Staggered Grid */}
      <section className="py-24 container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-baseline mb-16 gap-4">
          <div className="space-y-2">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 uppercase">Top Destinations</h2>
            <p className="text-slate-500 max-w-lg">We have picked the best places for you to visit. Explore our exclusive collection.</p>
          </div>
          <div className="flex items-center gap-4 text-orange-500 font-bold uppercase text-[10px] tracking-wider">
            <Sparkles size={16} />
            <span>Best Sellers</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode='popLayout'>
            {destinations.map((dest, index) => (
              <DestinationCard key={dest.id} dest={dest} index={index} />
            ))}
          </AnimatePresence>
        </div>
      </section>

      {/* Feature Strip - Compact */}
      <section className="pb-32 container mx-auto px-6">
        <div className="bg-slate-900 rounded-[3rem] p-12 md:p-16 flex flex-wrap justify-around items-center gap-12 text-white">
          <div className="flex items-center gap-6 group cursor-default">
            <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center group-hover:bg-orange-500 transition-colors">
              <Compass size={24} className="text-orange-400 group-hover:text-white" />
            </div>
            <div>
              <h4 className="font-bold uppercase tracking-widest text-xs">Itineraries</h4>
              <p className="text-[10px] text-gray-500 uppercase tracking-tighter mt-1">100% Bespoke</p>
            </div>
          </div>
          <div className="w-[1px] h-12 bg-white/10 hidden lg:block"></div>
          <div className="flex items-center gap-6 group cursor-default">
            <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center group-hover:bg-orange-500 transition-colors">
              <Star size={24} className="text-orange-400 group-hover:text-white" />
            </div>
            <div>
              <h4 className="font-bold uppercase tracking-widest text-xs">Exclusivity</h4>
              <p className="text-[10px] text-gray-500 uppercase tracking-tighter mt-1">Private Access</p>
            </div>
          </div>
          <div className="w-[1px] h-12 bg-white/10 hidden lg:block"></div>
          <div className="flex items-center gap-6 group cursor-default">
            <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center group-hover:bg-orange-500 transition-colors">
              <Sparkles size={24} className="text-orange-400 group-hover:text-white" />
            </div>
            <div>
              <h4 className="font-bold uppercase tracking-widest text-xs">Support</h4>
              <p className="text-[10px] text-gray-500 uppercase tracking-tighter mt-1">24/7 Global</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Destinations;
