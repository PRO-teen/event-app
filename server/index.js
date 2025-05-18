const express = require("express");
const mongoose = require('mongoose')
const cors = require("cors");
const session = require('express-session');
const passport = require('passport');
require('./passport');
const authRoutes = require("./routes/auth");
const app = express();


//uses
require("dotenv").config();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
  secret: 'keyboard cat', // 🔒 secure this in env
  resave: false,
  saveUninitialized: true,
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
