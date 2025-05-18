const express = require("express");
const mongoose = require('mongoose')
const cors = require("cors");
const app = express();


//uses
require("dotenv").config();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//datbase
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));


//routes

const courseRoutes = require('./routes/course');
app.use('/api/courses', courseRoutes);


//port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
