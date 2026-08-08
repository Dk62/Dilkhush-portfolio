import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaFileDownload, FaExternalLinkAlt } from 'react-icons/fa';
import axios from 'axios';

const ResumeSection = () => {
  const [resumeUrl, setResumeUrl] = useState('/resume.pdf');

  useEffect(() => {
    axios.get('/api/content')
      .then(({ data }) => {
        if (data && data.resumeUrl) setResumeUrl(data.resumeUrl);
      })
      .catch((err) => console.warn('Using default resume URL:', err));
  }, []);

  return (
    <section id="resume" className="py-16 md:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-24">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="bg-gradient-to-br from-slate-900 via-slate-900/90 to-slate-950 border border-emerald-500/30 p-8 sm:p-12 rounded-3xl shadow-2xl relative overflow-hidden text-center"
      >
        {/* Ambient background glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 max-w-3xl mx-auto space-y-6">
          <span className="text-emerald-400 text-xs sm:text-sm font-semibold tracking-wider uppercase bg-emerald-500/10 px-3.5 py-1.5 rounded-full border border-emerald-500/20">
            Recruiter Quick Access
          </span>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
            Want to know more about my experience?
          </h2>

          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            Download my resume to explore my technical skills, software projects, academic background, and professional internships.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <a
              href={resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              download="Dilkhush_Kumar_Resume.pdf"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 text-base font-bold rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 hover:from-emerald-400 hover:to-teal-400 transition-all duration-300 shadow-xl shadow-emerald-500/20 transform hover:-translate-y-0.5"
            >
              <FaFileDownload size={18} />
              <span>Download Resume</span>
            </a>

            <a
              href={resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-bold rounded-xl border border-slate-700 bg-slate-950/60 text-slate-200 hover:text-emerald-400 hover:border-emerald-500/40 transition-all duration-300"
            >
              <span>View Online</span>
              <FaExternalLinkAlt size={14} />
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default ResumeSection;
