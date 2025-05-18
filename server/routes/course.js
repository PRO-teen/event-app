const express = require('express');
const router = express.Router();
const multer = require('multer');
const Course = require('../models/Course'); // path may vary
const auth = require('../middleware/authMiddleware')

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/api/courses", async (req, res) => {
  
  try {
    const { title, desc, price} = req.body;
  const newCourse = new Course({
    title,
    desc,
    price,
    seller: req.userId
  });

    await course.save(); // ✅ Now it's allowed
    res.status(201).json({ message: "Course created successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create course" });
  }
});


module.exports = router;
