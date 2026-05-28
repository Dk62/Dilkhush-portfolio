import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { HiMenu, HiX } from 'react-icons/hi';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [resumeUrl, setResumeUrl] = useState('/resume.pdf');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    
    // Fetch dynamic resume url
    axios.get('/api/content')
      .then(({ data }) => {
        if (data && data.resumeUrl) setResumeUrl(data.resumeUrl);
      })
      .catch(console.error);
      
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Projects', path: '/projects' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-slate-900/90 backdrop-blur-md shadow-lg py-4' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
          Dilkhush Kumar Portfolio
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex space-x-8 items-center">
          {navLinks.map((link) => (
            <Link key={link.name} to={link.path} className="text-slate-300 hover:text-emerald-400 transition-colors duration-300 font-medium">
              {link.name}
            </Link>
          ))}
          <a href={resumeUrl} target="_blank" rel="noopener noreferrer" className="px-5 py-2 rounded-full border border-emerald-400 text-emerald-400 hover:bg-emerald-400 hover:text-slate-900 transition-all duration-300 font-medium">
            Resume
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <button className="md:hidden text-slate-300 hover:text-white focus:outline-none" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <HiX size={28} /> : <HiMenu size={28} />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="md:hidden absolute top-full left-0 w-full bg-slate-800 shadow-xl py-4 px-6 flex flex-col space-y-4"
        >
          {navLinks.map((link) => (
            <Link key={link.name} to={link.path} className="text-slate-300 hover:text-emerald-400 text-lg font-medium" onClick={() => setIsMobileMenuOpen(false)}>
              {link.name}
            </Link>
          ))}
          <a href={resumeUrl} target="_blank" rel="noopener noreferrer" className="inline-block text-center px-5 py-2 rounded-lg bg-emerald-400 text-slate-900 font-bold" onClick={() => setIsMobileMenuOpen(false)}>
            Resume
          </a>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;
