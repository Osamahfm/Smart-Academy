const express = require('express');
const router = express.Router();
const upload = require('../middlewares/uploadMiddleware');
const Course = require('../models/Course');
const { protect, isAdmin } = require('../middlewares/authMiddleware');

// Upload video for a course (admin only)
router.post('/:courseId', protect, isAdmin, upload.single('courseVideo'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No video file uploaded' });
        }

        const courseId = req.params.courseId;
        const videoUrl = `/uploads/videos/${req.file.filename}`;

        const course = await Course.findByIdAndUpdate(
            courseId,
            { videoUrl: videoUrl },
            { new: true }
        );

        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }

        res.json({
            message: 'Video uploaded successfully',
            videoUrl: course.videoUrl
        });
    } catch (error) {
        console.error('Error uploading video:', error);
        res.status(500).json({ message: 'Error uploading video' });
    }
});

// Get video for a course
router.get('/:courseId', async (req, res) => {
    try {
        const course = await Course.findById(req.params.courseId);
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }
        res.json({ videoUrl: course.videoUrl });
    } catch (error) {
        console.error('Error fetching video:', error);
        res.status(500).json({ message: 'Error fetching video' });
    }
});

module.exports = router; 