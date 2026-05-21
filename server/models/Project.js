const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String, // URL to the image
    required: true,
  },
  techStack: {
    type: [String],
    required: true,
  },
  githubLink: {
    type: String,
  },
  liveLink: {
    type: String,
  },
  featured: {
    type: Boolean,
    default: false,
  }
}, { timestamps: true });

module.exports = mongoose.model('Project', projectSchema);
