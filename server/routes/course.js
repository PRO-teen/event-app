const express = require('express');
const Course = require('../models/Course');

const router = express.Router();

// POST /api/courses
router.post('/', async (req, res) => {
  try {
    const { title, desc, price } = req.body;
    const newCourse = new Course({
      title,
      desc,
      price,
    });

    await newCourse.save();
    res.status(201).json({ message: 'Course created successfully' });
  } catch (error) {
    console.error('Course creation failed:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
