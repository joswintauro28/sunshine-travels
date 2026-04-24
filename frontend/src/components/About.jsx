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

      {/* Narrative Section */}
      <section className="py-24 container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-20 items-center">
          <div className="lg:w-1/2 space-y-10">
            <div className="space-y-6">
              <div className="w-12 h-[2px] bg-orange-500"></div>
              <h2 className="text-3xl md:text-5xl font-black text-slate-900 uppercase leading-none tracking-tighter">
                Crafting <span className="text-orange-500">Unique</span> <br />Experiences.
              </h2>
              <p className="text-slate-600 text-sm leading-relaxed font-medium">
                For over two decades, Sunshine Travels has been the silent architect behind some of the world's most beautiful journeys. We don't just book trips; we curate moments that stay with you forever.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-10">
              {[
                { label: 'Years', value: '23+' },
                { label: 'Travelers', value: '50K+' },
                { label: 'Rating', value: '5.0' },
              ].map((stat) => (
                <div key={stat.label} className="space-y-1">
                  <p className="text-4xl font-black text-slate-900 tracking-tighter">{stat.value}</p>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:w-1/2 relative">
            <div className="grid grid-cols-2 gap-4">
              <motion.img 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                src="https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&q=80&w=800" 
                alt="Clear Resort" 
                className="rounded-[3rem] shadow-2xl w-full h-[400px] object-cover" 
              />
              <motion.img 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                src="https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&q=80&w=800" 
                alt="Coastal View" 
                className="rounded-[3rem] shadow-2xl w-full h-[400px] object-cover mt-12" 
              />
            </div>
          </div>
        </div>
      </section>

      {/* The Smile Section - Reimagined */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto bg-slate-900 rounded-[4rem] overflow-hidden shadow-2xl relative">
          <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/10 rounded-full blur-[100px] -mr-48 -mt-48"></div>
          
          <div className="flex flex-col lg:flex-row items-center relative z-10">
            <div className="lg:w-1/2 p-12 lg:p-20">
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative"
              >
                <img 
                  src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=1200" 
                  alt="Team Leadership" 
                  className="w-full aspect-[4/5] object-cover rounded-[3rem] shadow-2xl border border-white/10" 
                />
                <div className="absolute -bottom-6 -right-6 bg-orange-500 text-white p-6 rounded-[2rem] shadow-2xl">
                  <p className="text-[10px] font-black uppercase tracking-widest">Our Spirit</p>
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

      {/* Sophisticated Values Strip */}
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
