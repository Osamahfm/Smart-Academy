require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');

async function verifyAdmin() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');
        const adminUsers = await User.find({ isAdmin: true });
        
        if (adminUsers.length === 0) {
            console.log('No admin users found in the database');
        } else {
            console.log('Found admin users:');
            adminUsers.forEach(user => {
                console.log({
                    email: user.email,
                    isAdmin: user.isAdmin,
                    id: user._id
                });
            });
        }

        // Find all users
        const allUsers = await User.find({});
        console.log('\nAll users in database:');
        allUsers.forEach(user => {
            console.log({
                email: user.email,
                isAdmin: user.isAdmin,
                id: user._id
            });
        });

    } catch (error) {
        console.error('Error:', error);
    } finally {
        await mongoose.disconnect();
    }
}

verifyAdmin(); 