const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { sendVerificationEmail } = require('../config/nodemailer');

// Function to check if password meets strength criteria
function isStrongPassword(password) {
  const regex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
  return regex.test(password);
}

exports.signup = async (req, res) => {
  const { email, fullName, password, phoneNumber, city } = req.body;

  console.log('Signup request received with the following data:');
  console.log('Email:', email);
  console.log('Full Name:', fullName);
  console.log('Password:', password); // Avoid logging passwords in production
  console.log('Phone Number:', phoneNumber);
  console.log('City:', city);

  if (!isStrongPassword(password)) {
    return res.status(400).json({ message: 'Password should be at least 8 characters long and contain at least one uppercase letter and one digit' });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      email,
      fullName,
      password: hashedPassword,
      phoneNumber,
      city,
    });

    await newUser.save();
    await sendVerificationEmail(newUser);

    res.status(201).json({ message: 'Registration successful, please check your email for verification link' });
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.verifyEmail = async (req, res) => {
  const { token } = req.query;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(400).json({ message: 'Invalid verification link' });
    }

    user.isEmailVerified = true;
    await user.save();

    // Redirect URL with a success message
    res.redirect('http://localhost:4000/login?message=Email%20verified%20successfully%2C%20please%20login%20to%20continue');
  } catch (error) {
    console.error('Email verification error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


// Function to generate a JWT token
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

// Use this function in your login controller
exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && bcrypt.compareSync(password, user.password)) {
    res.json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      token: generateToken(user._id), // Make sure generateToken is defined
    });
  } else {
    res.status(401).json({ message: 'Invalid email or password' });
  }
};

exports.getUserProfile = async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      city: user.city,
      isEmailVerified: user.isEmailVerified,
    });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
};

