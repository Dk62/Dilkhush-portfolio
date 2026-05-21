import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

const fallbackProjects = [
  {
    _id: '1',
    title: 'College Placement Preparation Portal',
    description: 'A comprehensive mock interview system with a multi-role RBAC framework, JWT security, and an AI Mock Interview engine utilizing NLP feedback logic.',
    image: '/media/ai.jpg',
    techStack: ['React', 'Node.js', 'MongoDB', 'Express', 'AI/NLP'],
    githubLink: '#',
    liveLink: '#',
  },
  {
    _id: '2',
    title: 'JMC Enterprises Business Management System',
    description: 'A real-world enterprise management tool featuring secure backend logic, robust database schemas, and dynamic dashboard reporting.',
    image: '/media/background.jpg',
    techStack: ['React', 'Redux', 'Node.js', 'MySQL', 'Express'],
    githubLink: '#',
    liveLink: '#',
  },
  {
    _id: '3',
    title: 'NextCart E-Commerce Platform',
    description: 'A scalable e-commerce platform with full-stack state management, dynamic user interfaces, and modular backend routing for cart and checkout flows.',
    image: '/media/backgrounds.jpg',
    techStack: ['Vite', 'React', 'Tailwind CSS', 'MongoDB', 'Stripe'],
    githubLink: '#',
    liveLink: '#',
  }
];

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/api/projects');
        setProjects(data.length > 0 ? data : fallbackProjects);
      } catch (error) {
        console.error("Failed to fetch projects, using fallback data", error);
        setProjects(fallbackProjects);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-emerald-400 text-2xl font-bold">Loading Projects...</div>;
  }

  return (
    <div className="py-20 px-6">
      <div className="container mx-auto max-w-7xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Featured <span className="text-emerald-400">Projects</span></h2>
          <div className="w-24 h-1 bg-emerald-400 mx-auto rounded-full mb-8"></div>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto">
            A selection of my best work, demonstrating my ability to build complex, scalable, and beautifully designed web applications.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {projects.map((project, index) => (
            <motion.div 
              key={project._id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-slate-800/80 rounded-2xl overflow-hidden border border-slate-700 hover:border-emerald-500/50 transition-all duration-300 group flex flex-col h-full"
            >
              <div className="relative overflow-hidden h-48 w-full">
                <div className="absolute inset-0 bg-emerald-500/20 group-hover:bg-transparent transition-colors duration-300 z-10"></div>
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-2xl font-bold text-slate-100 mb-3 group-hover:text-emerald-400 transition-colors duration-300">
                  {project.title}
                </h3>
                
                <p className="text-slate-400 text-sm mb-6 flex-grow">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.techStack.map((tech, i) => (
                    <span key={i} className="text-xs font-medium px-2.5 py-1 bg-slate-900 text-emerald-400 rounded-md border border-slate-700">
                      {tech}
                    </span>
                  ))}
                </div>
                
                <div className="flex items-center space-x-4 mt-auto pt-4 border-t border-slate-700">
                  <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="flex items-center text-slate-300 hover:text-white transition-colors duration-300">
                    <FaGithub className="mr-2" size={18} />
                    <span className="text-sm font-medium">Code</span>
                  </a>
                  <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="flex items-center text-emerald-400 hover:text-emerald-300 transition-colors duration-300">
                    <FaExternalLinkAlt className="mr-2" size={16} />
                    <span className="text-sm font-medium">Live Demo</span>
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;
