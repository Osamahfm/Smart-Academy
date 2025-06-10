const express = require('express');
const router = express.Router();
const { isAdmin } = require('../middlewares/auth');
const Product = require('../models/Product');
const Category = require('../models/Category');

// Admin dashboard
router.get('/', isAdmin, (req, res) => {
  res.render('admin/dashboard');
});

// View all products
router.get('/products', isAdmin, async (req, res) => {
  const products = await Product.find().populate('category');
  res.render('admin/products', { products });
});

// Add product form
router.get('/products/add', isAdmin, (req, res) => {
  res.render('admin/addProduct');
});

// Handle add product
router.post('/products/add', isAdmin, async (req, res) => {
  const { name, description, price, image, category, countInStock } = req.body;
  await Product.create({ name, description, price, image, category, countInStock });
  res.redirect('/admin/products');
});

// Edit product form
router.get('/products/edit/:id', isAdmin, async (req, res) => {
  const product = await Product.findById(req.params.id);
  res.render('admin/editProduct', { product });
});

// Handle edit product
router.post('/products/edit/:id', isAdmin, async (req, res) => {
  const { name, description, price, image, category, countInStock } = req.body;
  await Product.findByIdAndUpdate(req.params.id, { name, description, price, image, category, countInStock });
  res.redirect('/admin/products');
});

// Delete product
router.post('/products/delete/:id', isAdmin, async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.redirect('/admin/products');
});
res.render('admin/yourview');

module.exports = router;