const express = require('express');
const router = express.Router();
const { admin: isAdmin } = require('../middlewares/authMiddleware');
const Product = require('../models/Product');
const Category = require('../models/Category');

// Admin dashboard
router.get('/', isAdmin, (req, res) => {
  res.render('admin/dashboard');
});

// View all products
router.get('/products', isAdmin, async (req, res) => {
  try {
    const products = await Product.find().populate('category');
    res.render('admin/products', { products });
  } catch (error) {
    console.error(error);
    res.status(500).render('error', { message: 'Error fetching products' });
  }
});

// Add product form
router.get('/products/add', isAdmin, async (req, res) => {
  try {
    const categories = await Category.find();
    res.render('admin/addProduct', { categories });
  } catch (error) {
    console.error(error);
    res.status(500).render('error', { message: 'Error loading form' });
  }
});

// Handle add product
router.post('/products/add', isAdmin, async (req, res) => {
  try {
    const { name, description, price, image, category, countInStock } = req.body;
    await Product.create({ name, description, price, image, category, countInStock });
    res.redirect('/admin/products');
  } catch (error) {
    console.error(error);
    const categories = await Category.find();
    res.status(400).render('admin/addProduct', { 
      categories, 
      error: 'Error creating product', 
      formData: req.body 
    });
  }
});

// Edit product form
router.get('/products/edit/:id', isAdmin, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).render('error', { message: 'Product not found' });
    }
    const categories = await Category.find();
    res.render('admin/editProduct', { product, categories });
  } catch (error) {
    console.error(error);
    res.status(500).render('error', { message: 'Error loading product' });
  }
});

// Handle edit product
router.post('/products/edit/:id', isAdmin, async (req, res) => {
  try {
    const { name, description, price, image, category, countInStock } = req.body;
    await Product.findByIdAndUpdate(
      req.params.id, 
      { name, description, price, image, category, countInStock },
      { new: true, runValidators: true }
    );
    res.redirect('/admin/products');
  } catch (error) {
    console.error(error);
    const categories = await Category.find();
    const product = await Product.findById(req.params.id);
    res.status(400).render('admin/editProduct', { 
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
router.post('/products/delete/:id', isAdmin, async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.redirect('/admin/products');
  } catch (error) {
    console.error(error);
    res.status(500).render('error', { message: 'Error deleting product' });
  }
});

module.exports = router;