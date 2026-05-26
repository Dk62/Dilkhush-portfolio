const express = require('express');
const router = express.Router();
const { loginAdmin, registerAdmin, forgotPassword, resetPassword } = require('../controllers/authController');

router.post('/login', loginAdmin);
router.post('/register', registerAdmin);
router.post('/forgot-password', forgotPassword);
router.put('/reset-password/:token', resetPassword);

module.exports = router;
