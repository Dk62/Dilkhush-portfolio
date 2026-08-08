import { motion } from 'framer-motion';
import { FaBriefcase, FaBuilding, FaCheckCircle, FaAward } from 'react-icons/fa';

const experiences = [
  {
    role: "Full Stack Development Intern",
    company: "CodeAlpha",
    duration: "Internship",
    badge: "Letter of Recommendation",
    highlights: [
      "Built scalable web components using modern frontend technologies.",
      "Received a Letter of Recommendation highlighting productivity and analytical skills.",
      "Collaborated with virtual engineering team members across asynchronous development sprints.",
      "Adapted to emerging technology stacks under strict development deadlines."
    ]
  },
  {
    role: "Full Stack Development Intern",
    company: "Codveda Technologies",
    duration: "Internship",
    badge: "Verified Internship",
    highlights: [
      "Implemented full-stack functional requirements across backend API endpoints and frontend interfaces.",
      "Worked on structural debugging, bug fixes, and code maintenance.",
      "Contributed to system optimization and database access patterns."
    ]
  }
];

const Experience = () => {
  return (
    <section id="experience" className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-24">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <span className="text-emerald-400 text-sm font-semibold tracking-wider uppercase bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
          Professional Background
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mt-4 mb-4 text-white">
          Work <span className="bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">Experience</span>
        </h2>
        <div className="w-20 h-1 bg-gradient-to-r from-emerald-500 to-teal-400 mx-auto rounded-full mb-6"></div>
        <p className="text-slate-400 max-w-2xl mx-auto text-base">
          Hands-on software development internships building production-ready features, debugging applications, and collaborating with virtual teams.
        </p>
      </motion.div>

      <div className="max-w-4xl mx-auto space-y-8">
        {experiences.map((exp, idx) => (
          <motion.div
            key={exp.company}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.15 }}
            className="bg-slate-900/70 border border-slate-800 p-6 sm:p-8 rounded-2xl hover:border-emerald-500/40 transition-all shadow-xl relative group"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-800/80">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
                  <FaBriefcase size={22} />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-emerald-400 transition-colors">
                    {exp.role}
                  </h3>
                  <div className="flex items-center gap-2 text-slate-300 text-sm font-medium mt-0.5">
                    <FaBuilding size={14} className="text-emerald-400" />
                    <span>{exp.company}</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 sm:self-start">
                <span className="px-3 py-1 text-xs font-semibold rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  {exp.duration}
                </span>
                {exp.badge && (
                  <span className="px-3 py-1 text-xs font-semibold rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/20 flex items-center gap-1">
                    <FaAward size={12} /> {exp.badge}
                  </span>
                )}
              </div>
            </div>

            <ul className="space-y-3">
              {exp.highlights.map((point, i) => (
                <li key={i} className="flex items-start gap-3 text-slate-300 text-sm sm:text-base leading-relaxed">
                  <FaCheckCircle size={16} className="text-emerald-400 mt-1 shrink-0" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Experience;
