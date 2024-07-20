
// serviceRoutes.js

const express = require('express');
const router = express.Router();
const upload = require('../config/multerConfig');
const { addService, getServicesByUserId } = require('../controllers/serviceController');

// POST route to add a new service
router.post('/service', upload.fields([
  { name: 'stateImage', maxCount: 1 },
  { name: 'cityImage', maxCount: 1 },
  { name: 'architectHomeImage', maxCount: 1 },
  { name: 'eatImages', maxCount: 3 }, // Adjusted to 3 if you want a maximum of 3 images
  { name: 'moroccanDecorationImages', maxCount: 3 }, // Adjusted to 3 if you want a maximum of 3 images
  { name: 'clothingImages', maxCount: 3 } // Adjusted to 3 if you want a maximum of 3 images
]), addService);

router.get('/services/:userId', getServicesByUserId);

module.exports = router;
