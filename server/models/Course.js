const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  title: String,
  desc: String,
  price: Number,
  image: String, // if you're using image uploads
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // reference the User model
  },
});

module.exports = mongoose.model("Course", courseSchema);
