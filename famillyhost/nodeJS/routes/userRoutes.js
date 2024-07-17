const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

// Route to get user profile by ID
router.get('/:id', authMiddleware, userController.getUserById);
// Route to get user profile
router.get('/profile', authMiddleware, userController.getUserProfile);

// Route to update user profile
router.put('/profile', authMiddleware, userController.updateUserProfile);

module.exports = router;
