import React from 'react';
import { Link } from 'react-router-dom';
import { Camera, MessageCircle, Share2, Mail, Phone, MapPin } from 'lucide-react';
import logo from '../assets/logo.png';

const Footer = () => {
  return (
    <footer className="bg-primary-navy text-white pt-20 pb-10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <img src={logo} alt="Sunshine Travels Logo" className="h-32 w-auto object-contain" />
            </div>
            <p className="text-gray-400">Making your luxury travel dreams come true with exclusive packages and premium service since 2010.</p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full border border-gray-700 flex items-center justify-center hover:bg-orange-500 transition-colors"><Camera size={20} /></a>
              <a href="#" className="w-10 h-10 rounded-full border border-gray-700 flex items-center justify-center hover:bg-orange-500 transition-colors"><MessageCircle size={20} /></a>
              <a href="#" className="w-10 h-10 rounded-full border border-gray-700 flex items-center justify-center hover:bg-orange-500 transition-colors"><Share2 size={20} /></a>
            </div>
          </div>

          <div>
            <h4 className="text-xl font-bold mb-8">Quick Links</h4>
            <ul className="space-y-4 text-gray-400">
              <li><Link to="/destinations" className="hover:text-orange-400 transition-colors">Destinations</Link></li>
              <li><Link to="/services" className="hover:text-orange-400 transition-colors">Our Services</Link></li>
              <li><Link to="/about" className="hover:text-orange-400 transition-colors">About Us</Link></li>
              <li><Link to="#" className="hover:text-orange-400 transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xl font-bold mb-8">Contact Info</h4>
            <ul className="space-y-4 text-gray-400">
              <li className="flex items-start gap-3">
                <MapPin size={20} className="text-orange-500 mt-1 flex-shrink-0" /> 
                <span>Ground Floor, Tiger Circle, Academy Tower, Manipal, Karnataka 576104<br/><span className="text-xs opacity-75">(Located in: Hotel Green Park Suites)</span></span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={20} className="text-orange-500" /> 
                +91 98802 32901
              </li>
              <li className="flex items-center gap-3"><Mail size={20} className="text-orange-500" /> hello@sunshinetravels.com</li>
            </ul>
          </div>

          <div>
            <h4 className="text-xl font-bold mb-8 uppercase tracking-widest text-[13px]">Find Us</h4>
            <div className="group relative w-full h-40 rounded-3xl overflow-hidden shadow-2xl border border-white/10">
              <img 
                src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&q=80&w=600" 
                alt="Map Preview" 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-125"
              />
              <div className="absolute inset-0 bg-slate-900/60 group-hover:bg-slate-900/40 transition-colors flex flex-col items-center justify-center p-4 text-center">
                <MapPin size={32} className="text-orange-500 mb-2 transform group-hover:scale-125 transition-transform" />
                <p className="text-white font-bold uppercase tracking-widest text-[10px]">Open in Google Maps</p>
                <a 
                  href="https://www.google.com/maps/place/Sunshine+Travels+and+Holidays/@13.351632,74.784991,16z/data=!4m14!1m7!3m6!1s0x3bbca51cac348ccd:0x1f114dc0c7a1352c!2sSunshine+Travels+and+Holidays!8m2!3d13.351605!4d74.7875424!16s%2Fg%2F11gnsd3jpb!3m5!1s0x3bbca51cac348ccd:0x1f114dc0c7a1352c!8m2!3d13.351605!4d74.7875424!16s%2Fg%2F11gnsd3jpb?entry=ttu&g_ep=EgoyMDI2MDQxOS4wIKXMDSoASAFQAw%3D%3D" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="absolute inset-0 z-10"
                >
                  <span className="sr-only">Sunshine Travels on Google Maps</span>
                </a>
              </div>
            </div>
          </div>
        </div>
        
        {/* Connects Section */}
        <div className="mb-16 p-8 bg-orange-500 rounded-[2rem] text-white">
          <h4 className="text-xl font-bold mb-6 uppercase tracking-widest">Looking for connects with:</h4>
          <ul className="grid grid-cols-1 md:grid-cols-3 gap-6 font-bold text-sm">
            <li className="flex gap-3">
              <span className="text-2xl">•</span>
              <span>MR. ROHIT – REEM INDUSTRIES,<br/>INDUSTRIAL AREA, MANIPAL</span>
            </li>
            <li className="flex gap-3">
              <span className="text-2xl">•</span>
              <span>MR. ARNOLD MENEZES – FOUNDER & DIRECTOR,<br/>NATURYA FRESH FOODS</span>
            </li>
            <li className="flex gap-3">
              <span className="text-2xl">•</span>
              <span>MS. SHIPRA RAI – VICE PRESIDENT,<br/>PEOPLE OPERATIONS, NIVEUS SOLUTIONS</span>
            </li>
          </ul>
        </div>

        <div className="pt-8 border-t border-gray-800 text-center text-gray-500 text-sm">
          <p>© 2026 Sunshine Travels. All rights reserved. Designed with passion.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
