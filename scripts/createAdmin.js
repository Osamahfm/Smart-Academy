require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');
const connectDB = require('../config/db');

const createAdmin = async () => {
    try {
        await connectDB();
        const adminData = {
            name: '123',
            email: '123@gmail.com',
            password: '123',
            isAdmin: true
        };

        // Check if admin already exists
        const existingAdmin = await User.findOne({ email: adminData.email });
        if (existingAdmin) {
            console.log('Admin user already exists');
            process.exit(1);
        }

        // Create admin u
        const admin = await User.create(adminData);
        console.log('Admin user created successfully:');
        console.log('Email:', admin.email);
        console.log('Password:', adminData.password);
        console.log('isAdmin:', admin.isAdmin);

        process.exit(0);
    } catch (error) {
        console.error('Error creating admin:', error.message);
        process.exit(1);
    }
};

createAdmin(); 