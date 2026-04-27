import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Globe, Heart, Shield } from 'lucide-react';

const About = () => {
  return (
    <div className="bg-[#FAF9F6] min-h-screen pb-12 font-sans">
      {/* Ultra-Clear Vibrant Forest Hero */}
      <section className="relative h-[65vh] flex items-center overflow-hidden pt-24">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?auto=format&fit=crop&q=80&w=2400" 
            alt="Ultra Vibrant Forest" 
            className="w-full h-full object-cover"
          />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            animate={{ opacity: 1, y: 0 }} 
            className="max-w-3xl space-y-6"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-500 text-white text-[10px] font-bold uppercase tracking-[0.2em] shadow-xl shadow-orange-500/20">
              <Sparkles size={12} /> Established 2001
            </span>
            <h1 className="text-5xl md:text-6xl font-black text-white uppercase leading-tight tracking-tighter">
              A Legacy of <br />
              <span className="text-orange-400">Excellence.</span>
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Narrative Section - Integrated with Image Content */}
      <section className="py-24 container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-20 items-center">
          <div className="lg:w-1/2 space-y-10 order-2 lg:order-1">
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-[2px] bg-orange-500"></div>
                <span className="text-orange-500 font-black uppercase tracking-[0.3em] text-[10px]">Our Story</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-black text-slate-900 uppercase leading-none tracking-tighter">
                ABOUT <span className="text-orange-500">US.</span>
              </h2>
              <p className="text-slate-600 text-lg leading-relaxed font-medium">
                Sunshine Travels has been dedicated to creating unforgettable travel experiences for 23 years. As a premier travel agency, we pride ourselves on delivering personalized service, expert advice, and seamless travel arrangements to a diverse clientele.
              </p>
              <p className="text-slate-500 text-sm leading-relaxed font-medium italic">
                Our extensive network and industry knowledge enable us to offer exclusive deals and unique experiences, ensuring every journey is as memorable as it is effortless.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-10 pt-4">
              {[
                { label: 'Years of Joy', value: '23' },
                { label: 'Happy Souls', value: '50K+' },
                { label: 'Destinations', value: '100+' },
              ].map((stat) => (
                <div key={stat.label} className="space-y-1">
                  <p className="text-4xl font-black text-slate-900 tracking-tighter">{stat.value}</p>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:w-1/2 relative order-1 lg:order-2">
            <div className="relative">
              {/* Polaroid Style Images from the provided image */}
              <motion.div 
                initial={{ opacity: 0, rotate: -5, x: -20 }}
                whileInView={{ opacity: 1, rotate: -8, x: 0 }}
                viewport={{ once: true }}
                className="bg-white p-4 pb-16 shadow-2xl rounded-sm w-full max-w-[400px] relative z-20 border border-slate-100"
              >
                <img 
                  src="https://images.unsplash.com/photo-1437719417032-8595fd9e9dc6?auto=format&fit=crop&q=80&w=1200" 
                  alt="Dreamy Beach" 
                  className="w-full h-[300px] object-cover" 
                />
                <div className="absolute bottom-6 left-8">
                  <p className="font-handwriting text-slate-400 text-xl tracking-tight">Dreamy Escapes</p>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, rotate: 5, x: 20 }}
                whileInView={{ opacity: 1, rotate: 6, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="bg-white p-4 pb-16 shadow-2xl rounded-sm w-full max-w-[350px] absolute -bottom-24 -right-4 lg:-right-12 z-30 border border-slate-100 hidden md:block"
              >
                <img 
                  src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=800" 
                  alt="Scenic View" 
                  className="w-full h-[250px] object-cover" 
                />
                <div className="absolute bottom-6 left-8">
                  <p className="font-handwriting text-slate-400 text-xl tracking-tight">A Reason to Smile</p>
                </div>
              </motion.div>

              {/* Decorative Travel Doodles */}
              <div className="absolute -top-10 -left-10 w-32 h-32 opacity-10 pointer-events-none rotate-12">
                <Globe size={120} className="text-orange-500" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section - Modern & Elegant Redesign */}
      <section className="py-32 bg-[#F8F9FA] relative overflow-hidden">
        {/* Abstract Background Elements */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-100/30 rounded-full blur-[120px] -mr-64 -mt-64"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-50/50 rounded-full blur-[120px] -ml-64 -mb-64"></div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
            <div className="max-w-2xl space-y-4">
              <span className="text-orange-500 font-black uppercase tracking-[0.4em] text-[10px] block">Excellence in Motion</span>
              <h2 className="text-5xl md:text-7xl font-black text-slate-900 uppercase tracking-tighter leading-none">
                WHY CHOOSE <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-400">SUNSHINE.</span>
              </h2>
            </div>
            <p className="text-slate-400 text-sm font-medium max-w-xs md:text-right border-l-2 md:border-l-0 md:border-r-2 border-orange-500 pl-6 md:pl-0 md:pr-6 py-2">
              We combine two decades of heritage with a forward-thinking approach to modern travel.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {[
              { title: 'Elite Expertise', icon: Shield, desc: 'Decades of industry mastery ensuring your travel is handled by true professionals.' },
              { title: 'Bespoke Journeys', icon: Heart, desc: 'Tailor-made itineraries crafted with surgical precision to match your desires.' },
              { title: 'Global Reach', icon: Globe, desc: 'Access to an exclusive network of destinations spanning all seven continents.' },
              { title: 'Concierge Care', icon: Sparkles, desc: 'Round-the-clock support that feels like having a personal assistant in your pocket.' },
              { title: 'Strategic Alliances', icon: Sparkles, desc: 'Our deep-rooted partnerships unlock doors that remain closed to others.' },
              { title: 'Infinite Solutions', icon: Sparkles, desc: 'Seamless, end-to-end management of every single detail, from A to Z.' },
            ].map((feature, i) => (
              <motion.div 
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="group relative"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500 to-orange-400 rounded-[3rem] opacity-0 group-hover:opacity-100 blur-2xl transition-opacity duration-500"></div>
                <div className="relative bg-white/80 backdrop-blur-xl p-10 md:p-12 rounded-[3rem] border border-white shadow-[0_20px_50px_-20px_rgba(0,0,0,0.05)] hover:shadow-[0_40px_80px_-30px_rgba(249,115,22,0.15)] transition-all duration-500 h-full flex flex-col justify-between">
                  <div>
                    <div className="w-14 h-14 bg-slate-900 text-white rounded-2xl flex items-center justify-center mb-8 group-hover:bg-orange-500 group-hover:scale-110 transition-all duration-500 shadow-lg shadow-slate-900/10">
                      <feature.icon size={24} />
                    </div>
                    <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tight mb-4 group-hover:text-orange-500 transition-colors leading-tight">
                      {feature.title}
                    </h3>
                    <p className="text-slate-500 text-sm leading-relaxed font-medium group-hover:text-slate-600 transition-colors">
                      {feature.desc}
                    </p>
                  </div>
                  <div className="mt-8 pt-6 border-t border-slate-50 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <span className="text-[10px] font-black text-orange-500 uppercase tracking-widest">Learn More</span>
                    <div className="w-8 h-8 rounded-full bg-orange-50 text-orange-500 flex items-center justify-center">
                      <Sparkles size={14} />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* The Smile Section - Restored/Preserved */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto bg-slate-900 rounded-[4rem] overflow-hidden shadow-2xl relative">
          <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/10 rounded-full blur-[100px] -mr-48 -mt-48"></div>
          
          <div className="flex flex-col lg:flex-row items-center relative z-10">
            <div className="lg:w-1/2 p-12 lg:p-20">
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="relative bg-slate-900 rounded-[4rem] p-4 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)]"
              >
                <div className="relative aspect-[3/5] overflow-hidden rounded-[3rem] bg-[#E8F5A2]">
                  <img 
                    src="https://images.unsplash.com/photo-1589156206699-bc21e38c8a7d?auto=format&fit=crop&q=80&w=1200" 
                    alt="Founder" 
                    className="w-full h-full object-cover" 
                  />
                </div>
                <div className="absolute -bottom-4 -right-4 bg-orange-500 text-white px-8 py-3 rounded-2xl shadow-xl">
                  <p className="text-[10px] font-black uppercase tracking-widest">Our Founder</p>
                </div>
              </motion.div>
            </div>

            <div className="lg:w-1/2 p-12 lg:p-20 space-y-10">
              <div className="space-y-4">
                <h2 className="text-5xl md:text-6xl font-black text-white leading-tight tracking-tighter uppercase">
                  THE STORY <br />
                  <span className="text-orange-400">BEHIND THE</span> <br />SMILE.
                </h2>
              </div>

              <p className="text-gray-400 text-xl md:text-2xl font-medium leading-relaxed italic border-l-4 border-orange-500 pl-8">
                "Founded in 2001, we've spent 23 years helping thousands travel hassle-free. We're a woman-led, multilingual, and empathy-driven team, always just one call away."
              </p>

              <div className="pt-4 flex items-center gap-6">
                <div className="flex -space-x-4">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="w-12 h-12 rounded-full border-2 border-slate-900 bg-slate-800 flex items-center justify-center overflow-hidden">
                       <img src={`https://i.pravatar.cc/100?img=${i+15}`} alt="Team member" className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500">23 Years of Trust</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Immersive Tourist Spot Feature */}
      <section className="py-24 px-6 overflow-hidden">
        <div className="container mx-auto">
          <div className="relative rounded-[4rem] overflow-hidden group shadow-2xl h-[500px]">
            <img 
              src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&q=80&w=2400" 
              alt="Breathtaking Destination" 
              className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent"></div>
            
            <div className="absolute bottom-12 left-12 md:bottom-20 md:left-20 max-w-2xl space-y-4">
              <span className="text-orange-500 font-black uppercase tracking-[0.4em] text-[10px]">Your Next Adventure</span>
              <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter leading-none">
                BEYOND <br />
                <span className="text-orange-400">BOUNDARIES.</span>
              </h2>
              <p className="text-white/70 text-lg font-medium leading-relaxed max-w-xl">
                From the peaks of the Alps to the crystal waters of the Maldives, we bring the world's most breathtaking spots closer to you.
              </p>
            </div>

            {/* Floating Badge */}
            <div className="absolute top-12 right-12 md:top-20 md:right-20">
              <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex flex-col items-center justify-center text-white p-4 text-center">
                <p className="text-[8px] md:text-[10px] font-black uppercase tracking-widest leading-tight">World Class Guiding</p>
                <div className="w-8 md:w-12 h-[1px] bg-orange-500 my-2"></div>
                <p className="text-[7px] md:text-[8px] font-bold uppercase text-white/60">Verified Destinations</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sophisticated Values Strip - Preserved */}
      <section className="py-24 container mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-16">
          {[
            { icon: Shield, label: 'Integrity', desc: 'Trust is our foundation.' },
            { icon: Heart, label: 'Empathy', desc: 'We care for your journey.' },
            { icon: Sparkles, label: 'Passion', desc: 'Love for every detail.' },
            { icon: Globe, label: 'Safety', desc: 'Security in every step.' },
          ].map((item) => (
            <div key={item.label} className="space-y-4 group text-center lg:text-left">
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-slate-900 shadow-xl group-hover:bg-orange-500 group-hover:text-white transition-all duration-500 mx-auto lg:mx-0">
                <item.icon size={20} />
              </div>
              <div className="space-y-1">
                <h4 className="text-slate-900 font-bold uppercase tracking-[0.2em] text-[11px]">{item.label}</h4>
                <p className="text-slate-400 text-[10px] font-medium">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};

export default About;
