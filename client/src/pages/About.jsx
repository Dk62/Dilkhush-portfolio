import { motion } from 'framer-motion';
import { 
  FaGraduationCap, 
  FaAward, 
  FaReact, 
  FaNodeJs, 
  FaDatabase, 
  FaCode, 
  FaTools,
  FaMapMarkerAlt,
  FaBriefcase
} from 'react-icons/fa';

const skillCategories = [
  {
    category: "Frontend Development",
    icon: FaReact,
    items: ["HTML5", "CSS3", "JavaScript ES6+", "React.js", "Bootstrap"]
  },
  {
    category: "Backend & APIs",
    icon: FaNodeJs,
    items: ["Node.js", "Express.js", "REST APIs"]
  },
  {
    category: "Databases",
    icon: FaDatabase,
    items: ["MySQL", "MongoDB", "Sequelize"]
  },
  {
    category: "Programming Languages",
    icon: FaCode,
    items: ["JavaScript", "Python", "Java", "C", "C++"]
  },
  {
    category: "Developer Tools",
    icon: FaTools,
    items: ["Git", "GitHub", "VS Code", "Postman", "Linux"]
  }
];

const educationData = [
  {
    degree: "Bachelor of Computer Applications (BCA)",
    institution: "Ganga Global Institute of Management Studies",
    location: "Begusarai, Bihar",
    affiliation: "Affiliated with Aryabhatta Knowledge University, Patna",
    duration: "2023 – 2026",
    status: "Pursuing"
  },
  {
    degree: "Higher Secondary School — 12th",
    institution: "MRJD College, Bihar Board",
    location: "Bihar",
    duration: "2020",
    status: "Completed"
  },
  {
    degree: "Secondary School — 10th",
    institution: "Swami Dharmanand Senior Secondary School",
    location: "Haryana",
    duration: "2018",
    status: "Completed"
  }
];

const certificationsData = [
  {
    title: "MERN Stack Development — Delta 7.0",
    issuer: "Apna College",
    date: "Completed"
  },
  {
    title: "MERN Stack Web Development Workshop",
    issuer: "BSQUARE Software Services",
    date: "2-Week Intensive Training"
  },
  {
    title: "Internship Common Aptitude Test",
    issuer: "Participation Certificate",
    date: "Completed"
  }
];

const About = () => {
  return (
    <div className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-24">
      {/* ABOUT ME SECTION */}
      <section id="about" className="scroll-mt-24">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-emerald-400 text-sm font-semibold tracking-wider uppercase bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
            About Me
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mt-4 mb-4 text-white">
            Passionate <span className="bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">Full Stack Developer</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-emerald-500 to-teal-400 mx-auto rounded-full"></div>
        </motion.div>

        {/* 2-COLUMN LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Summary */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 space-y-6 text-slate-300 text-base sm:text-lg leading-relaxed"
          >
            <p className="bg-slate-900/60 p-6 rounded-2xl border border-slate-800/80 shadow-lg">
              I am a BCA graduate and Full Stack Developer based in Begusarai, Bihar. I specialize in building modern, responsive, and scalable web applications using <strong className="text-emerald-400 font-semibold">React.js, Node.js, Express.js, and MySQL / MongoDB</strong>.
            </p>
            <p className="bg-slate-900/60 p-6 rounded-2xl border border-slate-800/80 shadow-lg">
              During my academic journey at Ganga Global Institute of Management Studies, I focused on turning software development principles into functional applications, culminating in my final-year project—an <strong className="text-slate-100 font-semibold">AI-Powered College Placement Preparation Portal</strong> featuring mock interview engines, student performance dashboards, and analytics.
            </p>
            <p className="text-slate-400 text-base">
              Driven by continuous learning, I enjoy solving algorithmic problems, writing clean modular code, and building real-world software. I am actively seeking entry-level software development roles.
            </p>
          </motion.div>

          {/* Right Column: Quick Profile Cards */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            <div className="glass-panel p-5 rounded-2xl border border-slate-800">
              <div className="text-emerald-400 mb-3"><FaGraduationCap size={24} /></div>
              <h3 className="text-xs uppercase tracking-wider text-slate-400 font-semibold">Degree</h3>
              <p className="text-base font-bold text-white mt-1">BCA Graduate</p>
              <p className="text-xs text-slate-400">2023 – 2026</p>
            </div>

            <div className="glass-panel p-5 rounded-2xl border border-slate-800">
              <div className="text-emerald-400 mb-3"><FaBriefcase size={24} /></div>
              <h3 className="text-xs uppercase tracking-wider text-slate-400 font-semibold">Role</h3>
              <p className="text-base font-bold text-white mt-1">Full Stack Developer</p>
              <p className="text-xs text-emerald-400 font-medium">Entry-Level / Fresher</p>
            </div>

            <div className="glass-panel p-5 rounded-2xl border border-slate-800">
              <div className="text-emerald-400 mb-3"><FaMapMarkerAlt size={24} /></div>
              <h3 className="text-xs uppercase tracking-wider text-slate-400 font-semibold">Location</h3>
              <p className="text-base font-bold text-white mt-1">Begusarai, Bihar</p>
              <p className="text-xs text-slate-400">India</p>
            </div>

            <div className="glass-panel p-5 rounded-2xl border border-slate-800">
              <div className="text-emerald-400 mb-3"><FaCode size={24} /></div>
              <h3 className="text-xs uppercase tracking-wider text-slate-400 font-semibold">Current Focus</h3>
              <p className="text-base font-bold text-white mt-1">Web & API Systems</p>
              <p className="text-xs text-slate-400">React + Node + DB</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SKILLS SECTION */}
      <section id="skills" className="scroll-mt-24 pt-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-emerald-400 text-sm font-semibold tracking-wider uppercase bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
            Technical Stack
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold mt-4 mb-4 text-white">
            Skills & <span className="bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">Technologies</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-emerald-500 to-teal-400 mx-auto rounded-full mb-6"></div>
          <p className="text-slate-400 max-w-2xl mx-auto text-base">
            Categorized technical capabilities and tools used to build end-to-end software applications.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((cat, idx) => {
            const IconComponent = cat.icon;
            return (
              <motion.div
                key={cat.category}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-slate-900/70 border border-slate-800 p-6 rounded-2xl hover:border-emerald-500/40 transition-all duration-300 group shadow-lg flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
                      <IconComponent size={24} />
                    </div>
                    <h3 className="text-xl font-bold text-white group-hover:text-emerald-400 transition-colors">
                      {cat.category}
                    </h3>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {cat.items.map((item) => (
                      <span 
                        key={item} 
                        className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-950 text-slate-300 border border-slate-800 hover:border-emerald-500/30 hover:text-emerald-300 transition-colors"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* EDUCATION & CERTIFICATIONS SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 pt-8">
        {/* Education Timeline */}
        <section id="education" className="scroll-mt-24 space-y-8">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <FaGraduationCap size={24} />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white">Education</h3>
              <p className="text-xs text-slate-400">Academic Background</p>
            </div>
          </div>

          <div className="relative border-l-2 border-slate-800 ml-4 space-y-8 py-2">
            {educationData.map((edu, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative pl-7 group"
              >
                <div className="absolute left-[-9px] top-2 w-4 h-4 rounded-full bg-slate-950 border-2 border-emerald-400 group-hover:bg-emerald-400 transition-colors"></div>
                <div className="bg-slate-900/60 border border-slate-800 p-6 rounded-2xl group-hover:border-emerald-500/30 transition-all shadow-md">
                  <div className="flex flex-wrap justify-between items-start gap-2 mb-2">
                    <h4 className="text-lg font-bold text-white group-hover:text-emerald-400 transition-colors">
                      {edu.degree}
                    </h4>
                    <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      {edu.duration}
                    </span>
                  </div>
                  <p className="text-slate-300 font-medium text-sm mb-1">{edu.institution}</p>
                  {edu.affiliation && (
                    <p className="text-xs text-slate-400 italic mb-2">{edu.affiliation}</p>
                  )}
                  <p className="text-xs text-slate-400 flex items-center gap-1.5 mt-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                    Status: <span className="font-semibold text-emerald-400">{edu.status}</span>
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Certifications Grid */}
        <section id="certifications" className="scroll-mt-24 space-y-8">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <FaAward size={24} />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white">Certifications</h3>
              <p className="text-xs text-slate-400">Verified Training & Badges</p>
            </div>
          </div>

          <div className="space-y-6">
            {certificationsData.map((cert, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-slate-900/60 border border-slate-800 p-6 rounded-2xl hover:border-emerald-500/30 transition-all shadow-md group"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0 mt-0.5">
                    <FaAward size={20} />
                  </div>
                  <div>
                    <h4 className="text-base sm:text-lg font-bold text-white group-hover:text-emerald-400 transition-colors mb-1">
                      {cert.title}
                    </h4>
                    <p className="text-sm text-slate-300 font-medium">{cert.issuer}</p>
                    <p className="text-xs text-emerald-400 mt-2 font-medium">{cert.date}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;
