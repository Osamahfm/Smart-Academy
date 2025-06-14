const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const User = require('../models/User');
const { protect } = require('../middlewares/authMiddleware');
dotenv.config();

const authController = require('../controllers/authController');


router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/logout', authController.logout);
router.post('/resetPassword', authController.resetPassword);

router.get('/check-admin', protect, async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ isAdmin: user.isAdmin });
    } catch (error) {
        res.status(500).json({ message: 'Error checking admin status' });
    }
});


module.exports = router;