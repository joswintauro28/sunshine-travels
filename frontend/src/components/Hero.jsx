import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
  const bgUrl = "https://images.unsplash.com/photo-1501179691627-eeaa65ea017c?auto=format&fit=crop&q=80&w=2000";
  return (
    <section className="relative h-screen flex items-center overflow-hidden">
      {/* Background Image with Reference Style Overlay */}
      <motion.div
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${bgUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent"></div>
        <div className="absolute inset-0 bg-black/20"></div>
      </motion.div>

      <div className="container mx-auto px-6 relative z-10 text-left text-white max-w-6xl mt-20">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-7xl font-black mb-8 leading-[0.95] tracking-tighter uppercase"
        >
          Unravel the <br className="hidden lg:block" />
          world's marvels <br className="hidden lg:block" />
          with <span className="text-orange-500">hassle-free</span> <br className="hidden lg:block" />
          travel bundles
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg md:text-xl mb-12 max-w-3xl font-bold opacity-90 leading-relaxed border-l-4 border-orange-500 pl-8"
        >
          Experience personalized journeys crafted with care, expertise, and a&nbsp;passion for creating unforgettable memories
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-wrap gap-4"
        >
          <Link to="/contact" className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-full text-lg font-semibold flex items-center gap-2 transition-all shadow-lg hover:shadow-orange-500/20">
            Plan Your Trip <ChevronRight size={20} />
          </Link>
          <Link to="/destinations" className="bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all">
            Explore Destinations
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
