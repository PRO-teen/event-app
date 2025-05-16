const express = require('express');
const router = express.Router();
const multer = require('multer');
const Course = require('../models/Course');

// Configure multer for memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Define the route to handle course creation
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { title, desc, price } = req.body;
    const image = req.file;

    if (!title || !desc || !price || !image) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const newCourse = new Course({
      title,
      desc,
      price,
      image: image.originalname, // Adjust as needed
    });

    await newCourse.save();
    res.status(201).json({ message: 'Course created successfully' });
  } catch (error) {
    console.error('Error creating course:', error);
    res.status(500).json({ message: 'Failed to create course' });
  }
});

module.exports = router;
