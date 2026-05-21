const mongoose = require('mongoose');

const skillCategorySchema = new mongoose.Schema({
  category: { type: String, required: true },
  icon: { type: String, required: true }, // Store icon name (e.g., 'FaReact', 'FaNodeJs')
  items: [{ type: String, required: true }]
});

const educationSchema = new mongoose.Schema({
  degree: { type: String, required: true },
  institution: { type: String, required: true },
  duration: { type: String, required: true },
  score: { type: String }
});

const certificationSchema = new mongoose.Schema({
  title: { type: String, required: true },
  issuer: { type: String, required: true },
  date: { type: String, required: true },
  verificationLink: { type: String }
});

const portfolioContentSchema = new mongoose.Schema({
  // Since there's only one configuration, we can use a hardcoded singleton identifier or just rely on finding the first doc.
  isSingleton: { type: Boolean, default: true, unique: true },
  
  resumeUrl: { type: String, default: '/resume.pdf' },
  
  hero: {
    headline: { type: String, default: 'Dilkhush Kumar' },
    subHeadline: { type: String, default: 'Full-Stack MERN Developer & AI Integration Enthusiast.\nBuilding dynamic web systems and intelligent user interfaces.' },
    typingText: { type: String, default: 'MongoDB | Express | React | Node.js' }
  },
  
  about: {
    text: { type: String, default: 'I am a final-year BCA student with a deep passion for software engineering, scalable RESTful APIs, and clean architecture. My journey in web development is driven by the desire to build robust, dynamic, and intelligent systems that solve real-world problems. I thrive on turning complex logic into elegant code and delivering seamless user experiences.' }
  },
  
  skills: {
    type: [skillCategorySchema],
    default: [
      {
        category: "Frontend",
        icon: "FaReact",
        items: ["React 18", "Redux Toolkit", "Tailwind CSS", "Axios", "Vite"]
      },
      {
        category: "Backend & DB",
        icon: "FaNodeJs",
        items: ["Node.js", "Express.js", "MongoDB", "MySQL"]
      },
      {
        category: "Tools & Security",
        icon: "FaLock",
        items: ["Git/GitHub", "JWT Auth", "Bcrypt", "Postman"]
      }
    ]
  },
  
  education: {
    type: [educationSchema],
    default: []
  },
  
  certifications: {
    type: [certificationSchema],
    default: []
  }
}, { timestamps: true });

module.exports = mongoose.model('PortfolioContent', portfolioContentSchema);
