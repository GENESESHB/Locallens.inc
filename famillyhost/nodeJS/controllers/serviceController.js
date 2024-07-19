const Service = require('../models/service');

// Add a new service
exports.addService = async (req, res) => {
  try {
    const {
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
      clothingImages,
      userId, // Access userId from req.body
      profilePicture,
      userName // Access userName from req.body
    } = req.body;

    const newService = new Service({
      userId,
      userName,
      profilePicture,
      stateName,
      stateImage: req.files['stateImage'] ? req.files['stateImage'][0].path : null,
      cityName,
      cityImage: req.files['cityImage'] ? req.files['cityImage'][0].path : null,
      architectHomeName,
      architectHomeImage: req.files['architectHomeImage'] ? req.files['architectHomeImage'][0].path : null,
      eatName,
      eatImages: req.files['eatImages'] ? req.files['eatImages'][0].path : null,
      moroccanDecorationName,
      moroccanDecorationImages: req.files['moroccanDecorationImages'] ? req.files['moroccanDecorationImages'][0].path : null,
      clothingName,
      clothingImages: req.files['clothingImages'] ? req.files['clothingImages'][0].path : null
    });

    await newService.save();
    res.status(201).json({ message: 'Service added successfully', service: newService });
  } catch (error) {
    console.error('Error adding service:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
