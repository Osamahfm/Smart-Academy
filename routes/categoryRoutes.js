const express = require('express');
const router = express.Router();
const Category = require('../models/Category');

// Create Category
router.post('/', async (req, res) => {
    try {
        const category = await Category.create(req.body);
        res.status(201).json(category);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.get('/', async (req, res) => {
    const categories = await Category.find();
    res.json(categories);
});

module.exports = router;