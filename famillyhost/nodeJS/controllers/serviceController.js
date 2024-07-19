const Service = require('../models/service');

// Add a new service
exports.addService = async (req, res) => {
  try {
    const {
      stateName,
      cityName,
      architectHomeName,
      eatName,
      moroccanDecorationName,
      clothingName,
      userId, // Access userId from req.body
      profilePicture,
      userName // Access userName from req.body
    } = req.body;

    // Handle multiple files for eatImages and clothingImages
    const stateImage = req.files['stateImage'] ? req.files['stateImage'][0].path : null;
    const cityImage = req.files['cityImage'] ? req.files['cityImage'][0].path : null;
    const architectHomeImage = req.files['architectHomeImage'] ? req.files['architectHomeImage'][0].path : null;
    const eatImages = req.files['eatImages'] ? req.files['eatImages'].map(file => file.path) : [];
    const moroccanDecorationImages = req.files['moroccanDecorationImages'] ? req.files['moroccanDecorationImages'].map(file => file.path) : [];
    const clothingImages = req.files['clothingImages'] ? req.files['clothingImages'].map(file => file.path) : [];

    const newService = new Service({
      userId,
      userName,
      profilePicture,
      stateName,
      stateImage,
      cityName,
      cityImage,
      architectHomeName,
      architectHomeImage,
      eatName,
      eatImages,
      moroccanDecorationName,
      moroccanDecorationImages,
      clothingName,
      clothingImages
    });

    await newService.save();
    res.status(201).json({ message: 'Service added successfully', service: newService });
  } catch (error) {
    console.error('Error adding service:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getServicesByUserId = async (req, res) => {
  const { userId } = req.params;

  try {
    const services = await Service.find({ userId });
    res.status(200).json(services);
  } catch (error) {
    console.error('Error fetching services:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

