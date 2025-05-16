const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  title: String,
  desc: String,
  price: Number,
  image: String, // or image: Buffer if you store actual image data
});

module.exports = mongoose.model('Course', courseSchema);
