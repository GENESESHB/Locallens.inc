const User = require('../models/User');

// Fetch user by ID
exports.getUserById = async (req, res) => {
  try {
    console.log('Request received for user ID:', req.params.id); // Log request
    const user = await User.findById(req.params.id); // Fetch user by ID
    if (!user) {
      console.log('User not found'); // Log if user not found
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error('Error fetching user by ID:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get user profile
exports.getUserProfile = async (req, res) => {
  try {
    const user = req.user; // `req.user` is set by authMiddleware
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (error) {
    console.error('Error fetching user profile:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update user profile
exports.updateUserProfile = async (req, res) => {
  try {
    const { fullName, email, phoneNumber, city } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id, // Use user ID from authMiddleware
      { fullName, email, phoneNumber, city },
      { new: true, runValidators: true }
    );
    if (!updatedUser) return res.status(404).json({ message: 'User not found' });
    res.json(updatedUser);
  } catch (error) {
    console.error('Error updating user profile:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

