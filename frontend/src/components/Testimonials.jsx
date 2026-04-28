import React, { useState, useEffect } from 'react';
import api from '../api';
import { Quote, Star, ArrowRight, X, Image as ImageIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const TestimonialCard = ({ testimonial, index, onClick }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    viewport={{ once: true }}
    onClick={() => onClick(testimonial)}
    className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer group flex flex-col justify-between h-full"
  >
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div className="flex gap-1">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={14}
              className={i < (testimonial.rating || 5) ? "fill-orange-400 text-orange-400" : "text-slate-200"}
            />
          ))}
        </div>
        <Quote className="text-slate-100 group-hover:text-orange-100 transition-colors" size={40} />
      </div>
      <p className="text-lg text-slate-800 leading-relaxed line-clamp-4 italic">
        "{testimonial.content}"
      </p>
      <div className="pt-2">
        <span className="text-[10px] font-black text-orange-500 uppercase tracking-widest group-hover:underline flex items-center gap-2">
          Read Full Story <ArrowRight size={12} />
        </span>
      </div>
    </div>

    <div className="flex items-center gap-4 pt-6 mt-8 border-t border-slate-50">
      <img
        src={testimonial.avatar_url || `https://i.pravatar.cc/150?u=${testimonial.id}`}
        alt={testimonial.name}
        className="w-11 h-11 rounded-xl object-cover shadow-sm ring-4 ring-slate-50"
      />
      <div>
        <h4 className="text-md font-black text-slate-900 uppercase tracking-tight leading-none">{testimonial.name}</h4>
        <p className="text-orange-500 text-[10px] font-bold uppercase tracking-widest mt-1.5">{testimonial.role || "Verified Traveler"}</p>
      </div>
    </div>
  </motion.div>
);

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedTestimonial, setSelectedTestimonial] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    content: '',
    avatar_url: '',
    rating: 5
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const response = await api.get('/testimonials');
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
      await api.post('/testimonials', formData);
      setSubmitStatus('success');
      setFormData({ name: '', role: '', content: '', avatar_url: '', rating: 5 });
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
    <div className="bg-[#FAF9F6] min-h-screen relative">
      {/* Refined Large Testimonial Modal */}
      <AnimatePresence>
        {selectedTestimonial && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10 bg-slate-900/90 backdrop-blur-md"
            onClick={() => setSelectedTestimonial(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white w-full max-w-6xl h-full max-h-[85vh] rounded-[3rem] overflow-hidden shadow-2xl flex flex-col md:flex-row relative"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedTestimonial(null)}
                className="absolute top-6 right-6 z-50 w-10 h-10 bg-slate-900 text-white rounded-full flex items-center justify-center hover:bg-orange-500 transition-all shadow-lg"
              >
                <X size={20} />
              </button>

              {/* Left Side: Immersive Image */}
              <div className="md:w-5/12 h-56 md:h-full relative bg-slate-900 flex items-center justify-center">
                <img
                  src={selectedTestimonial.avatar_url || `https://i.pravatar.cc/800?u=${selectedTestimonial.id}`}
                  alt={selectedTestimonial.name}
                  className="w-full h-full object-contain"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent md:hidden"></div>
              </div>

              {/* Right Side: Scrollable Content */}
              <div className="md:w-7/12 h-full flex flex-col">
                <div className="p-8 md:p-16 overflow-y-auto custom-scrollbar flex-1">
                  <div className="space-y-8">
                    <div className="space-y-2">
                      <div className="flex gap-1 mb-4">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={18}
                            className={i < (selectedTestimonial.rating || 5) ? "fill-orange-400 text-orange-400" : "text-slate-200"}
                          />
                        ))}
                      </div>
                      <h3 className="text-4xl md:text-6xl font-black text-slate-900 uppercase tracking-tighter leading-none">
                        {selectedTestimonial.name}
                      </h3>
                      <p className="text-orange-500 font-bold uppercase tracking-[0.3em] text-[10px]">
                        {selectedTestimonial.role || "Verified Traveler"}
                      </p>
                    </div>

                    <div className="relative pt-4">
                      <Quote className="absolute -top-4 -left-4 text-slate-50" size={80} />
                      <p className="relative z-10 text-lg md:text-2xl text-slate-700 font-medium leading-relaxed italic">
                        "{selectedTestimonial.content}"
                      </p>
                    </div>

                    <div className="pt-10 flex items-center gap-6">
                      <div className="w-12 h-[2px] bg-orange-500"></div>
                      <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-300">End of story</p>
                    </div>
                  </div>
                </div>

                {/* Fixed Footer inside Modal */}
                <div className="px-8 md:px-16 py-6 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                  <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Published on Sunshine Travels</p>
                  <button onClick={() => setSelectedTestimonial(null)} className="text-slate-900 font-black uppercase tracking-widest text-[9px] hover:text-orange-500 transition-colors">Close</button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Compact Sophisticated Hero */}
      <section className="relative min-h-[50vh] flex items-center pt-32 pb-16">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&q=80&w=2000"
            alt="Beach"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-slate-900/10"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent"></div>
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
            className="text-5xl md:text-7xl font-bold text-white uppercase tracking-tighter drop-shadow-2xl"
          >
            Customer <span className="text-orange-500 italic">Stories.</span>
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
            className="container mx-auto px-6 overflow-hidden pb-12"
          >
            <div className="max-w-2xl mx-auto bg-white p-8 md:p-12 rounded-[2rem] shadow-xl border border-slate-100">
              <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center uppercase tracking-tighter">We value your <span className="text-orange-500">feedback.</span></h2>

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

                <div className="space-y-3">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-4">Your Rating</label>
                  <div className="flex gap-3 ml-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, rating: star }))}
                        className="transition-all hover:scale-110 active:scale-95"
                      >
                        <Star
                          size={28}
                          className={star <= formData.rating ? "fill-orange-500 text-orange-500" : "text-slate-200"}
                        />
                      </button>
                    ))}
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
                        <ImageIcon size={24} />
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
              <TestimonialCard key={t.id} testimonial={t} index={index} onClick={setSelectedTestimonial} />
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
            <h2 className="text-3xl md:text-4xl font-bold text-orange-400 uppercase tracking-tight">Ready for your trip?</h2>
            <p className="text-gray-400 font-light leading-relaxed">
              Join thousands of happy travelers who have seen the world with Sunshine Travels.
            </p>
          </div>

          <Link to="/contact">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-slate-900 px-8 py-4 rounded-full font-bold shadow-xl flex items-center gap-3 relative z-10 hover:bg-orange-500 hover:text-white transition-all uppercase tracking-widest text-xs"
            >
              Contact Us <ArrowRight size={20} />
            </motion.button>
          </Link>
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
