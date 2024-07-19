const express = require('express');
const router = express.Router();
const User = require('../models/User');
const upload = require('../config/multerConfig');
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/:id', authMiddleware, userController.getUserById);

router.put('/profile', authMiddleware, upload.fields([{ name: 'profilePicture', maxCount: 1 }, { name: 'coverPhoto', maxCount: 1 }]), userController.updateUserProfile);

module.exports = router;
