import { FaGithub, FaLinkedin, FaEnvelope, FaChevronUp } from 'react-icons/fa';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer id="footer" className="bg-slate-950 border-t border-slate-800/80 py-12 px-4 sm:px-6 lg:px-8 text-slate-400 text-sm relative">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        {/* Left Branding */}
        <div className="text-center md:text-left">
          <h3 className="text-xl font-bold text-white tracking-tight">
            Dilkhush <span className="text-emerald-400">Kumar</span>
          </h3>
          <p className="text-xs text-slate-400 mt-1">Full Stack Developer | BCA Graduate</p>
        </div>

        {/* Center Links */}
        <div className="flex items-center gap-6">
          <a
            href="https://github.com/Dk62"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub Profile"
            className="p-2.5 rounded-full bg-slate-900 border border-slate-800 text-slate-300 hover:text-emerald-400 hover:border-emerald-500/40 transition-colors"
          >
            <FaGithub size={18} />
          </a>

          <a
            href="https://www.linkedin.com/in/dilkhush-kumar-950691292/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn Profile"
            className="p-2.5 rounded-full bg-slate-900 border border-slate-800 text-slate-300 hover:text-emerald-400 hover:border-emerald-500/40 transition-colors"
          >
            <FaLinkedin size={18} />
          </a>

          <a
            href="mailto:dilkhushk922@gmail.com"
            aria-label="Send Email"
            className="p-2.5 rounded-full bg-slate-900 border border-slate-800 text-slate-300 hover:text-emerald-400 hover:border-emerald-500/40 transition-colors"
          >
            <FaEnvelope size={18} />
          </a>
        </div>

        {/* Right Copyright & Scroll to Top */}
        <div className="flex items-center gap-4 text-center md:text-right">
          <p className="text-xs text-slate-400">
            © 2026 Dilkhush Kumar. All rights reserved.
          </p>
          <button
            onClick={scrollToTop}
            aria-label="Scroll to top"
            className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 hover:bg-emerald-400 hover:text-slate-950 transition-all"
          >
            <FaChevronUp size={14} />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
