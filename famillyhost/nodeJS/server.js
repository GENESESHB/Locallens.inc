const express = require('express');
const mongoose = require('mongoose');
const Service = require('./models/service');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes'); // Ensure this path is correct
const authRoutes = require('./routes/authRoutes'); // Ensure this path is correct
const serviceRoutes = require('./routes/serviceRoutes');

require('dotenv').config();

const app = express();

app.use(express.json());
app.use(cors({
  origin: 'http://localhost:4000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

app.use('/uploads', express.static('uploads'));

app.get('/api/services', async (req, res) => {
  try {
    const services = await Service.find().sort({ createdAt: -1 }); // Sort by createdAt in descending order
    res.status(200).json(services); // Send services as JSON response
  } catch (error) {
    console.error('Error fetching services:', error);
    res.status(500).json({ message: 'Internal Server Error' }); // Handle errors
  }
});

app.use('/api', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/user', serviceRoutes);

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(error => console.error('Database connection error:', error));
