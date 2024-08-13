const multer = require('multer');
const path = require('path');
const Comment = require('../models/Comment'); // Adjust the path as needed

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploadscoment/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage, limits: { fileSize: 4 * 1024 * 1024 }, });

// Create a new comment
const createComment = async (req, res) => {
  const { name, comment, rating } = req.body;
  const image = req.file ? req.file.filename : null;

  try {
    const newComment = new Comment({
      name,
      comment,
      rating,
      image,
      serviceId: req.params.serviceId,
    });

    await newComment.save();
    res.status(201).json(newComment);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add comment' });
  }
};

// Get comments by service ID
const getComments = async (req, res) => {
  try {
    const comments = await Comment.find({ serviceId: req.params.serviceId }).sort({ createdAt: -1 });
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch comments' });
  }
};

// Update a comment by ID
const updateComment = async (req, res) => {
  const { name, comment, rating } = req.body;
  const image = req.file ? req.file.filename : null;

  try {
    const updatedComment = await Comment.findByIdAndUpdate(
      req.params.id,
      { name, comment, rating, image },
      { new: true }
    );
    res.status(200).json(updatedComment);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update comment' });
  }
};

// Delete a comment by ID
const deleteComment = async (req, res) => {
  try {
    await Comment.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete comment' });
  }
};

module.exports = {
  upload,
  createComment,
  getComments,
  updateComment,
  deleteComment,
};
