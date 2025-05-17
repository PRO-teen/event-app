require("dotenv").config();
const express = require("express");
const session = require("express-session");
const passport = require("passport");
const mongoose = require('mongoose')
const cors = require("cors");
const app = express();

require("./config/passport");
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}));
app.use(passport.initialize());
app.use(passport.session());

app.use("/auth", require("./routes/auth"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.get('/api/ping', (req, res) => {
  res.json({ message: 'pong from backend working' });
});


mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

const courseRoutes = require('./routes/course');
app.use('/api/courses', courseRoutes);




const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
