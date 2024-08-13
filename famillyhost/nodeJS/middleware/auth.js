// middleware/auth.js
const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) {
    return next(); // Proceed without setting userId if no token is present
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Invalid token' });
    }
    req.userId = decoded.id; // Attach user ID to request
    next();
  });
};

module.exports = { verifyToken };
