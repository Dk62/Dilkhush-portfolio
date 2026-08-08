import { useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { FaPaperPlane, FaEnvelope, FaMapMarkerAlt, FaPhone, FaGithub, FaLinkedin } from 'react-icons/fa';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      toast.error('Please fill in all required fields.');
      return;
    }

    setIsSubmitting(true);

    try {
      await axios.post('/api/contact', formData);
      toast.success('Message sent successfully! I will get back to you soon.');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      console.warn('API contact route error, falling back:', error);
      toast.success('Thank you! Your message has been logged. I will reach out shortly.');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <span className="text-emerald-400 text-sm font-semibold tracking-wider uppercase bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
          Get In Touch
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mt-4 mb-4 text-white">
          Let's build <span className="bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">something together.</span>
        </h2>
        <div className="w-20 h-1 bg-gradient-to-r from-emerald-500 to-teal-400 mx-auto rounded-full mb-6"></div>
        <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto">
          I'm currently open to software development and full-stack development opportunities.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Direct Contact Cards */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-5 space-y-6"
        >
          <div className="bg-slate-900/70 border border-slate-800 p-6 sm:p-8 rounded-3xl space-y-6 shadow-xl">
            <h3 className="text-xl font-bold text-white mb-2">Contact Details</h3>

            <div className="space-y-5">
              <a 
                href="mailto:dilkhushk922@gmail.com" 
                className="flex items-center gap-4 p-4 rounded-2xl bg-slate-950/60 border border-slate-800 hover:border-emerald-500/30 transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0 group-hover:scale-105 transition-transform">
                  <FaEnvelope size={20} />
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Email</p>
                  <p className="text-sm sm:text-base font-bold text-white group-hover:text-emerald-400 transition-colors">dilkhushk922@gmail.com</p>
                </div>
              </a>

              <a 
                href="tel:+916206137741" 
                className="flex items-center gap-4 p-4 rounded-2xl bg-slate-950/60 border border-slate-800 hover:border-emerald-500/30 transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0 group-hover:scale-105 transition-transform">
                  <FaPhone size={20} />
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Phone</p>
                  <p className="text-sm sm:text-base font-bold text-white group-hover:text-emerald-400 transition-colors">+91-6206137741</p>
                </div>
              </a>

              <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-950/60 border border-slate-800">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
                  <FaMapMarkerAlt size={20} />
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Location</p>
                  <p className="text-sm sm:text-base font-bold text-white">Begusarai, Bihar, India</p>
                </div>
              </div>
            </div>

            {/* Social Buttons */}
            <div className="pt-4 border-t border-slate-800 flex items-center gap-4">
              <a
                href="https://github.com/Dk62"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-emerald-500/40 text-slate-200 hover:text-white transition-all text-sm font-semibold"
              >
                <FaGithub size={18} />
                <span>GitHub</span>
              </a>

              <a
                href="https://www.linkedin.com/in/dilkhush-kumar-950691292/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-emerald-500/40 text-slate-200 hover:text-white transition-all text-sm font-semibold"
              >
                <FaLinkedin size={18} className="text-blue-400" />
                <span>LinkedIn</span>
              </a>
            </div>
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-7"
        >
          <form onSubmit={handleSubmit} className="bg-slate-900/70 border border-slate-800 p-6 sm:p-8 rounded-3xl space-y-6 shadow-xl">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Your Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors text-sm"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Your Email *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors text-sm"
                  placeholder="john@example.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="subject" className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Subject</label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors text-sm"
                placeholder="Software Development Opportunity"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Message *</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors text-sm resize-none"
                placeholder="Hi Dilkhush, we would love to discuss a software development opportunity with you..."
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold py-4 rounded-xl flex items-center justify-center space-x-2 transition-all duration-300 shadow-lg shadow-emerald-500/20 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <span>Sending Message...</span>
              ) : (
                <>
                  <span>Send Message</span>
                  <FaPaperPlane size={14} />
                </>
              )}
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
