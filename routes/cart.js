const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');
const Course = require('../models/Course');
const authenticate = require('../middleware/auth'); 

// Add item to cart
router.post('/add', authenticate, async (req, res) => {
  const { courseId } = req.body;
  const userId = req.user.id;

  const course = await Course.findById(courseId);
  if (!course) return res.status(404).json({ error: 'Course not found' });

  let cart = await Cart.findOne({ userId });

  if (!cart) {
    cart = new Cart({ userId, items: [] });
  }

  const exists = cart.items.some(item => item.courseId.equals(courseId));
  if (exists) return res.status(400).json({ error: 'Course already in cart' });

  cart.items.push({
    courseId,
    title: course.title,
    price: course.price
  });

  await cart.save();
  res.status(200).json({ message: 'Course added to cart' });
});

// Get cart
router.get('/', authenticate, async (req, res) => {
  const cart = await Cart.findOne({ userId: req.user.id });
  res.status(200).json(cart || { items: [] });
});

// Remove item
router.post('/remove', authenticate, async (req, res) => {
  const { courseId } = req.body;
  const cart = await Cart.findOne({ userId: req.user.id });

  if (!cart) return res.status(404).json({ error: 'Cart not found' });

  cart.items = cart.items.filter(item => !item.courseId.equals(courseId));
  await cart.save();
  res.status(200).json({ message: 'Course removed from cart' });
});

module.exports = router;
