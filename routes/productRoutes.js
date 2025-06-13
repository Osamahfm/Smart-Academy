const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// Create Product
router.post('/', async (req, res) => {
    try {
        const product = await Product.create(req.body);
        res.status(201).json(product);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Get All Products
router.get('/', async (req, res) => {
    const products = await Product.find().populate('category');
    res.json(products);
});

module.exports = router;