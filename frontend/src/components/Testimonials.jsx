import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Quote, Star, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const TestimonialCard = ({ testimonial, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    viewport={{ once: true }}
    className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
  >
    <div className="space-y-4">
      <div className="flex gap-1">
        {[...Array(5)].map((_, i) => (
          <Star key={i} size={14} className="fill-orange-400 text-orange-400" />
        ))}
      </div>
      <p className="text-lg text-slate-800 leading-relaxed">
        "{testimonial.content}"
      </p>
    </div>

    <div className="flex items-center gap-4 pt-6 mt-6 border-t border-slate-50">
      <img
        src={testimonial.avatar_url || `https://i.pravatar.cc/150?u=${testimonial.id}`}
        alt={testimonial.name}
        className="w-12 h-12 rounded-xl object-cover shadow-sm"
      />
      <div>
        <h4 className="text-sm font-bold text-slate-900 uppercase tracking-tight leading-none">{testimonial.name}</h4>
        <p className="text-orange-500 text-[10px] font-bold uppercase tracking-widest mt-1">{testimonial.role || "Verified Traveler"}</p>
      </div>
    </div>
  </motion.div>
);

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    content: '',
    avatar_url: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const response = await axios.get('http://localhost:8000/testimonials');
      setTestimonials(response.data);
    } catch (error) {
      console.error('Error fetching testimonials:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'content') {
      const words = value.trim().split(/\s+/);
      if (words.length <= 200 || value.length < formData.content.length) {
        setFormData(prev => ({ ...prev, [name]: value }));
      }
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const wordCount = formData.content.trim() ? formData.content.trim().split(/\s+/).length : 0;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await axios.post('http://localhost:8000/testimonials', formData);
      setSubmitStatus('success');
      setFormData({ name: '', role: '', content: '', avatar_url: '' });
      setShowForm(false);
      fetchTestimonials();
      setTimeout(() => setSubmitStatus(null), 3000);
    } catch (error) {
      console.error('Error submitting testimonial:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-[#FAF9F6] min-h-screen">
      {/* Compact Sophisticated Hero */}
      <section className="relative min-h-[50vh] flex items-center pt-32 pb-16">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&q=80&w=2000"
            alt="Beach"
            className="w-full h-full object-cover opacity-10 grayscale"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#FAF9F6] via-transparent to-[#FAF9F6]"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10 text-center space-y-6">
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-block px-4 py-1.5 rounded-full bg-orange-500 text-white text-[12px] font-bold uppercase tracking-wider"
          >
            Reviews
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-5xl md:text-7xl font-bold text-slate-900"
          >
            Customer <span className="text-orange-500">Stories.</span>
          </motion.h1>
          <div className="w-16 h-1 bg-orange-500 mx-auto"></div>

          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            onClick={() => setShowForm(!showForm)}
            className="mt-8 bg-slate-900 text-white px-8 py-3 rounded-full font-bold text-sm tracking-widest uppercase hover:bg-orange-500 transition-all shadow-lg"
          >
            {showForm ? "Close Form" : "Share Your Story"}
          </motion.button>
        </div>
      </section>

      {/* Feedback Form Section */}
      <AnimatePresence>
        {showForm && (
          <motion.section
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="container mx-auto px-6 overflow-hidden"
          >
            <div className="max-w-2xl mx-auto bg-white p-8 md:p-12 rounded-[2rem] shadow-xl border border-slate-100">
              <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">We value your <span className="text-orange-500">feedback.</span></h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-4">Full Name</label>
                    <input
                      required
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="e.g. John Doe"
                      className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-orange-500 transition-all outline-none text-slate-900"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-4">Your Role</label>
                    <input
                      type="text"
                      name="role"
                      value={formData.role}
                      onChange={handleInputChange}
                      placeholder="e.g. Solo Traveler"
                      className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-orange-500 transition-all outline-none text-slate-900"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center ml-4">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Your Story</label>
                    <span className={`text-[10px] font-bold uppercase tracking-widest ${wordCount >= 200 ? 'text-red-500' : 'text-slate-400'}`}>
                      {wordCount}/200 words
                    </span>
                  </div>
                  <textarea
                    required
                    name="content"
                    value={formData.content}
                    onChange={handleInputChange}
                    placeholder="Tell us about your experience..."
                    rows="4"
                    className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-orange-500 transition-all outline-none text-slate-900 resize-none"
                  ></textarea>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-4">Profile Picture</label>
                  <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-2xl border-2 border-dashed border-slate-200 hover:border-orange-400 transition-all group relative overflow-hidden">
                    {formData.avatar_url ? (
                      <div className="relative w-16 h-16 rounded-xl overflow-hidden shadow-md">
                        <img src={formData.avatar_url} alt="Preview" className="w-full h-full object-cover" />
                        <button
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, avatar_url: '' }))}
                          className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-[10px] font-bold"
                        >
                          Remove
                        </button>
                      </div>
                    ) : (
                      <div className="w-16 h-16 rounded-xl bg-slate-200 flex items-center justify-center text-slate-400">
                        <Quote size={24} />
                      </div>
                    )}
                    <div className="flex-1">
                      <p className="text-xs font-semibold text-slate-600">
                        {formData.avatar_url ? "Photo selected" : "Upload your photo"}
                      </p>
                      <p className="text-[10px] text-slate-400 mt-1">PNG, JPG up to 2MB</p>
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onloadend = () => {
                            setFormData(prev => ({ ...prev, avatar_url: reader.result }));
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                      className="absolute inset-0 opacity-0 cursor-pointer"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-5 bg-orange-500 text-white rounded-2xl font-bold text-sm uppercase tracking-[0.2em] hover:bg-slate-900 transition-all shadow-lg flex items-center justify-center gap-3 disabled:opacity-50"
                >
                  {isSubmitting ? "Submitting..." : "Post Review"}
                  <ArrowRight size={18} />
                </button>
              </form>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* Professional Grid Section */}
      <section className="py-20 container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {testimonials.map((t, index) => (
              <TestimonialCard key={t.id} testimonial={t} index={index} />
            ))}
          </AnimatePresence>
        </div>
      </section>

      {/* Status Notifications */}
      <AnimatePresence>
        {submitStatus && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className={`fixed top-24 right-8 px-8 py-4 rounded-2xl shadow-2xl z-50 font-bold ${submitStatus === 'success' ? 'bg-orange-500 text-white' : 'bg-red-500 text-white'
              }`}
          >
            {submitStatus === 'success' ? 'Feedback pending, until admin approves' : 'Failed to submit. Please try again.'}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Brand Trust Section - Compact */}
      <section className="pb-32 px-6">
        <div className="max-w-5xl mx-auto bg-slate-900 rounded-[3rem] p-12 md:p-16 flex flex-col md:flex-row items-center justify-between gap-12 text-white relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>

          <div className="space-y-4 max-w-xl text-center md:text-left relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold text-orange-400">Ready for your trip?</h2>
            <p className="text-gray-400 font-light leading-relaxed">
              Join thousands of happy travelers who have seen the world with Sunshine Travels.
            </p>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white text-slate-900 px-8 py-4 rounded-full font-bold shadow-xl flex items-center gap-3 relative z-10 hover:bg-orange-500 hover:text-white transition-all"
          >
            Contact Us <ArrowRight size={20} />
          </motion.button>
        </div>
      </section>

      {/* Subtle Brand Strip */}
      <section className="pb-24 container mx-auto px-6">
        <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20 opacity-20 grayscale">
          {['LUXURY ESCAPES', 'TRAVEL INSIDER', 'THE COLLECTIVE', 'VOGUE TRAVEL'].map((brand) => (
            <div key={brand} className="text-sm font-bold tracking-widest text-slate-900">{brand}</div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Testimonials;
