import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lightbulb, Target, Globe, UserCheck, ArrowRight, Star, CheckCircle2 } from 'lucide-react';

const FeatureItem = ({ icon: Icon, title, description, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    viewport={{ once: true }}
    className="flex gap-4 p-6 bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all group"
  >
    <div className="flex-shrink-0 w-10 h-10 bg-orange-50 text-orange-500 rounded-xl flex items-center justify-center group-hover:bg-orange-500 group-hover:text-white transition-colors duration-300">
      <Icon size={20} />
    </div>
    <div className="space-y-1">
      <h3 className="text-base font-bold text-slate-900 uppercase">{title}</h3>
      <p className="text-slate-500 text-xs leading-relaxed">{description}</p>
    </div>
  </motion.div>
);

const OurDifference = () => {
  const differences = [
    { icon: Lightbulb, title: "20+ Years of Experience", description: "Two decades of planning perfect trips." },
    { icon: Target, title: "Custom Planning", description: "Every trip is unique and made for you." },
    { icon: Globe, title: "Private Access", description: "Unlock places others cannot go." },
    { icon: UserCheck, title: "Expert Team", description: "Led by people who love travel." }
  ];

  return (
    <div className="relative min-h-screen bg-[#FAF9F6] overflow-hidden">
      {/* Classy Background Pattern */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.03]" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/cubes.png")' }}></div>
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-100 rounded-full blur-[120px] opacity-20 -mr-64 -mt-64"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-50 rounded-full blur-[150px] opacity-30 -ml-64 -mb-64"></div>

      <div className="relative z-10">
        {/* Compact Hero Section */}
        <section className="relative h-[55vh] flex items-center pt-24 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img
              src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=2400"
              alt="Tropical Beach"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/50"></div>
          </div>
          <div className="container mx-auto px-6 relative z-10">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl text-white">
              <span className="inline-block px-4 py-1.5 rounded-full bg-orange-500 text-[10px] font-bold uppercase tracking-wider mb-4">Why Us</span>
              <h1 className="text-5xl md:text-6xl font-bold uppercase mb-4">The <span className="text-orange-400">Sunshine</span> <br />Difference.</h1>
              <p className="text-gray-300 text-sm max-w-md">We believe travel is important. Every detail matters for your trip.</p>
            </motion.div>
          </div>
        </section>

        {/* Tight Grid Section */}
        <section className="py-16 container mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-5 space-y-6">
              <div className="w-12 h-1 bg-orange-500"></div>
              <h2 className="text-3xl font-bold text-slate-900 uppercase leading-none">History <br />of Trust</h2>
              <p className="text-slate-500 text-sm leading-relaxed max-w-sm">We design for the modern traveler based on safety and discovery.</p>
              <div className="space-y-3">
                {['Safe Solo Travel', 'Group Tours', 'Easy Logistics', '24/7 Support'].map((item) => (
                  <div key={item} className="flex items-center gap-3 text-slate-700 font-medium">
                    <CheckCircle2 size={16} className="text-orange-500" />
                    <span className="text-xs uppercase font-bold">{item}</span>
                  </div>
                ))}
              </div>
              <Link to="/contact" className="inline-flex items-center gap-2 text-slate-900 font-bold uppercase text-[10px] tracking-widest hover:gap-4 transition-all">
                Start Now <ArrowRight size={14} className="text-orange-500" />
              </Link>
            </div>

            <div className="lg:col-span-7 grid md:grid-cols-2 gap-4">
              {differences.map((diff, index) => <FeatureItem key={index} {...diff} index={index} />)}
              <div className="md:col-span-2 relative mt-4 rounded-3xl overflow-hidden aspect-[16/7] shadow-lg group">
                <img src="https://images.unsplash.com/photo-1530789253388-582c481c54b0?auto=format&fit=crop&q=80&w=1200" alt="Detail" className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110" />
                <div className="absolute inset-0 bg-black/30"></div>
                <div className="absolute bottom-6 left-6 text-white flex items-center gap-4">
                  <Star className="text-orange-400 fill-orange-400" size={24} />
                  <h4 className="text-lg font-bold uppercase">Travel with precision.</h4>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Narrow CTA */}
        <section className="pb-24 px-6">
          <div className="max-w-4xl mx-auto bg-slate-900 rounded-[2.5rem] p-10 text-center text-white relative overflow-hidden">
            <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
            <div className="relative z-10 space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold uppercase">Ready for a better trip?</h2>
              <p className="text-gray-400 text-sm max-w-md mx-auto">Experience the world your way with Sunshine Travels.</p>
              <div className="flex justify-center pt-2">
                <Link to="/contact" className="bg-orange-500 text-white px-8 py-3.5 rounded-full font-bold hover:bg-orange-600 transition-all shadow-xl uppercase text-xs tracking-widest">Contact Us</Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default OurDifference;
