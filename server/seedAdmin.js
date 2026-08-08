require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./models/User');

const seedAdmin = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      console.error('MONGODB_URI environment variable is missing in server/.env');
      process.exit(1);
    }
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('admin123', salt);

    await User.findOneAndUpdate(
      { username: 'admin' },
      { username: 'admin', password: hashedPassword },
      { upsert: true, new: true }
    );

    console.log('Admin user ready! Username: admin, Password: admin123');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding admin user:', error);
    process.exit(1);
  }
};

seedAdmin();
