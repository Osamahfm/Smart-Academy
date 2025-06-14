// routes/courses.js
const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const { protect, isAdmin } = require('../middlewares/authMiddleware');
const validateRequest = require('../middlewares/validateRequest');
const coursesController = require('../controllers/coursesController');
const Course = require('../models/Course');

// Public routes
router.get('/', coursesController.getAllCourses);
router.get('/:id', coursesController.getCourseById);

// Admin-only routes
router.post(
  '/',
  protect,
  isAdmin,
  [
    body('title').notEmpty().withMessage('Title is required'),
    body('description').notEmpty().withMessage('Description is required'),
    body('duration').notEmpty().withMessage('Duration is required'),
    body('instructor').notEmpty().withMessage('Instructor is required')
  ],
  validateRequest,
  coursesController.createCourse
);

router.put('/:id', protect, isAdmin, coursesController.updateCourse);
router.delete('/:id', protect, isAdmin, coursesController.deleteCourse);

// Optional: Admin dashboard route
router.get('/admin/courses', protect, isAdmin, async (req, res) => {
  try {
    const courses = await Course.find();
    res.render('admin/courses', { courses, user: req.user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
