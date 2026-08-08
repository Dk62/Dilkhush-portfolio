import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { 
  FaMapMarkerAlt, 
  FaBriefcase, 
  FaGithub, 
  FaLinkedin, 
  FaFileDownload, 
  FaArrowRight 
} from 'react-icons/fa';

import About from './About';
import Projects from './Projects';
import Experience from '../components/Experience';
import ResumeSection from '../components/ResumeSection';
import Contact from './Contact';

const typingPhrases = [
  'React.js & Node.js Developer',
  'MySQL & MongoDB Databases',
  'REST APIs & Express Backend',
  'BCA Graduate & Continuous Learner'
];

const Home = () => {
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(120);

  useEffect(() => {
    const i = loopNum % typingPhrases.length;
    const fullText = typingPhrases[i];

    const handleTyping = () => {
      if (isDeleting) {
        setText(fullText.substring(0, text.length - 1));
        setTypingSpeed(40);
      } else {
        setText(fullText.substring(0, text.length + 1));
        setTypingSpeed(100);
      }

      if (!isDeleting && text === fullText) {
        setTimeout(() => setIsDeleting(true), 1800);
      } else if (isDeleting && text === '') {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
        setTypingSpeed(400);
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, typingSpeed, loopNum]);

  const scrollToProjects = (e) => {
    e.preventDefault();
    const element = document.getElementById('projects');
    if (element) {
      const navOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  return (
    <div className="space-y-12">
      {/* HERO / HOME SECTION */}
      <section id="home" className="min-h-[calc(100vh-80px)] flex items-center justify-center relative overflow-hidden pt-8 pb-16 px-4 sm:px-6 lg:px-8">
        {/* Background Subtle Gradient Blobs */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-30">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/20 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-teal-500/20 rounded-full blur-[120px]"></div>
        </div>

        <div className="max-w-4xl mx-auto z-10 text-center space-y-8">
          {/* Profile Image Avatar */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="inline-block relative"
          >
            <div className="w-32 h-32 sm:w-40 sm:h-40 mx-auto rounded-full p-1.5 bg-gradient-to-r from-emerald-500 to-teal-400 shadow-2xl shadow-emerald-500/20">
              <img 
                src="/media/profile.jpeg" 
                alt="Dilkhush Kumar" 
                className="w-full h-full rounded-full object-cover border-4 border-slate-950"
                onError={(e) => { e.target.src = '/media/dev.png'; }}
              />
            </div>
            <div className="absolute bottom-1 right-1 w-5 h-5 rounded-full bg-emerald-400 border-2 border-slate-950 animate-pulse" title="Available for opportunities"></div>
          </motion.div>

          {/* Status Badges */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-wrap justify-center items-center gap-3 text-xs sm:text-sm font-semibold"
          >
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-slate-900/90 text-slate-300 border border-slate-800 shadow-sm">
              <FaMapMarkerAlt className="text-emerald-400" />
              <span>Begusarai, Bihar, India</span>
            </span>

            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-sm">
              <FaBriefcase className="text-emerald-400" />
              <span>Open to Software Developer Opportunities</span>
            </span>
          </motion.div>

          {/* Headline & Role */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-3"
          >
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white">
              Hi, I'm <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">Dilkhush Kumar</span>
            </h1>
            
            <p className="text-xl sm:text-2xl font-bold text-slate-300">
              Full Stack Developer
            </p>
          </motion.div>

          {/* Realistic Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-base sm:text-lg md:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed"
          >
            I build modern, responsive, and scalable web applications using React.js, Node.js, Express.js, and MySQL. I enjoy turning ideas into real-world software and continuously improving my development skills through hands-on projects.
          </motion.p>

          {/* Animated Code Typing Display */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="h-10 flex items-center justify-center text-emerald-400 font-mono text-base sm:text-lg"
          >
            <span className="text-slate-500 mr-2">$</span>
            <span>{text}</span>
            <span className="animate-pulse ml-0.5 font-bold">|</span>
          </motion.div>

          {/* Primary Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-2"
          >
            <a
              href="#projects"
              onClick={scrollToProjects}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold text-base transition-all duration-300 shadow-lg shadow-emerald-500/20 transform hover:-translate-y-0.5"
            >
              <span>View My Projects</span>
              <FaArrowRight size={14} />
            </a>

            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              download="Dilkhush_Kumar_Resume.pdf"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl border border-slate-700 bg-slate-900/60 hover:bg-slate-800 text-white hover:text-emerald-400 font-bold text-base transition-all duration-300"
            >
              <FaFileDownload size={16} />
              <span>Download Resume</span>
            </a>
          </motion.div>

          {/* Social Icons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex justify-center items-center gap-4 pt-4"
          >
            <a
              href="https://github.com/Dk62"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-emerald-500/40 transition-colors"
              aria-label="GitHub Profile"
            >
              <FaGithub size={20} />
            </a>

            <a
              href="https://www.linkedin.com/in/dilkhush-kumar-950691292/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-slate-900 border border-slate-800 text-slate-300 hover:text-blue-400 hover:border-emerald-500/40 transition-colors"
              aria-label="LinkedIn Profile"
            >
              <FaLinkedin size={20} />
            </a>
          </motion.div>
        </div>
      </section>

      {/* SEAMLESS SINGLE-PAGE SECTIONS */}
      <About />
      <Projects />
      <Experience />
      <ResumeSection />
      <Contact />
    </div>
  );
};

export default Home;
