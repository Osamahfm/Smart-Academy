// controllers/usersController.js
const createError = require('http-errors');

// In-memory data store
let users = [
  {
    id: 1,
    name: 'Admin User',
    email: 'admin@example.com',
    password: 'admin123',
    role: 'admin'
  },
  {
    id: 2,
    name: 'John Doe',
    email: 'john@example.com',
    password: 'john123',
    role: 'user'
  }
];


let nextId = 3;

// Register user
exports.registerUser = (req, res, next) => {
  const { name, email, password } = req.body;
  
  if (!name || !email || !password) {
    return next(createError(400, 'Please provide name, email, and password'));
  }
  
  // Check if user already exists
  const existingUser = users.find(u => u.email === email);
  if (existingUser) {
    return next(createError(400, 'User already exists'));
  }
  
  const newUser = {
    id: nextId++,
    name,
    email,
    password,
    role: 'user'
  };
  
  users.push(newUser);
  
  // In a real app, don't send back the password
  const { password: _, ...userWithoutPassword } = newUser;
  res.status(201).json(userWithoutPassword);
};

// Login user
exports.loginUser = (req, res, next) => {
  const { email, password } = req.body;
  
  if (!email || !password) {
    return next(createError(400, 'Please provide email and password'));
  }
  
  const user = users.find(u => u.email === email && u.password === password);
  
  if (!user) {
    return next(createError(401, 'Invalid credentials'));
  }
  
  // In a real app, you would return a token here
  const { password: _, ...userWithoutPassword } = user;
  res.json({
    success: true,
    user: userWithoutPassword
  });
};

// Get all users
exports.getUsers = (req, res) => {
  // Don't send passwords in response
  const usersWithoutPasswords = users.map(user => {
    const { password, ...rest } = user;
    return rest;
  });
  
  res.json(usersWithoutPasswords);
};

// Get single user
exports.getUser = (req, res, next) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  
  if (!user) {
    return next(createError(404, 'User not found'));
  }
  
  const { password, ...userWithoutPassword } = user;
  res.json(userWithoutPassword);
};

// Update user
exports.updateUser = async (req, res) => {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password) user.password = req.body.password;

    await user.save();
    res.json({ message: 'User updated' });
};

// Delete user
exports.deleteUser = (req, res, next) => {
  const userIndex = users.findIndex(u => u.id === parseInt(req.params.id));
  
  if (userIndex === -1) {
    return next(createError(404, 'User not found'));
  }
  
  users = users.filter(u => u.id !== parseInt(req.params.id));
  res.status(204).send();
};

const User = require('../models/User');

// Get all users (excluding password)
exports.getUsers = async (req, res) => {
    const users = await User.find().select('-password');
    res.json(users);
};

// Get single user by ID (excluding password)
exports.getUser = async (req, res) => {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
};

exports.getUserCount = async (req, res) => {
    const count = await User.countDocuments();
    res.json({ count });
};
