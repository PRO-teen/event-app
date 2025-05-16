const express = require('express');
const router = express.Router();
const multer = require('multer');
const Course = require('../models/Course');

// Memory storage just for now (later: upload to Cloudinary or similar)
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { title, desc, price } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: 'Image is required' });
    }

    const newCourse = new Course({
      title,
      desc,
      price,
      image: req.file.originalname, // temporarily storing image filename
    });

    await newCourse.save();
    res.status(201).json({ message: '✅ Course created successfully' });
  } catch (err) {
    console.error('Error creating course:', err);
    res.status(500).json({ message: '❌ Error creating course' });
  }
});

module.exports = router;
