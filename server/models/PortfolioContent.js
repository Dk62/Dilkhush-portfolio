const mongoose = require('mongoose');

const skillCategorySchema = new mongoose.Schema({
  category: { type: String, required: true },
  icon: { type: String, required: true },
  items: [{ type: String, required: true }]
});

const experienceSchema = new mongoose.Schema({
  role: { type: String, required: true },
  company: { type: String, required: true },
  duration: { type: String },
  highlights: [{ type: String, required: true }]
});

const educationSchema = new mongoose.Schema({
  degree: { type: String, required: true },
  institution: { type: String, required: true },
  duration: { type: String, required: true },
  score: { type: String },
  affiliation: { type: String }
});

const certificationSchema = new mongoose.Schema({
  title: { type: String, required: true },
  issuer: { type: String, required: true },
  date: { type: String, required: true },
  verificationLink: { type: String }
});

const portfolioContentSchema = new mongoose.Schema({
  isSingleton: { type: Boolean, default: true, unique: true },
  
  resumeUrl: { type: String, default: '/resume.pdf' },
  
  hero: {
    name: { type: String, default: 'Dilkhush Kumar' },
    headline: { type: String, default: 'Dilkhush Kumar' },
    role: { type: String, default: 'Full Stack Developer' },
    location: { type: String, default: 'Begusarai, Bihar, India' },
    status: { type: String, default: 'Open to Software Developer Opportunities' },
    subHeadline: { type: String, default: 'I build modern, responsive, and scalable web applications using React.js, Node.js, Express.js, and MySQL. I enjoy turning ideas into real-world software and continuously improving my development skills through hands-on projects.' },
    typingText: { type: String, default: 'React.js | Node.js | Express.js | MySQL | MongoDB | REST APIs' }
  },
  
  about: {
    text: { type: String, default: 'I am a BCA graduate and Full Stack Developer passionate about building robust, accessible, and user-friendly web applications. My core expertise lies in React.js, Node.js, Express.js, and relational/non-relational databases like MySQL and MongoDB.\n\nDuring my studies at Ganga Global Institute of Management Studies, I focused on turning software engineering principles into practical solutions, including developing an AI-Powered College Placement Preparation Portal for my final-year project. I am a dedicated continuous learner actively looking for full-time software developer opportunities.' }
  },
  
  skills: {
    type: [skillCategorySchema],
    default: [
      {
        category: "Frontend Development",
        icon: "FaReact",
        items: ["HTML5", "CSS3", "JavaScript ES6+", "React.js", "Bootstrap"]
      },
      {
        category: "Backend & APIs",
        icon: "FaNodeJs",
        items: ["Node.js", "Express.js", "REST APIs"]
      },
      {
        category: "Databases",
        icon: "FaDatabase",
        items: ["MySQL", "MongoDB", "Sequelize"]
      },
      {
        category: "Programming Languages",
        icon: "FaCode",
        items: ["JavaScript", "Python", "Java", "C", "C++"]
      },
      {
        category: "Developer Tools",
        icon: "FaTools",
        items: ["Git", "GitHub", "VS Code", "Postman", "Linux"]
      }
    ]
  },

  experience: {
    type: [experienceSchema],
    default: [
      {
        role: "Full Stack Development Intern",
        company: "CodeAlpha",
        duration: "Internship",
        highlights: [
          "Built scalable web components using modern frontend technologies.",
          "Received a Letter of Recommendation highlighting productivity and analytical skills.",
          "Collaborated with virtual engineering team members to deliver milestones.",
          "Adapted to emerging technology stacks under development deadlines."
        ]
      },
      {
        role: "Full Stack Development Intern",
        company: "Codveda Technologies",
        duration: "Internship",
        highlights: [
          "Implemented full-stack functional requirements across database and frontend UI.",
          "Worked on structural debugging and code refactoring.",
          "Contributed to system optimization and REST API integration."
        ]
      }
    ]
  },
  
  education: {
    type: [educationSchema],
    default: [
      {
        degree: "Bachelor of Computer Applications (BCA)",
        institution: "Ganga Global Institute of Management Studies, Begusarai, Bihar",
        affiliation: "Affiliated with Aryabhatta Knowledge University, Patna",
        duration: "2023 – 2026",
        score: "Pursuing"
      },
      {
        degree: "Higher Secondary School — 12th",
        institution: "MRJD College, Bihar Board",
        affiliation: "Bihar School Examination Board",
        duration: "2020",
        score: "Completed"
      },
      {
        degree: "Secondary School — 10th",
        institution: "Swami Dharmanand Senior Secondary School, Haryana",
        affiliation: "CBSE / Board",
        duration: "2018",
        score: "Completed"
      }
    ]
  },
  
  certifications: {
    type: [certificationSchema],
    default: [
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
    ]
  }
}, { timestamps: true });

module.exports = mongoose.model('PortfolioContent', portfolioContentSchema);
