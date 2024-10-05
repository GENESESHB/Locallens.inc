const express = require('express');
const multer = require('multer');
const Reel = require('../models/Reel'); // Adjust the path to your reel model
const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Define your uploads directory
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // Unique filename
  },
});

const upload = multer({ storage });

// POST route to upload reel
router.post('/upload-reel', upload.single('reelFile'), async (req, res) => {
  try {
    const { reelType } = req.body;
    const userId = req.body.user; // Extract user ID from request body

    const newReel = new Reel({
      reelFile: req.file.path, // Assuming you're saving the path to the file
      reelType,
      user: userId, // Set the user ID here
    });

    await newReel.save();
    res.status(201).json({ message: 'Reel uploaded successfully', newReel });
  } catch (error) {
    console.error('Error saving reel:', error);
    res.status(500).json({ message: 'Error saving reel', error });
  }
});

// GET route to fetch all reels
router.get('/reels', async (req, res) => {
  try {
    const reels = await Reel.find().populate('user'); // Fetch reels and populate user data
    res.status(200).json(reels);
  } catch (error) {
    console.error('Error fetching reels:', error);
    res.status(500).json({ message: 'Error fetching reels', error });
  }
});

module.exports = router;
