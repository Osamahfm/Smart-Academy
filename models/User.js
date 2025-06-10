const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Define validation constants
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PASSWORD_MIN_LENGTH = 8;
const SALT_ROUNDS = 10;

const userSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: [true, 'Name is required'],
        trim: true,
        minlength: [2, 'Name must be at least 2 characters long']
    },
    email: { 
        type: String, 
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
        trim: true,
        validate: {
            validator: function(value) {
                return EMAIL_REGEX.test(value);
            },
            message: 'Please enter a valid email address'
        }
    },
    password: { 
        type: String, 
        required: [true, 'Password is required'],
        minlength: [PASSWORD_MIN_LENGTH, `Password must be at least ${PASSWORD_MIN_LENGTH} characters long`],
        select: false // Exclude password by default in queries
    },
    isAdmin: { 
        type: Boolean, 
        default: false,
        required: true 
    },
    lastLogin: {
        type: Date,
        default: null
    },
    active: {
        type: Boolean,
        default: true
    }
}, { 
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Create index for email field to improve query performance
userSchema.index({ email: 1 });

// Hash password before saving
userSchema.pre('save', async function(next) {
    try {
        if (!this.isModified('password')) return next();
        
        // Generate salt and hash password
        this.password = await bcrypt.hash(this.password, SALT_ROUNDS);
        next();
    } catch (error) {
        next(error);
    }
});

// Password comparison method with proper error handling
userSchema.methods.matchPassword = async function(enteredPassword) {
    try {
        if (!enteredPassword) {
            throw new Error('Password is required');
        }
        return await bcrypt.compare(enteredPassword, this.password);
    } catch (error) {
        throw new Error('Password comparison failed: ' + error.message);
    }
};

// Instance method to safely return user data without sensitive fields
userSchema.methods.toSafeObject = function() {
    const obj = this.toObject();
    delete obj.password;
    return obj;
};

// Static method to find active user by email
userSchema.statics.findByEmail = async function(email) {
    return this.findOne({ email: email.toLowerCase(), active: true });
};

// Middleware to handle pre-find operations
userSchema.pre(/^find/, function(next) {
    // Exclude inactive users by default
    this.find({ active: { $ne: false } });
    next();
});

const User = mongoose.model('User', userSchema);

// Add error handling for duplicate key errors
User.on('index', function(error) {
    if (error) {
        console.error('User model indexing error:', error);
    }
});

module.exports = User;