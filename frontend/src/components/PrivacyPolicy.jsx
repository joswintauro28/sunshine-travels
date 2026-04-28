import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, Eye, FileText, Globe, CheckCircle2 } from 'lucide-react';

const PrivacyPolicy = () => {
  return (
    <div className="bg-[#FAF9F6] min-h-screen pt-24 pb-20">
      {/* Header Section */}
      <section className="bg-slate-900 text-white py-20 mb-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto space-y-6"
          >
            <Shield className="w-16 h-16 text-orange-500 mx-auto mb-4" />
            <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">Privacy <span className="text-orange-400">Policy.</span></h1>
            <p className="text-gray-400 text-lg font-medium leading-relaxed">
              Your trust is our most valuable asset. Learn how we protect your information and ensure your travel data remains private and secure.
            </p>
            <p className="text-xs uppercase tracking-widest text-gray-500 font-bold">Last Updated: April 28, 2026</p>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Section 1: Overview */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-100"
          >
            <div className="flex items-start gap-6">
              <div className="w-12 h-12 bg-orange-50 text-orange-500 rounded-2xl flex items-center justify-center shrink-0">
                <Eye size={24} />
              </div>
              <div className="space-y-4">
                <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight">Data Collection Overview</h2>
                <p className="text-slate-600 leading-relaxed font-medium">
                  At Sunshine Travels, we collect information that helps us provide a personalized and seamless travel experience. This includes your name, contact details, passport information (when required for bookings), and travel preferences.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                  {[
                    "Personal Identifiers (Name, Email)",
                    "Travel Preferences & History",
                    "Payment Information (Securely Processed)",
                    "Technical Logs (IP, Device Info)"
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-3 text-sm font-bold text-slate-500">
                      <CheckCircle2 size={16} className="text-orange-500" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Section 2: How We Use Data */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-100"
          >
            <div className="flex items-start gap-6">
              <div className="w-12 h-12 bg-slate-900 text-white rounded-2xl flex items-center justify-center shrink-0">
                <FileText size={24} />
              </div>
              <div className="space-y-4">
                <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight">How We Use Your Data</h2>
                <p className="text-slate-600 leading-relaxed font-medium">
                  We use your information strictly for travel-related purposes. This includes managing your bookings, notifying you of flight changes, and providing personalized destination recommendations.
                </p>
                <ul className="space-y-3 text-sm text-slate-500 font-medium list-disc pl-5">
                  <li>Processing and confirming hotel and flight reservations.</li>
                  <li>Improving our website services and user experience.</li>
                  <li>Legal compliance with international travel regulations.</li>
                  <li>Occasional newsletters (you can opt-out anytime).</li>
                </ul>
              </div>
            </div>
          </motion.div>

          {/* Section 3: Third Party Sharing */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-100"
          >
            <div className="flex items-start gap-6">
              <div className="w-12 h-12 bg-blue-50 text-blue-500 rounded-2xl flex items-center justify-center shrink-0">
                <Globe size={24} />
              </div>
              <div className="space-y-4">
                <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight">Global Partners & Sharing</h2>
                <p className="text-slate-600 leading-relaxed font-medium">
                  To fulfill your travel needs, we share necessary details with our trusted partners, including airlines, hotels, and local tour operators. We ensure these partners adhere to strict privacy standards.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Section 4: Security */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-slate-900 p-10 rounded-[2.5rem] shadow-2xl text-white relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 rounded-full blur-3xl"></div>
            <div className="flex items-start gap-6 relative z-10">
              <div className="w-12 h-12 bg-orange-500 text-white rounded-2xl flex items-center justify-center shrink-0">
                <Lock size={24} />
              </div>
              <div className="space-y-4">
                <h2 className="text-2xl font-black uppercase tracking-tight">Uncompromising Security</h2>
                <p className="text-gray-400 leading-relaxed font-medium">
                  We use industry-standard encryption (SSL/TLS) to protect your data during transmission. Our servers are monitored 24/7 to prevent unauthorized access and ensure your personal information remains confidential.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Contact Section */}
          <div className="text-center py-10 space-y-4">
            <h3 className="text-xl font-bold text-slate-900 uppercase">Questions about privacy?</h3>
            <p className="text-slate-500 text-sm font-medium">Contact our Data Protection Officer at privacy@sunshinetravels.com</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
