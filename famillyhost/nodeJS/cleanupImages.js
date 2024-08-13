const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const Service = require('./models/service');
require('dotenv').config();

const UPLOADS_DIR = path.join(__dirname, 'uploads');

// Connect to the database
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Database connected');
    cleanupImages();
  })
  .catch(err => {
    console.error('Database connection error:', err);
  });

async function cleanupImages() {
  try {
    // Fetch all services to get the images used in the database
    const services = await Service.find();
    
    // Get all images referenced in the database
    const imagesInDb = new Set();
    
    services.forEach(service => {
      if (service.stateImage) imagesInDb.add(service.stateImage);
      if (service.cityImage) imagesInDb.add(service.cityImage);
      if (service.architectHomeImage) imagesInDb.add(service.architectHomeImage);
      
      if (service.eatImages && service.eatImages.length > 0) {
        service.eatImages.forEach(image => imagesInDb.add(image));
      }
      if (service.moroccanDecorationImages && service.moroccanDecorationImages.length > 0) {
        service.moroccanDecorationImages.forEach(image => imagesInDb.add(image));
      }
      if (service.clothingImages && service.clothingImages.length > 0) {
        service.clothingImages.forEach(image => imagesInDb.add(image));
      }
    });

    // Get all images in the uploads directory
    const allImages = fs.readdirSync(UPLOADS_DIR);

    // Identify and remove unused images
    allImages.forEach(image => {
      if (!imagesInDb.has(image)) {
        const imagePath = path.join(UPLOADS_DIR, image);
        fs.unlinkSync(imagePath);
        console.log(`Removed unused image: ${image}`);
      }
    });

    console.log('Cleanup complete.');
    mongoose.disconnect();
  } catch (error) {
    console.error('Error during cleanup:', error);
  }
}
