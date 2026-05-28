import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import axios from 'axios';
import * as FaIcons from 'react-icons/fa';

const About = () => {
  const [content, setContent] = useState(null);

  useEffect(() => {
    axios.get('/api/content')
      .then(({ data }) => setContent(data))
      .catch(console.error);
  }, []);

  if (!content) return <div className="min-h-screen flex items-center justify-center text-emerald-400">Loading...</div>;

  return (
    <div className="py-20 px-6">
      <div className="container mx-auto max-w-6xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">About <span className="text-emerald-400">Me</span></h2>
          <div className="w-24 h-1 bg-emerald-400 mx-auto rounded-full mb-8"></div>
          <p className="text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed whitespace-pre-line">
            {content.about.text}
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {content.skills.map((skill, index) => {
            const IconComponent = FaIcons[skill.icon] || FaIcons.FaCode;
            return (
              <div key={index} className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 p-8 rounded-2xl hover:border-emerald-500/50 transition-colors duration-300 group">
                <div className="flex flex-col items-center text-center">
                  <div className="transform group-hover:scale-110 transition-transform duration-300">
                    <IconComponent className="text-4xl mb-4 text-emerald-400" />
                  </div>
                  <h3 className="text-2xl font-bold mb-6 text-slate-100">{skill.category}</h3>
                  <ul className="space-y-3 w-full">
                    {skill.items.map((item, i) => (
                      <li key={i} className="bg-slate-900/50 py-2 px-4 rounded-lg text-slate-300 text-sm font-medium shadow-inner border border-slate-800">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </motion.div>

        {/* Education & Certifications Sections */}
        <div className="mt-24 grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Education Timeline */}
          {content.education && content.education.length > 0 && (
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="space-y-8"
            >
              <div className="flex items-center space-x-4 mb-8">
                <FaIcons.FaGraduationCap className="text-3xl text-emerald-400" />
                <h3 className="text-3xl font-bold text-slate-100">Education</h3>
              </div>
              <div className="relative border-l-2 border-slate-700 ml-4 space-y-8 py-2">
                {content.education.map((edu, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="relative pl-8 group"
                  >
                    {/* Timeline dot */}
                    <div className="absolute left-[-9px] top-1.5 w-4 h-4 rounded-full bg-slate-900 border-2 border-emerald-400 group-hover:bg-emerald-400 group-hover:scale-125 transition-all duration-300 shadow-[0_0_8px_rgba(52,211,153,0.5)]"></div>
                    
                    {/* Educational Card content */}
                    <div className="bg-slate-800/40 backdrop-blur-sm border border-slate-700/60 p-6 rounded-2xl group-hover:border-emerald-500/30 transition-all duration-300 shadow-lg">
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-3">
                        <h4 className="text-xl font-bold text-slate-100 group-hover:text-emerald-400 transition-colors duration-300">
                          {edu.degree}
                        </h4>
                        <span className="text-xs font-semibold px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 whitespace-nowrap self-start">
                          {edu.duration}
                        </span>
                      </div>
                      <p className="text-slate-300 font-medium mb-2">{edu.institution}</p>
                      {edu.score && (
                        <p className="text-sm text-slate-400 flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                          Score: <span className="font-semibold text-emerald-400">{edu.score}</span>
                        </p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Certifications Grid */}
          {content.certifications && content.certifications.length > 0 && (
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="space-y-8"
            >
              <div className="flex items-center space-x-4 mb-8">
                <FaIcons.FaAward className="text-3xl text-emerald-400" />
                <h3 className="text-3xl font-bold text-slate-100">Certifications</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {content.certifications.map((cert, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-slate-800/40 backdrop-blur-sm border border-slate-700/60 p-6 rounded-2xl hover:border-emerald-500/30 hover:-translate-y-1 transition-all duration-300 shadow-lg flex flex-col justify-between group"
                  >
                    <div>
                      <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                        <FaIcons.FaCertificate className="text-xl text-emerald-400" />
                      </div>
                      <h4 className="text-lg font-bold text-slate-100 group-hover:text-emerald-400 transition-colors duration-300 mb-2">
                        {cert.title}
                      </h4>
                      <p className="text-sm text-slate-300 font-medium mb-1">{cert.issuer}</p>
                      <p className="text-xs text-slate-400 mb-4">{cert.date}</p>
                    </div>
                    {cert.verificationLink && (
                      <a 
                        href={cert.verificationLink} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-400 hover:text-emerald-300 transition-colors duration-200 mt-auto self-start"
                      >
                        <span>Verify Credential</span>
                        <FaIcons.FaExternalLinkAlt size={10} className="transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
                      </a>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default About;
