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
    { icon: Lightbulb, title: "25+ Years of Experience", description: "Quarter century of planning perfect trips." },
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

        {/* Enhanced History of Trust with Timeline */}
        <section className="py-32 container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-12">
              <div className="space-y-6">
                <span className="text-orange-500 font-black uppercase tracking-[0.4em] text-[10px]">A Legacy of Trust</span>
                <h2 className="text-5xl md:text-7xl font-black text-slate-900 uppercase tracking-tighter leading-none">
                  HISTORY <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-400">OF EXCELLENCE.</span>
                </h2>
                <p className="text-slate-500 text-lg font-medium leading-relaxed max-w-lg">
                  Since our inception, we have been redefined the standards of luxury travel through unwavering commitment and visionary planning.
                </p>
              </div>

              <div className="space-y-8 relative">
                <div className="absolute left-[11px] top-2 bottom-2 w-[2px] bg-slate-100"></div>
                {[
                  { year: '2001', event: 'Founded in the heart of Karnataka with a vision for elite travel.' },
                  { year: '2012', event: 'Expanded our reach to 50+ international luxury partners.' },
                  { year: '2020', event: 'Pioneered bespoke "Safe-Solo" journeys for modern explorers.' },
                  { year: '2026', event: 'Celebrating 25 years of creating unforgettable memories.' }
                ].map((item, idx) => (
                  <motion.div 
                    key={item.year}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex gap-8 relative z-10"
                  >
                    <div className="w-6 h-6 rounded-full bg-white border-4 border-orange-500 shadow-lg shrink-0"></div>
                    <div className="space-y-1">
                      <span className="text-orange-500 font-black text-xl leading-none">{item.year}</span>
                      <p className="text-slate-600 font-medium text-sm leading-relaxed">{item.event}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-4 bg-orange-500/10 rounded-[3rem] blur-3xl -z-10 animate-pulse"></div>
              <div className="grid grid-cols-2 gap-4">
                {differences.map((diff, index) => <FeatureItem key={index} {...diff} index={index} />)}
                <div className="col-span-2 relative mt-4 rounded-[3rem] overflow-hidden aspect-video shadow-2xl group">
                  <img src="https://images.unsplash.com/photo-1530789253388-582c481c54b0?auto=format&fit=crop&q=80&w=1200" alt="Detail" className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent"></div>
                  <div className="absolute bottom-8 left-8 text-white">
                    <div className="flex items-center gap-3 mb-2">
                      <Star className="text-orange-500 fill-orange-500" size={20} />
                      <span className="text-xs font-black uppercase tracking-widest">Travel with precision.</span>
                    </div>
                    <p className="text-white/70 text-xs font-medium max-w-xs">Curated by our expert team of luxury travel designers.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Dynamic Global Numbers Section */}
        <section className="py-24 bg-slate-900 text-white overflow-hidden relative">
          <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
          <div className="container mx-auto px-6 relative z-10">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 text-center">
              {[
                { label: 'Destinations', value: '100+', sub: 'World Wide' },
                { label: 'Happy Travelers', value: '25K+', sub: 'Returning Clients' },
                { label: 'Years Experience', value: '25+', sub: 'Legacy of Trust' },
                { label: 'Success Rate', value: '99%', sub: 'Perfect Execution' }
              ].map((stat, i) => (
                <motion.div 
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="space-y-2"
                >
                  <div className="text-5xl md:text-7xl font-black text-orange-500 tracking-tighter">{stat.value}</div>
                  <div className="text-xs font-black uppercase tracking-[0.3em] text-white/40">{stat.label}</div>
                  <div className="text-[10px] font-bold text-white/20 uppercase tracking-widest">{stat.sub}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Narrow CTA */}
        <section className="py-32 px-6">
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
