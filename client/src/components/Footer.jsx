import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-slate-900 border-t border-slate-800 py-8">
      <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0 text-center md:text-left">
          <h3 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
            Dilkhush Kumar
          </h3>
          <p className="text-slate-400 text-sm mt-1">Full-Stack MERN Developer & AI Integration Enthusiast.</p>
        </div>

        <div className="flex space-x-6">
          <a href="https://github.com/Dk62" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors duration-300">
            <FaGithub size={24} />
          </a>
          <a href="www.linkedin.com/in/dilkhush-922-kumar" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors duration-300">
            <FaLinkedin size={24} />
          </a>

        </div>
      </div>
      <div className="text-center mt-8 text-slate-500 text-sm">
        &copy; {new Date().getFullYear()} Dilkhush Kumar. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
