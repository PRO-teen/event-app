const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  title: String,
  desc: String,
  price: Number,
  image: String, // can later be URL if using cloud
});

module.exports = mongoose.model('Course', courseSchema);
