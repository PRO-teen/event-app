const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  title: String,
  desc: String,
  price: Number,
  image: {
    data: Buffer,
    contentType: String
  }
});

module.exports = mongoose.model('Course', courseSchema);
