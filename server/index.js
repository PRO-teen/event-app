const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();

require('dotenv').config();
app.use(cors());
app.use(express.json());



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
