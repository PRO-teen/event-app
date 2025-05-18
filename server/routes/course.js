const express = require('express');
const router = express.Router();
const multer = require('multer');
const Course = require('../models/Course'); // path may vary

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { title, desc, price } = req.body;
    const image = req.file;

    if (!title || !desc || !price || !image) {
      return res.status(400).json({ message: 'Missing fields' });
    }

    const course = new Course({
      title,
      desc,
      price,
      image: {
      data: image.buffer,
      contentType: image.mimetype,
    }
    });

    await course.save();
    res.status(201).json({ message: 'Course created successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
