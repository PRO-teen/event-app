const express = require("express");
const mongoose = require('mongoose')
const cors = require("cors");
const session = require('express-session');
const passport = require('./config/passport')
const authRoutes = require("./routes/auth");


//uses
require("dotenv").config();
const app = express();

app.use(cors({
  origin: "https://event-frontend-hkq4.onrender.com/",
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());

//datbase
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));


//routes

//courses create
const courseRoutes = require('./routes/course');
app.use('/api/courses', courseRoutes);

//auth
app.use('/auth', authRoutes);


//port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
