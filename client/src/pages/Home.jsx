import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
  const [content, setContent] = useState(null);
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);

  useEffect(() => {
    axios.get('http://localhost:5000/api/content')
      .then(({ data }) => setContent(data))
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (!content) return;
    const fullText = content.hero.typingText;
    
    const handleTyping = () => {
      if (isDeleting) {
        setText(fullText.substring(0, text.length - 1));
        setTypingSpeed(50);
      } else {
        setText(fullText.substring(0, text.length + 1));
        setTypingSpeed(150);
      }

      if (!isDeleting && text === fullText) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && text === '') {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
        setTypingSpeed(500);
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, typingSpeed, loopNum, content]);

  if (!content) return <div className="min-h-screen flex items-center justify-center text-emerald-400">Loading...</div>;

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center relative overflow-hidden">
      {/* Background Effect */}
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500 rounded-full mix-blend-multiply filter blur-[128px] animate-blob"></div>
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-[128px] animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-32 left-1/2 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-[128px] animate-blob animation-delay-4000"></div>
      </div>

      <div className="container mx-auto px-6 z-10 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <img src="/media/dev.png" alt="Developer Avatar" className="w-32 h-32 mx-auto rounded-full object-cover border-4 border-emerald-500/50 shadow-xl shadow-emerald-500/20" />
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-7xl font-bold tracking-tight mb-6"
        >
          Hi, I'm <span className="bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">{content.hero.headline}</span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto mb-8 whitespace-pre-line"
        >
          {content.hero.subHeadline}
        </motion.p>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="h-8 mb-12 text-emerald-400 font-mono text-lg md:text-xl"
        >
          <span className="mr-1">&gt;</span> {text}<span className="animate-pulse">_</span>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6"
        >
          <Link to="/projects" className="px-8 py-4 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-bold text-lg transition-all duration-300 transform hover:-translate-y-1 w-full sm:w-auto shadow-lg shadow-emerald-500/20">
            View My Work
          </Link>
          <a href={content.resumeUrl.startsWith('http') ? content.resumeUrl : `http://localhost:5000${content.resumeUrl}`} target="_blank" rel="noopener noreferrer" className="px-8 py-4 rounded-full border border-slate-600 hover:border-emerald-400 text-white hover:text-emerald-400 font-bold text-lg transition-all duration-300 w-full sm:w-auto">
            Download Resume
          </a>
        </motion.div>
      </div>
    </div>
  );
};

export default Home;
