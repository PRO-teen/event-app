const express = require('express');
const router = express.Router();
const multer = require('multer');
const Course = require('../models/Course'); // you'll need this schema

// For storing images locally (or you can configure for cloud storage)
const storage = multer.memoryStorage(); // or diskStorage
const upload = multer({ storage });

// POST /api/courses
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { title, desc, price } = req.body;
    const image = req.file;

    if (!title || !desc || !price || !image) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // For now, let's just save text fields. We'll handle image upload later.
    const newCourse = new Course({
      title,
      desc,
      price,
      image: image.originalname, // just storing name for now
    });

    await newCourse.save();
    res.status(201).json({ message: 'Course created successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error creating course' });
  }
});

module.exports = router;
