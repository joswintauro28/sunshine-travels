import React, { useState, useEffect } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';
import { Star, MapPin, X, Compass, Sparkles, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const DestinationCard = ({ dest, index, onClick }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    whileInView={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.4, delay: index * 0.05 }}
    viewport={{ once: true }}
    onClick={() => onClick(dest)}
    className="group relative overflow-hidden rounded-2xl cursor-pointer shadow-lg h-[220px] w-full"
  >
    <img
      src={dest.image_url}
      alt={dest.name}
      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/10 to-transparent"></div>
    
    <div className="absolute inset-0 p-4 flex flex-col justify-end text-white">
      <div className="flex items-center gap-1.5 mb-1">
        <div className="bg-orange-500 px-1.5 py-0.5 rounded-full flex items-center gap-0.5">
          <Star size={6} className="fill-white" />
          <span className="text-[7px] font-black">{dest.rating || 5.0}</span>
        </div>
      </div>

      <h3 className="text-sm md:text-base font-black group-hover:text-orange-400 transition-colors leading-tight uppercase tracking-tight line-clamp-1">
        {dest.name}
      </h3>

      <div className="flex items-center gap-1 text-slate-300 text-[8px]">
        <MapPin size={8} className="text-orange-400" />
        <span className="truncate">{dest.location}</span>
      </div>
    </div>
  </motion.div>
);

const Destinations = () => {
  const [destinations, setDestinations] = useState([]);
  const [selectedDest, setSelectedDest] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchDestinations = async () => {
      try {
        const response = await api.get('/destinations');
        setDestinations(response.data);
      } catch (error) {
        console.error('Error fetching destinations:', error);
      }
    };
    fetchDestinations();
  }, []);

  return (
    <div className="bg-white min-h-screen">
      {/* Immersive High-End Hero Section */}
      <section className="relative h-[55vh] flex items-center overflow-hidden pt-20">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&q=80&w=2000" 
            alt="Serene Lake Landscape" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-slate-900/10 to-transparent"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl text-left text-white space-y-4 drop-shadow-2xl">
            <motion.p 
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-orange-500 text-[8px] font-black uppercase tracking-[0.5em]"
            >
              Curated Experiences
            </motion.p>
            <div className="space-y-4">
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl md:text-6xl font-black uppercase leading-none tracking-tighter"
              >
                Our <span className="text-orange-500">Destinations</span>
              </motion.h1>
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: 60 }}
                transition={{ duration: 1, delay: 0.5 }}
                className="h-[2px] bg-orange-500 rounded-full"
              ></motion.div>
            </div>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-xs md:text-base text-white/90 font-medium max-w-lg leading-relaxed"
            >
              Discover the world's most extraordinary destinations, <br className="hidden md:block" /> 
              handpicked and curated for the discerning traveler.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Ultra Compact Grid */}
      <section className="py-16 container mx-auto px-6 max-w-[1600px]">
        <div className="flex items-center justify-between mb-8 border-b border-slate-100 pb-6">
          <div className="flex items-center gap-3">
             <div className="w-1.5 h-6 bg-orange-500 rounded-full"></div>
             <h2 className="text-lg font-black text-slate-900 uppercase tracking-widest">Global Collection</h2>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          <AnimatePresence mode='popLayout'>
            {destinations.map((dest, index) => (
              <DestinationCard key={dest.id} dest={dest} index={index} onClick={setSelectedDest} />
            ))}
          </AnimatePresence>
        </div>
      </section>

      {/* Destination Detail Modal */}
      <AnimatePresence>
        {selectedDest && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedDest(null)}
              className="absolute inset-0 bg-slate-900/95 backdrop-blur-md"
            ></motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative bg-white w-full max-w-6xl rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col md:flex-row h-[85vh] md:h-auto"
            >
              <button 
                onClick={() => setSelectedDest(null)}
                className="absolute top-6 right-6 z-50 p-3 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full text-white md:text-slate-900 transition-colors"
              >
                <X size={24} />
              </button>

              {/* Image Side */}
              <div className="w-full md:w-1/2 h-64 md:h-[600px] relative">
                <img 
                  src={selectedDest.image_url} 
                  alt={selectedDest.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent"></div>
                <div className="absolute bottom-8 left-8 text-white">
                   <div className="flex items-center gap-2 mb-2">
                     <div className="bg-orange-500 px-3 py-1 rounded-full flex items-center gap-1.5">
                       <Star size={12} className="fill-white" />
                       <span className="text-xs font-black">{selectedDest.rating || 5.0}</span>
                     </div>
                   </div>
                   <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight">{selectedDest.name}</h2>
                </div>
              </div>

              {/* Content Side */}
              <div className="w-full md:w-1/2 p-8 md:p-16 flex flex-col bg-white overflow-y-auto">
                <div className="flex items-center gap-2 text-orange-500 font-black text-xs uppercase tracking-[0.3em] mb-6">
                  <MapPin size={16} />
                  <span>{selectedDest.location}</span>
                </div>
                
                <div className="prose prose-slate max-w-none">
                   <h3 className="text-slate-900 text-xl font-black uppercase mb-4 tracking-wider">The Experience</h3>
                   <p className="text-slate-600 text-lg leading-relaxed mb-8 font-medium">
                     {selectedDest.description || "Immerse yourself in the unique beauty of this handpicked destination. Experience unparalleled luxury and authentic local charm curated specifically for our elite travelers."}
                   </p>
                </div>

                <div className="mt-auto pt-8 border-t border-slate-100 flex flex-wrap gap-4">
                  <div className="flex items-center gap-3 text-slate-400 text-[10px] font-black uppercase tracking-widest">
                    <Compass size={16} className="text-orange-500" />
                    <span>Exclusive Itinerary</span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-400 text-[10px] font-black uppercase tracking-widest ml-auto">
                    <Sparkles size={16} className="text-orange-500" />
                    <span>Private Access</span>
                  </div>
                </div>

                <button 
                  onClick={() => navigate('/contact')}
                  className="mt-10 w-full bg-slate-900 text-white py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-orange-500 transition-all active:scale-95 shadow-xl shadow-slate-900/10 flex items-center justify-center gap-3"
                >
                  Inquire Now <ChevronRight size={20} />
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Ultra Compact Feature Strip */}
      <section className="pb-20 container mx-auto px-6">
        <div className="bg-slate-50 border border-slate-100 rounded-[2rem] p-8 flex flex-wrap justify-center items-center gap-12 text-slate-900">
          <div className="flex items-center gap-4 group">
            <Compass size={20} className="text-orange-500" />
            <span className="font-black uppercase tracking-widest text-[10px]">100% Bespoke Itineraries</span>
          </div>
          <div className="w-1 h-1 bg-slate-300 rounded-full hidden lg:block"></div>
          <div className="flex items-center gap-4 group">
            <Star size={20} className="text-orange-500" />
            <span className="font-black uppercase tracking-widest text-[10px]">Private Access Only</span>
          </div>
          <div className="w-1 h-1 bg-slate-300 rounded-full hidden lg:block"></div>
          <div className="flex items-center gap-4 group">
            <Sparkles size={20} className="text-orange-500" />
            <span className="font-black uppercase tracking-widest text-[10px]">24/7 Global Concierge</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Destinations;
