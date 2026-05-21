const PortfolioContent = require('../models/PortfolioContent');
const path = require('path');
const fs = require('fs');
const cloudinary = require('../config/cloudinary');

// Helper to ensure default config exists
const getOrCreateContent = async () => {
  let content = await PortfolioContent.findOne({ isSingleton: true });
  if (!content) {
    content = await PortfolioContent.create({ isSingleton: true });
  }
  return content;
};

// @desc    Get portfolio content
// @route   GET /api/content
// @access  Public
const getContent = async (req, res) => {
  try {
    const content = await getOrCreateContent();
    res.json(content);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Update portfolio content
// @route   PUT /api/content
// @access  Private (Admin)
const updateContent = async (req, res) => {
  const { resumeUrl, hero, about, skills, education, certifications } = req.body;

  try {
    const content = await getOrCreateContent();

    if (resumeUrl !== undefined) content.resumeUrl = resumeUrl;
    if (hero !== undefined) content.hero = hero;
    if (about !== undefined) content.about = about;
    if (skills !== undefined) content.skills = skills;
    if (education !== undefined) content.education = education;
    if (certifications !== undefined) content.certifications = certifications;

    const updatedContent = await content.save();
    res.json(updatedContent);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Upload resume file
// @route   POST /api/content/resume
// @access  Private (Admin)
const uploadResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    // Upload PDF to Cloudinary as an image resource (enables public PDF delivery)
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: 'portfolio/resumes',
      resource_type: 'image'
    });

    // Remove the local temp file
    if (fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }

    const fileUrl = result.secure_url;

    const content = await getOrCreateContent();
    content.resumeUrl = fileUrl;
    await content.save();

    res.json({ message: 'Resume uploaded successfully', resumeUrl: fileUrl });
  } catch (error) {
    if (req.file && fs.existsSync(req.file.path)) {
      try {
        fs.unlinkSync(req.file.path);
      } catch (err) {
        console.error('Failed to delete temp file:', err);
      }
    }
    console.error('Cloudinary resume upload error:', error);
    res.status(500).json({ message: 'Server Error uploading resume' });
  }
};

module.exports = {
  getContent,
  updateContent,
  uploadResume
};
