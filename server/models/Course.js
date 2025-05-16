// models/Course.js
const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
  title: String,
  desc: String,
  price: Number,
  image: String, // or Buffer if you're saving it differently
});

module.exports = mongoose.model('Course', CourseSchema);
