const mongoose = require('mongoose');
const uri = 'mongodb+srv://osamahamadafm:VUImvoVhUiJ8xtUT@smartacagemy.isvdh60.mongodb.net/Smart';

const connectDB = async () => {
  try {
    await mongoose.connect(uri);
    console.log('MongoDB Connected to Atlas database');
  } catch (err) {
    console.error('MongoDB connection failed:', err.message);
  }
};

module.exports = connectDB;
