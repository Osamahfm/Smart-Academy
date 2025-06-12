// routes/userRoutes.js
const express = require('express');
const router = express.Router();

// Correct import - make sure names match exports
const { 
  registerUser,
  loginUser,
  getUserProfile,       // Must match controller export
  updateUserProfile,    // Must match controller export
  getUsers,
  deleteUser
} = require('../controllers/usersController');

const { protect, admin } = require('../middlewares/authMiddleware');

// Public routes
router.post('/login', loginUser);
router.post('/register', registerUser);

// Protected routes
router.route('/profile')
  .get(protect, getUserProfile)        // Verify function name
  .put(protect, updateUserProfile);    // Verify function name

// Admin routes
router.route('/')
  .get(protect, admin, getUsers);

router.route('/:id')
  .delete(protect, admin, deleteUser);

module.exports = router;