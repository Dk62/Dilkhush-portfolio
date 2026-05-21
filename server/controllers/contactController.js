const Message = require('../models/Message');
const nodemailer = require('nodemailer');

// @desc    Submit contact form
// @route   POST /api/contact
// @access  Public
const submitContactForm = async (req, res) => {
  const { name, email, subject, message } = req.body;

  try {
    // 1. Save message to database
    const newMessage = await Message.create({
      name,
      email,
      subject,
      message,
    });

    // 2. Send email notification via Nodemailer
    const transporter = nodemailer.createTransport({
      service: 'gmail', // Use your preferred email service
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER, // Send notification to yourself
      subject: `New Portfolio Message: ${subject}`,
      text: `You have received a new message from your portfolio website.\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    };

    // We don't necessarily want to await/block the response on email sending,
    // but doing so ensures we know if it failed.
    await transporter.sendMail(mailOptions);

    res.status(201).json({ message: 'Message sent successfully', data: newMessage });
  } catch (error) {
    console.error('Contact Form Error:', error);
    res.status(500).json({ message: 'Failed to send message' });
  }
};

// @desc    Get all messages
// @route   GET /api/contact/messages
// @access  Private (Admin)
const getMessages = async (req, res) => {
  try {
    const messages = await Message.find({}).sort({ createdAt: -1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = {
  submitContactForm,
  getMessages,
};
