import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <div className="bg-[#FAF9F6] min-h-screen pb-12">
      {/* Compact Hero */}
      <section className="relative h-[40vh] flex items-center overflow-hidden pt-24">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&q=80&w=2000" 
            alt="Adventure" 
            className="w-full h-full object-cover opacity-10 grayscale"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#FAF9F6] via-transparent to-[#FAF9F6]"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10 text-center space-y-4">
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">
            <span className="inline-block px-3 py-1 rounded-full bg-slate-900 text-white text-[9px] font-bold uppercase tracking-widest">
              Our Journey
            </span>
            <h1 className="text-4xl md:text-6xl font-bold text-slate-900 uppercase leading-none tracking-tighter">
              The Sunshine <br />
              <span className="text-orange-500">Legacy.</span>
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Primary About Section - Compact */}
      <section className="py-12 container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          <div className="lg:w-1/2 space-y-6">
            <div className="space-y-3">
              <h2 className="text-2xl md:text-4xl font-bold text-slate-900 uppercase leading-tight">
                Two Decades of <br />
                <span className="text-orange-500">Trusted Excellence</span>
              </h2>
              <p className="text-slate-500 text-sm leading-relaxed max-w-lg">
                Since 2001, we've been crafting journeys that go beyond destinations. It's about the stories, the people, and the memories that last a lifetime.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-6 pt-4 border-t border-slate-100">
              <div className="space-y-0.5">
                <p className="text-2xl font-bold text-slate-900">23+</p>
                <p className="text-[9px] font-bold uppercase tracking-widest text-slate-400">Years</p>
              </div>
              <div className="space-y-0.5">
                <p className="text-2xl font-bold text-slate-900">50K+</p>
                <p className="text-[9px] font-bold uppercase tracking-widest text-slate-400">Travelers</p>
              </div>
              <div className="space-y-0.5">
                <p className="text-2xl font-bold text-slate-900">100%</p>
                <p className="text-[9px] font-bold uppercase tracking-widest text-slate-400">Safe</p>
              </div>
            </div>
          </div>

          <div className="lg:w-1/2 grid grid-cols-2 gap-3">
            <img src="https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&q=80&w=600" alt="Resort" className="rounded-[2rem] shadow-lg w-full h-48 object-cover" />
            <img src="https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&q=80&w=600" alt="Path" className="rounded-[2rem] shadow-lg w-full h-56 object-cover mt-8" />
          </div>
        </div>
      </section>

      {/* STORY BEHIND THE SMILE SECTION - Tightened */}
      <section className="py-12 px-6">
        <div className="max-w-5xl mx-auto bg-[#FDE68A] rounded-[3rem] overflow-hidden shadow-xl">
          <div className="flex flex-col lg:flex-row items-center">
            {/* Image Section */}
            <div className="lg:w-1/2 p-8 lg:p-12 flex justify-center">
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative group"
              >
                <img 
                  src="C:\Users\user\.gemini\antigravity\brain\9cd56183-35e7-430b-af8d-cbfa6d5c988a\media__1776873916644.png" 
                  alt="The Story Behind The Smile" 
                  className="w-full max-w-[320px] h-auto rounded-[2rem] shadow-xl" 
                />
                <div className="absolute -bottom-4 -right-4 bg-white px-4 py-2 rounded-xl shadow-lg hidden md:block">
                  <p className="text-slate-900 font-bold uppercase tracking-widest text-[8px]">Sunshine Travels Office</p>
                </div>
              </motion.div>
            </div>

            {/* Text Content */}
            <div className="lg:w-1/2 p-8 lg:p-12 space-y-6">
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 leading-none">
                THE STORY <br />
                <span className="italic font-serif text-slate-800 text-3xl">Behind</span> THE <span className="text-orange-600">SMILE</span>
              </h2>

              <p className="text-slate-800 text-lg md:text-xl font-medium leading-snug italic">
                "Founded in 2001, we've spent 23 years helping thousands travel hassle-free. 
                We're a woman-led, multilingual, and empathy driven team, ..always just one call away!"
              </p>

              <div className="pt-2">
                <div className="inline-block px-6 py-3 bg-slate-900 text-white rounded-full font-bold uppercase tracking-widest text-[9px]">
                  Our Mission
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values - Compact Strip */}
      <section className="py-12 container mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {['Integrity', 'Empathy', 'Passion', 'Safety'].map((value) => (
            <div key={value} className="space-y-1">
              <h4 className="text-slate-900 font-bold uppercase tracking-[0.2em] text-[10px]">{value}</h4>
              <div className="w-6 h-[1.5px] bg-orange-500 mx-auto"></div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default About;
