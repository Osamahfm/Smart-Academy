<<<<<<< HEAD
// routes/courses.js
=======
>>>>>>> 387d417fdbda7d3727b12aab43fb731d11dd5f07
const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const { isAdmin } = require('../middleware/authMiddleware');
const validateRequest = require('../middlewares/validateRequest');
const coursesController = require('../controllers/coursesController');
<<<<<<< HEAD
const Course = require('../models/Course');

// Public routes (accessible to all users)
router.get('/', coursesController.getAllCourses);
router.get('/:id', coursesController.getCourseById);

// Admin-only routes
router.post(
  '/',
=======
const { protect, isAdmin } = require('../middlewares/authMiddleware');

// Public
router.get('/', coursesController.getAllCourses);
router.get('/:id', coursesController.getCourseById);

// Admin-only
router.post(
  '/',
  protect,
>>>>>>> 387d417fdbda7d3727b12aab43fb731d11dd5f07
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

<<<<<<< HEAD
router.put('/:id', isAdmin, coursesController.updateCourse);
router.delete('/:id', isAdmin, coursesController.deleteCourse);

// Admin dashboard routes
router.get('/admin/courses', isAdmin, async (req, res) => {
    try {
        const courses = await Course.find();
        res.render('admin/courses', { courses, user: req.user });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
=======
router.put('/:id', protect, isAdmin, coursesController.updateCourse);
router.delete('/:id', protect, isAdmin, coursesController.deleteCourse);

module.exports = router;
>>>>>>> 387d417fdbda7d3727b12aab43fb731d11dd5f07
