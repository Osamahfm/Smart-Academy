const createError = require('http-errors');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

// Register user
exports.createUser = async (req, res, next) => {
  const { name, email, password } = req.body;
  
  if (!name || !email || !password) {
    return next(createError(400, 'Please provide name, email, and password'));
  }
  
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return next(createError(400, 'User already exists'));
    }

    const user = await User.create({
      name,
      email,
      password: bcrypt.hashSync(password, 10),
      role: 'user'
    });

    // Return user without password
    const { password: _, ...userWithoutPassword } = user.toObject();
    res.status(201).json(userWithoutPassword);
  } catch (error) {
    next(error);
  }
};

// Login user
exports.loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  
  if (!email || !password) {
    return next(createError(400, 'Please provide email and password'));
  }
  
  try {
    const user = await User.findOne({ email });
    
    if (!user || !bcrypt.compareSync(password, user.password)) {
      return next(createError(401, 'Invalid credentials'));
    }

    // Return user without password
    const { password: _, ...userWithoutPassword } = user.toObject();
    res.json({
      success: true,
      user: userWithoutPassword
    });
  } catch (error) {
    next(error);
  }
};

// Get all users (excluding password)
exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (error) {
    next(error);
  }
};

// Get single user by ID (excluding password)
exports.getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) {
      return next(createError(404, 'User not found'));
    }
    res.json(user);
  } catch (error) {
    next(error);
  }
};

// Get user profile (current user)
exports.getUserProfile = async (req, res, next) => {
  try {
    // req.user is set by auth middleware
    const user = await User.findById(req.user._id).select('-password');
    if (!user) {
      return next(createError(404, 'User not found'));
    }
    res.json(user);
  } catch (error) {
    next(error);
  }
};

// Update user profile
exports.updateUserProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    
    if (!user) {
      return next(createError(404, 'User not found'));
    }
    
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    
    // Update password if provided
    if (req.body.password) {
      user.password = bcrypt.hashSync(req.body.password, 10);
    }
    
    const updatedUser = await user.save();
    
    // Return updated user without password
    const { password: _, ...userWithoutPassword } = updatedUser.toObject();
    res.json(userWithoutPassword);
  } catch (error) {
    next(error);
  }
};

// Delete user (admin only)
exports.deleteUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return next(createError(404, 'User not found'));
    }
    
    await user.remove();
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

// Get user count
exports.getUserCount = async (req, res, next) => {
  try {
    const count = await User.countDocuments();
    res.json({ count });
  } catch (error) {
    next(error);
  }
};
