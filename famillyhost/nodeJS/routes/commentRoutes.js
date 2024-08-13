const express = require('express');
const router = express.Router();
const {
  upload,
  createComment,
  getComments,
  updateComment,
  deleteComment,
} = require('../controllers/commentController');

// Define routes and attach controller functions
router.post('/comments/:serviceId', upload.single('image'), createComment);
router.get('/comments/:serviceId', getComments);
router.put('/comments/:id', upload.single('image'), updateComment);
router.delete('/comments/:id', deleteComment);

module.exports = router;
