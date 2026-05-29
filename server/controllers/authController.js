const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const User = require('../models/User');

const sendResetEmail = async (email, resetUrl) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: `"Dilkhush Portfolio" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: 'Password Reset Request - Admin Portfolio',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px; background-color: #0f172a; color: #f8fafc;">
        <h2 style="color: #34d399; text-align: center;">Admin Password Reset</h2>
        <p>You are receiving this email because you (or someone else) requested a password reset for your portfolio administrative dashboard.</p>
        <p>Please click the button below to complete the reset process. This link is valid for 10 minutes:</p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${resetUrl}" style="background-color: #10b981; color: #0f172a; padding: 12px 24px; text-decoration: none; border-radius: 9999px; font-weight: bold; display: inline-block;">Reset Password</a>
        </div>
        <p>If you did not request this, please ignore this email and your password will remain unchanged.</p>
        <hr style="border: 0; border-top: 1px solid #334155; margin: 20px 0;" />
        <p style="font-size: 12px; color: #94a3b8; text-align: center;">This is an automated email from your MERN Portfolio Server.</p>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
};

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

// @desc    Auth admin & get token
// @route   POST /api/admin/login
// @access  Public
const loginAdmin = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (user && (await bcrypt.compare(password, user.password))) {
      res.json({
        _id: user._id,
        username: user.username,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ message: 'Invalid username or password' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Register a new admin (usually run once for setup)
// @route   POST /api/admin/register
// @access  Public (Should be disabled or protected in production)
const registerAdmin = async (req, res) => {
  const { username, password, email } = req.body;

  try {
    // Dynamic Security Lock: Allow only the first administrative user to register
    const adminExistsCount = await User.countDocuments({});
    if (adminExistsCount > 0) {
      return res.status(403).json({
        message: 'Admin registration is closed because an administrator account already exists.'
      });
    }

    const userExists = await User.findOne({ username });

    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      username,
      email: email || undefined,
      password: hashedPassword,
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        username: user.username,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Request password reset token
// @route   POST /api/admin/forgot-password
// @access  Public
const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    let user = await User.findOne({ email });

    // Fallback: Check if we have a bootstrapped admin and the email matches EMAIL_USER in .env
    if (!user) {
      user = await User.findOne({ username: 'admin' });

      if (user && email === process.env.EMAIL_USER) {
        user.email = email;
        await user.save();
      } else {
        const firstUser = await User.findOne({});
        if (firstUser && email === process.env.EMAIL_USER) {
          user = firstUser;
          user.email = email;
          await user.save();
        } else {
          return res.status(404).json({ message: 'No admin user found with that email' });
        }
      }
    }

    const resetToken = crypto.randomBytes(20).toString('hex');

    user.resetPasswordToken = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex');

    user.resetPasswordExpire = Date.now() + 10 * 60 * 1000; // 10 mins

    await user.save();

    const origin = req.get('origin') || `${req.protocol}://${req.get('host')}`;
    const resetUrl = `${origin}/reset-password/${resetToken}`;

    try {
      await sendResetEmail(user.email || email, resetUrl);
      res.json({ message: 'Password recovery email sent successfully' });
    } catch (err) {
      console.error(err);
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;
      await user.save();
      res.status(500).json({ message: 'Failed to send recovery email' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Reset password using token
// @route   PUT /api/admin/reset-password/:token
// @access  Public
const resetPassword = async (req, res) => {
  const { password } = req.body;
  const { token } = req.params;

  try {
    const resetPasswordToken = crypto
      .createHash('sha256')
      .update(token)
      .digest('hex');

    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired token' });
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    res.json({ message: 'Password reset successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = {
  loginAdmin,
  registerAdmin,
  forgotPassword,
  resetPassword,
};
