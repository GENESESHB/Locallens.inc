// serviceRoutes.js

const express = require('express');
const router = express.Router();
const upload = require('../config/multerConfig');
const { addService } = require('../controllers/serviceController');

// POST route to add a new service
router.post('/service', upload.fields([
  { name: 'stateImage', maxCount: 1 },
  { name: 'cityImage', maxCount: 1 },
  { name: 'architectHomeImage', maxCount: 1 },
  { name: 'eatImages', maxCount: 5 },
  { name: 'moroccanDecorationImages', maxCount: 5 },
  { name: 'clothingImages', maxCount: 5 }
]), addService);

module.exports = router;

