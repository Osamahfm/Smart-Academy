const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: {type:String, required: true },
    price: { type: Number, required: true },
    image: String,
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
    countInStock: { type: Number, default: 0 },
    datecreated: { type: Date, default: Date.now}
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
