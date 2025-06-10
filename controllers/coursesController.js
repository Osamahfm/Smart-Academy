// controllers/coursesController.js
const createError = require('http-errors');

// In-memory data store
let courses = [
  {
    id: 1,
    title: 'Introduction to Programming',
    description: 'Learn the basics of programming',
    duration: '8 weeks',
    instructor: 'John Doe'
  },
  {
    id: 2,
    title: 'Web Development Fundamentals',
    description: 'Learn HTML, CSS, and JavaScript',
    duration: '10 weeks',
    instructor: 'Jane Smith'
  }
];

let nextId = 3;

// Get all courses
exports.getCourses = (req, res) => {
  res.json(courses);
};

// Get single course
exports.getCourse = (req, res, next) => {
  const course = courses.find(c => c.id === parseInt(req.params.id));
  
  if (!course) {
    return next(createError(404, 'Course not found'));
  }
  
  res.json(course);
};

// Create new course
exports.createCourse = (req, res) => {
  const { title, description, duration, instructor } = req.body;
  
  if (!title || !description || !duration || !instructor) {
    return next(createError(400, 'Missing required fields'));
  }
  
  const newCourse = {
    id: nextId++,
    title,
    description,
    duration,
    instructor
  };
  
  courses.push(newCourse);
  res.status(201).json(newCourse);
};

// Update course
exports.updateCourse = (req, res, next) => {
  const course = courses.find(c => c.id === parseInt(req.params.id));
  
  if (!course) {
    return next(createError(404, 'Course not found'));
  }
  
  const { title, description, duration, instructor } = req.body;
  
  if (title) course.title = title;
  if (description) course.description = description;
  if (duration) course.duration = duration;
  if (instructor) course.instructor = instructor;
  
  res.json(course);
};

// Delete course
exports.deleteCourse = (req, res, next) => {
  const courseIndex = courses.findIndex(c => c.id === parseInt(req.params.id));
  
  if (courseIndex === -1) {
    return next(createError(404, 'Course not found'));
  }
  
  courses = courses.filter(c => c.id !== parseInt(req.params.id));
  res.status(204).send();
};
