// controllers/coursesController.js
const Course = require('../models/Course');
const createError = require('http-errors');

// Get all courses
exports.getCourses = async (req, res) => {
    try {
        const courses = await Course.find();
        res.json(courses);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get single course
exports.getCourse = async (req, res, next) => {
    try {
        const course = await Course.findById(req.params.id);
        
        if (!course) {
            return next(createError(404, 'Course not found'));
        }
        
        res.json(course);
    } catch (error) {
        next(createError(400, error.message));
    }
};

// Create new course
exports.createCourse = async (req, res, next) => {
    try {
        const course = await Course.create(req.body);
        res.status(201).json(course);
    } catch (error) {
        next(createError(400, error.message));
    }
};

// Update course
exports.updateCourse = async (req, res, next) => {
    try {
        const course = await Course.findByIdAndUpdate(
            req.params.id, 
            req.body,
            { new: true, runValidators: true }
        );
        
        if (!course) {
            return next(createError(404, 'Course not found'));
        }
        
        res.json(course);
    } catch (error) {
        next(createError(400, error.message));
    }
};

// Delete course
exports.deleteCourse = async (req, res, next) => {
    try {
        const course = await Course.findByIdAndDelete(req.params.id);
        
        if (!course) {
            return next(createError(404, 'Course not found'));
        }
        
        res.status(204).send();
    } catch (error) {
        next(createError(400, error.message));
    }
};
