require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/Product');
const Category = require('./models/Category');

async function addProduct() {
  await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/coursey', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  // Find a category to assign to the product
  const category = await Category.findOne();
  if (!category) {
    console.log('No categories found. Please add a category first.');
    await mongoose.disconnect(); // Ensure disconnect
    return;
  }

  const product = new Product({
    name: 'Sample Product',
    description: 'This is a sample product.',
    price: 19.99,
    image: 'sample.jpg',
    category: category._id,
    countInStock: 10
  });

  await product.save();
  console.log('Product added:', product);

  await mongoose.disconnect();
}

addProduct().catch(console.error);
