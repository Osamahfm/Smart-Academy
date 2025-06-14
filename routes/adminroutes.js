const express = require('express');
const router = express.Router();
const { protect, isAdmin } = require('../middlewares/authMiddleware');
const Product = require('../models/Product');
const Category = require('../models/Category');
const Course = require('../models/Course');

// Admin dashboard
router.get('/dashboard', protect, isAdmin, async (req, res) => {
  try {
    const courses = await Course.find();
    res.render('admin/dashboard', { 
      courses, 
      user: req.user, 
      admin: req.user.isAdmin 
    });
  } catch (error) {
    console.error(error);
    res.status(500).render('error', { message: 'Error loading dashboard' });
  }
});

// View all products
router.get('/products', protect, isAdmin, async (req, res) => {
  try {
    const products = await Product.find().populate('category');
    res.render('admin/products', { products });
  } catch (error) {
    console.error(error);
    res.status(500).render('error', { message: 'Error fetching products' });
  }
});

// Add product form
router.get('/products/add', protect, isAdmin, async (req, res) => {
  try {
    const categories = await Category.find();
    res.render('admin/addproducts', { categories });
  } catch (error) {
    console.error(error);
    res.status(500).render('error', { message: 'Error loading form' });
  }
});

// Handle add product
router.post('/products/add', protect, isAdmin, async (req, res) => {
  try {
    const { name, description, price, image, category, countInStock } = req.body;
    await Product.create({ name, description, price, image, category, countInStock });
    res.redirect('admin/products');
  } catch (error) {
    console.error(error);
    const categories = await Category.find();
    res.status(400).render('admin/addproducts', { 
      categories, 
      error: 'Error creating product', 
      formData: req.body 
    });
  }
});

// Edit product form
router.get('/products/edit/:id', protect, isAdmin, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).render('error', { message: 'Product not found' });
    }
    const categories = await Category.find();
    res.render('admin/editproducts', { product, categories });
  } catch (error) {
    console.error(error);
    res.status(500).render('error', { message: 'Error loading product' });
  }
});

// Handle edit product
router.post('/products/edit/:id', protect, isAdmin, async (req, res) => {
  try {
    const { name, description, price, image, category, countInStock } = req.body;
    await Product.findByIdAndUpdate(
      req.params.id, 
      { name, description, price, image, category, countInStock },
      { new: true, runValidators: true }
    );
    res.redirect('admin/products');
  } catch (error) {
    console.error(error);
    const categories = await Category.find();
    const product = await Product.findById(req.params.id);
    res.status(400).render('admin/editproducts', { 
      product, 
      categories, 
      error: 'Error updating product',
      formData: req.body
    });
  }
});

// middlewares/authMiddleware.js
exports.isAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(403).render('error', { message: 'Admin access required' });
  }
};

// Delete product
router.post('/products/delete/:id', protect, isAdmin, async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.redirect('admin/products');
  } catch (error) {
    console.error(error);
    res.status(500).render('error', { message: 'Error deleting product' });
  }
});

// Get all courses (admin view)
router.get('/courses', protect, isAdmin, async (req, res) => {
  try {
    const courses = await Course.find();
    res.render('admin/products', { courses });
  } catch (error) {
    res.status(500).render('error', { message: 'Error fetching courses' });
  }
});

// Show add course form
router.get('/courses/add', protect, isAdmin, (req, res) => {
  res.render('admin/addproducts');
});

// Add new course
router.post('/courses/add', protect, isAdmin, async (req, res) => {
  try {
    const { title, description, price, category, imageUrl } = req.body;
    const course = new Course({
      title,
      description,
      price,
      category,
      imageUrl
    });
    await course.save();
    res.redirect('/api/admin/courses');
  } catch (error) {
    res.status(400).render('admin/addproducts', { 
      error: 'Error adding course',
      formData: req.body
    });
  }
});

// Show edit course form
router.get('/courses/edit/:id', protect, isAdmin, async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).render('error', { message: 'Course not found' });
    }
    res.render('admin/editproducts', { course });
  } catch (error) {
    res.status(500).render('error', { message: 'Error fetching course' });
  }
});

// Update course
router.post('/courses/edit/:id', protect, isAdmin, async (req, res) => {
  try {
    const { title, description, price, category, imageUrl } = req.body;
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).render('error', { message: 'Course not found' });
    }
    
    course.title = title;
    course.description = description;
    course.price = price;
    course.category = category;
    course.imageUrl = imageUrl;
    
    await course.save();
    res.redirect('/api/admin/courses');
  } catch (error) {
    res.status(400).render('admin/editproducts', { 
      error: 'Error updating course',
      course: req.body
    });
  }
});

// Delete course
router.post('/courses/delete/:id', protect, isAdmin, async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).render('error', { message: 'Course not found' });
    }
    await course.deleteOne();
    res.redirect('/api/admin/courses');
  } catch (error) {
    res.status(500).render('error', { message: 'Error deleting course' });
  }
});

module.exports = router;
router.get('/dashboard', protect, isAdmin, async (req, res) => {
  const courses = await Course.find();
  res.render('admin/dashboard', { courses });
});
