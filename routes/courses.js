const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const validateRequest = require('../middlewares/validateRequest');
const coursesController = require('../controllers/coursesController');
const { protect, isAdmin } = require('../middlewares/authMiddleware');

// for Public
router.get('/', coursesController.getAllCourses);
router.get('/:id', coursesController.getCourseById);

// for Admin-only
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

module.exports = router;
