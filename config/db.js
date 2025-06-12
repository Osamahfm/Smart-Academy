// ./config/db.js

const mongoose = require('mongoose');
const uri = "mongodb+srv://osamahamadafm:VUImvoVhUiJ8xtUT@smartacagemy.isvdh60.mongodb.net/?retryWrites=true&w=majority&appName=SmartAcagemy";

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://osamahamadafm:Osamahfm10@smartacagemy.isvdh60.mongodb.net/mongodbVSCodePlaygroundDB?retryWrites=true&w=majority', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('✅ MongoDB Connected (hardcoded)');
  } catch (err) {
    console.error('❌ MongoDB connection failed:', err.message);
  }
};

module.exports = connectDB;
