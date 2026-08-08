import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { FaGithub, FaExternalLinkAlt, FaCheckCircle, FaLaptopCode } from 'react-icons/fa';

const authenticProjects = [
  {
    _id: 'proj-1',
    title: 'AI-Powered College Placement Portal',
    description: 'A full-stack platform designed to help students prepare for campus placements through placement resources, coding practice, student dashboards, performance analytics, and AI-powered mock interviews.',
    features: [
      'AI Mock Interviews',
      'Student Dashboard',
      'Coding Practice',
      'Placement Preparation',
      'Performance Analytics',
      'Resume Management'
    ],
    techStack: ['React.js', 'Node.js', 'Express.js', 'MySQL'],
    githubLink: 'https://github.com/Dk62/College-placement-preparation-portal-with-AI-mock-interview-system-',
    liveLink: null,
    image: '/media/ai.jpg'
  },
  {
    _id: 'proj-2',
    title: 'JMC Enterprises — Business Management Platform',
    description: 'Full-stack business management application designed to organize and process business transaction data.',
    features: [
      'Full-stack architecture',
      'RESTful backend',
      'Business data management',
      'Dynamic queries'
    ],
    techStack: ['MongoDB', 'Express.js', 'React.js', 'Node.js'],
    githubLink: 'https://github.com/Dk62',
    liveLink: null,
    image: '/media/background.jpg'
  },
  {
    _id: 'proj-3',
    title: 'Wanderlust — Airbnb Clone',
    description: 'Full-stack rental application featuring user authentication, property listings, dynamic reviews, and responsive user interface.',
    features: [
      'Full-stack rental application',
      'Authentication',
      'Responsive UI',
      'Backend integration'
    ],
    techStack: ['Node.js', 'Express.js', 'MongoDB', 'Bootstrap', 'JavaScript'],
    githubLink: 'https://github.com/Dk62',
    liveLink: null,
    image: '/media/bgs.jpg'
  },
  {
    _id: 'proj-4',
    title: 'Spotify UI Clone',
    description: 'Responsive music streaming interface clone focusing on modern UI design and audio interaction.',
    features: [
      'Responsive music streaming interface',
      'Modern UI',
      'Responsive frontend implementation'
    ],
    techStack: ['React', 'CSS', 'Bootstrap'],
    githubLink: 'https://github.com/Dk62',
    liveLink: null,
    image: '/media/bgsm.jpg'
  }
];

const Projects = () => {
  const [projects, setProjects] = useState(authenticProjects);

  useEffect(() => {
    axios.get('/api/projects')
      .then(({ data }) => {
        if (Array.isArray(data) && data.length > 0) {
          // Merge API data with authentic defaults where appropriate
          setProjects(data);
        }
      })
      .catch((err) => {
        console.warn('API fetch fallback to authentic projects:', err);
      });
  }, []);

  return (
    <section id="projects" className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-24">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <span className="text-emerald-400 text-sm font-semibold tracking-wider uppercase bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
          Portfolio Showcase
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mt-4 mb-4 text-white">
          Featured <span className="bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">Projects</span>
        </h2>
        <div className="w-20 h-1 bg-gradient-to-r from-emerald-500 to-teal-400 mx-auto rounded-full mb-6"></div>
        <p className="text-slate-400 max-w-2xl mx-auto text-base">
          Practical web applications demonstrating full-stack architecture, REST APIs, responsive UIs, and real-world system design.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projects.map((project, index) => (
          <motion.div 
            key={project._id || index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-slate-900/70 border border-slate-800 rounded-2xl overflow-hidden hover:border-emerald-500/40 transition-all duration-300 group flex flex-col h-full shadow-xl"
          >
            {/* Project Image Banner */}
            <div className="relative overflow-hidden h-52 w-full bg-slate-950">
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent z-10"></div>
              <img 
                src={project.image || '/media/background.jpg'} 
                alt={project.title} 
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100"
                onError={(e) => { e.target.src = '/media/background.jpg'; }}
              />
              <div className="absolute top-4 right-4 z-20">
                <span className="px-3 py-1 text-xs font-bold rounded-full bg-slate-950/80 text-emerald-400 border border-emerald-500/30 backdrop-blur-sm flex items-center gap-1.5">
                  <FaLaptopCode size={12} /> Full Stack
                </span>
              </div>
            </div>
            
            <div className="p-6 sm:p-8 flex flex-col flex-grow relative z-20 -mt-6">
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 group-hover:text-emerald-400 transition-colors">
                {project.title}
              </h3>
              
              <p className="text-slate-300 text-sm leading-relaxed mb-6">
                {project.description}
              </p>
              
              {/* Features checklist */}
              {project.features && project.features.length > 0 && (
                <div className="mb-6 space-y-2 bg-slate-950/60 p-4 rounded-xl border border-slate-800/80">
                  <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Key Highlights:</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {project.features.map((feat, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-slate-300">
                        <FaCheckCircle size={12} className="text-emerald-400 shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Tech Stack Pills */}
              <div className="flex flex-wrap gap-2 mb-6 mt-auto">
                {project.techStack?.map((tech, i) => (
                  <span key={i} className="text-xs font-medium px-3 py-1 bg-slate-950 text-emerald-300 rounded-lg border border-slate-800">
                    {tech}
                  </span>
                ))}
              </div>
              
              {/* Links */}
              <div className="flex items-center space-x-4 pt-4 border-t border-slate-800 mt-auto">
                {project.githubLink && (
                  <a 
                    href={project.githubLink} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex items-center gap-2 text-sm font-semibold text-slate-300 hover:text-white transition-colors"
                  >
                    <FaGithub size={18} />
                    <span>GitHub Code</span>
                  </a>
                )}
                {project.liveLink && project.liveLink !== '#' && (
                  <a 
                    href={project.liveLink} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex items-center gap-2 text-sm font-semibold text-emerald-400 hover:text-emerald-300 transition-colors"
                  >
                    <FaExternalLinkAlt size={14} />
                    <span>Live Demo</span>
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
