// controllers/coursesController.js
const Course = require('../models/Courses'); // Fix the path
const createError = require('http-errors');







// Get all courses
exports.getAllCourses = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 6;

    const totalCourses = await Course.countDocuments();
    const courses = await Course.find()
      .skip((page - 1) * limit)
      .limit(limit);

    res.json({
      courses,
      currentPage: page,
      totalPages: Math.ceil(totalCourses / limit)
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching courses' });
  }
};

// Get single course
exports.getCourseById = async (req, res, next) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return next(createError(404, 'Course not found'));
    }

    res.render('course', { course }); 
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
