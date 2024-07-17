const express = require('express');
const { signup, login, getUserProfile, verifyEmail } = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/register', signup);
router.post('/login', login);
router.get('/me', authMiddleware, getUserProfile);
router.get('/verify-email', verifyEmail);

module.exports = router;

