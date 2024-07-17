const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = async (req, res, next) => {
  let token;

  // Check if the Authorization header is present and starts with 'Bearer'
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Extract token from header
      token = req.headers.authorization.split(' ')[1];

      // Log token for debugging
      console.log('Token received:', token);

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Log decoded token for debugging
      console.log('Decoded token:', decoded);

      // Fetch user based on decoded ID
      req.user = await User.findById(decoded.id).select('-password');

      // Log user for debugging
      console.log('User found:', req.user);

      // Proceed to next middleware or route
      next();
    } catch (error) {
      console.error('Token verification error:', error);
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  } else {
    if (!token) {
      console.error('No token found in authorization header');
    }
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};
