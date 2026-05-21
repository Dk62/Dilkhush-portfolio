const express = require('express');
const router = express.Router();
const { submitContactForm, getMessages } = require('../controllers/contactController');
const { protect } = require('../middleware/authMiddleware');

router.post('/', submitContactForm);
router.get('/messages', protect, getMessages);

module.exports = router;
