const express = require('express');
const mongoose = require('mongoose');
const Service = require('./models/service');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const serviceRoutes = require('./routes/serviceRoutes');
const Booking = require('./models/booking');
const User = require('./models/User');
const SearchLog = require('./models/SearchLog');
const commentRoutes = require('./routes/commentRoutes');
const reelRoutes = require('./routes/reelRoutes');


require('dotenv').config();

const app = express();

app.use(express.json());
app.use(cors({
  origin: 'http://localhost:4000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

app.use('/uploads', express.static('uploads'));
app.use('/uploadscoment', express.static('uploadscoment'));
app.use('/api', reelRoutes);

app.get('/api/services', async (req, res) => {
  try {
    const services = await Service.find().sort({ createdAt: -1 }); // Sort by createdAt in descending order
    res.status(200).json(services); // Send services as JSON response
  } catch (error) {
    console.error('Error fetching services:', error);
    res.status(500).json({ message: 'Internal Server Error' }); // Handle errors
  }
});

app.get('/product/:id', async (req, res) => {
  try {
    // Fetch the service using the service ID, excluding 'userName' and 'profilePicture'
    const service = await Service.findById(req.params.id).select('-userName -profilePicture');
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }

    // Fetch the user using the user ID from the service
    const user = await User.findById(service.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Return the service and user information
    res.json({ service, user });
  } catch (err) {
    console.error('Error fetching service and user details:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.get('/api/product/:id', async (req, res) => {
  try {
    console.log('req', req.body);
    const product = await Service.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Service not found' });
    }
    res.json(product);
  } catch (err) {
    console.error('Error fetching service details:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});
app.post('/bookings', async (req, res) => {
  try {
    const { name, email, phone, date, serviceId } = req.body;

    // Validate required fields
    if (!name || !email || !phone || !date || !serviceId) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Fetch the service details by ID
    const service = await Service.findById(serviceId);
    if (!service) {
      return res.status(404).json({ error: 'Service not found' });
    }

    // Fetch the user details using the userId from the service
    const user = await User.findById(service.userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Check if a booking already exists for the same date and user
    const existingBooking = await Booking.findOne({ 'user.email': user.email, date });
    if (existingBooking) {
      return res.status(400).json({ error: 'You can only make one booking per day.' });
    }

    // Create a new booking document with service and user details
    const newBooking = new Booking({
      name,
      email,
      phone,
      date,
      service: {
        stateName: service.stateName,
        stateImage: service.stateImage,
        cityName: service.cityName,
        cityImage: service.cityImage,
        architectHomeName: service.architectHomeName,
        architectHomeImage: service.architectHomeImage,
        moroccanDecorationName: service.moroccanDecorationName,
        moroccanDecorationImages: service.moroccanDecorationImages,
        eatName: service.eatName,
        eatImages: service.eatImages,
        clothingName: service.clothingName,
        clothingImages: service.clothingImages,
      },
      user: {
        userName: user.userName,
        profilePicture: user.profilePicture,
        fullName: user.fullName,
        email: user.email,
        phoneNumber: user.phoneNumber,
      }
    });

    // Save the booking to the database
    await newBooking.save();

    res.status(200).json({ message: 'Booking successful!' });
  } catch (error) {
    console.error('Error creating booking:', error);
    res.status(500).json({ error: 'Failed to create booking' });
  }
});

// Search route
// Search route
app.get('/api/search', async (req, res) => {
  try {
    const { keyword, userId, ipAddress } = req.query;
    if (!keyword) {
      return res.status(400).json({ error: 'Keyword is required' });
    }

    console.log('Received keyword:', keyword);
    console.log('Received userId:', userId);
    console.log('Received IP Address:', ipAddress);

    // Perform text search
    const services = await Service.find({
      $text: { $search: keyword }
    });

    // Log search details
    const searchLog = new SearchLog({
      keyword,
      userIp: ipAddress || req.headers['x-forwarded-for'] || req.connection.remoteAddress,
      timestamp: new Date(),
      userId: userId || null
    });
    await searchLog.save();

    res.json(services);
  } catch (error) {
    console.error('Error processing search:', error);
    res.status(500).json({ error: error.message });
  }
});



app.use('/api', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/user', serviceRoutes);
app.use('/api', commentRoutes);


const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(error => console.error('Database connection error:', error));

