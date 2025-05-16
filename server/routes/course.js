const express = require('express');
const multer = require('multer');
const router = express.Router();
const Course = require('../models/Course');

const storage = multer.memoryStorage(); // or diskStorage
const upload = multer({ storage: storage });

router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { title, desc, price } = req.body;
    const newCourse = new Course({
      title,
      desc,
      price,
      image: req.file ? req.file.originalname : '', // optional
    });
    await newCourse.save();
    res.status(201).json({ message: 'Course created!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to create course' });
  }
});

module.exports = router;
