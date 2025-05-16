const express = require('express');
const multer = require('multer');
const Course = require('../models/Course');

const router = express.Router();

// Setup multer for handling file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// POST /api/courses
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { title, desc, price } = req.body;

    if (!req.file) {
      return res.status(400).json({ error: 'Image is required' });
    }

    const newCourse = new Course({
      title,
      desc,
      price,
      image: {
        data: req.file.buffer,
        contentType: req.file.mimetype,
      },
    });

    await newCourse.save();
    res.status(201).json({ message: 'Course created successfully' });
  } catch (error) {
    console.error('Course creation failed:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
