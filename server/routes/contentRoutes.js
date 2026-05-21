const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { getContent, updateContent, uploadResume } = require('../controllers/contentController');
const { protect } = require('../middleware/authMiddleware');

// Configure Multer for PDF uploads
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename(req, file, cb) {
    cb(null, `resume-${Date.now()}${path.extname(file.originalname)}`);
  },
});

const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    const filetypes = /pdf/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (extname && mimetype) {
      return cb(null, true);
    } else {
      cb('Error: PDFs Only!');
    }
  },
});

router.route('/')
  .get(getContent)
  .put(protect, updateContent);

router.post('/resume', protect, upload.single('resume'), uploadResume);

module.exports = router;
