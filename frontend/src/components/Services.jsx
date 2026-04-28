import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Hotel, Ticket, Globe, FileText, Briefcase, Heart, CheckCircle2, ArrowRight } from 'lucide-react';

const services = [
  { title: "Hotels", description: "5-star stays and private villas.", icon: Hotel, color: "bg-blue-500" },
  { title: "Flights", description: "Business and first-class travel.", icon: Ticket, color: "bg-orange-500" },
  { title: "Packages", description: "Custom trips planned for you.", icon: Globe, color: "bg-emerald-500" },
  { title: "Visas", description: "Quick and easy documentation.", icon: FileText, color: "bg-purple-500" },
  { title: "Corporate", description: "Business travel solutions.", icon: Briefcase, color: "bg-slate-700" },
  { title: "Special Events", description: "Weddings and anniversaries.", icon: Heart, color: "bg-rose-500" }
];

const Services = () => {
  return (
    <div className="bg-[#FAF9F6] min-h-screen">
      {/* Compact Hero */}
      <section className="relative h-[55vh] flex items-center pt-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80&w=2000"
            alt="Service"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60"></div>
        </div>
        <div className="container mx-auto px-6 relative z-10 text-white">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl">
            <span className="text-orange-500 font-bold uppercase tracking-widest text-xs mb-4 block">What We Do</span>
            <h1 className="text-5xl md:text-6xl font-bold uppercase mb-4 leading-none">Our <span className="text-orange-400">Services</span></h1>
            <p className="text-gray-300 text-xs md:text-base font-bold">We handle all your travel needs with care and expertise.</p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid - Compact */}
      <section className="py-16 container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all group flex items-start gap-6"
            >
              <div className={`w-12 h-12 shrink-0 ${service.color} text-white rounded-xl flex items-center justify-center shadow-lg`}>
                <service.icon size={24} />
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-bold uppercase text-slate-900 group-hover:text-orange-500 transition-colors">{service.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{service.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Process Section - Tight */}
      <section className="py-16 bg-slate-900 text-white">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-4xl font-bold uppercase">Our <span className="text-orange-400">Process</span></h2>
              <div className="grid grid-cols-1 gap-4">
                {[
                  { step: "01", title: "Talk", desc: "Tell us your travel ideas." },
                  { step: "02", title: "Plan", desc: "We find the best options." },
                  { step: "03", title: "Verify", desc: "We check every detail." },
                  { step: "04", title: "Travel", desc: "You go with confidence." }
                ].map((p, i) => (
                  <div key={i} className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl border border-white/10">
                    <span className="text-2xl font-bold text-orange-500">{p.step}</span>
                    <div>
                      <h4 className="font-bold text-sm uppercase">{p.title}</h4>
                      <p className="text-sm text-gray-400">{p.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-orange-500 rounded-[3rem] p-10 text-center space-y-6 shadow-2xl">
              <h3 className="text-3xl font-bold uppercase">Ready to Go?</h3>
              <p className="text-white/90 text-sm">Join thousands of happy travelers today.</p>
              <div className="flex flex-col gap-4">
                <Link to="/contact" className="bg-white text-orange-500 py-4 rounded-2xl font-bold uppercase text-sm hover:bg-slate-900 hover:text-white transition-all">Book Now</Link>
                <Link to="/destinations" className="text-white font-bold uppercase text-[10px] tracking-widest hover:underline">View Destinations</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
