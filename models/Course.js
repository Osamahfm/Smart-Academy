// models/Course.js
const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Course title is required'],
        trim: true,
        maxlength: [100, 'Title cannot exceed 100 characters']
    },
    description: {
        type: String,
        required: [true, 'Course description is required'],
        minlength: [50, 'Description should be at least 50 characters long']
    },
    price: {
        type: Number,
        required: [true, 'Course price is required'],
        min: [0, 'Price cannot be negative'],
        max: [10000, 'Price cannot exceed 10,000']
    },
    category: {
        type: String,
        required: [true, 'Course category is required'],
        enum: {
            values: ['frontend', 'backend', 'mobile', 'problemsolving', 'oop', 'datastruct', 'introcyber', 'cyberspec', 'cehacker'],
            message: 'Invalid course category'
        }
    },
    imageUrl: {
        type: String,
        required: [true, 'Course image is required'],
        validate: {
            validator: function(v) {
                return /^(https?:\/\/).+\.(jpg|jpeg|png|webp)$/i.test(v);
            },
            message: props => `${props.value} is not a valid image URL!`
        }
    },
    instructor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Instructor is required']
    },
    duration: {
        type: Number,
        required: [true, 'Course duration is required'],
        min: [1, 'Duration must be at least 1 hour']
    },
    isFeatured: {
        type: Boolean,
        default: false
    },
    rating: {
        type: Number,
        default: 0,
        min: [0, 'Rating cannot be less than 0'],
        max: [5, 'Rating cannot be more than 5']
    },
    createdAt: {
        type: Date,
        default: Date.now,
        immutable: true
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true, // This automatically manages createdAt and updatedAt
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Update timestamp before saving
courseSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

// Virtual property for formatted price
courseSchema.virtual('formattedPrice').get(function() {
    return `$${this.price.toFixed(2)}`;
});

// Indexes for better query performance
courseSchema.index({ title: 'text', description: 'text' });
courseSchema.index({ category: 1, price: 1 });
courseSchema.index({ rating: -1 });

module.exports = mongoose.models.Course || mongoose.model('Course', courseSchema);
