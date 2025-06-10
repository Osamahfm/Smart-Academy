// routes/courses.js
const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const validateRequest = require('../middlewares/validateRequest');
const coursesController = require('../controllers/coursesController');

router.post(
  '/',
  [
    body('title').notEmpty().withMessage('Title is required'),
    body('description').notEmpty().withMessage('Description is required'),
    body('duration').notEmpty().withMessage('Duration is required'),
    body('instructor').notEmpty().withMessage('Instructor is required')
  ],
  validateRequest,
  coursesController.createCourse
);

module.exports = router;