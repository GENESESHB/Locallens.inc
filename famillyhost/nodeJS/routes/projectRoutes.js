// backend/routes/projectRoutes.js
const express = require('express');
const { getProjects, createProject } = require('../controllers/projectController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.route('/').get(authMiddleware, getProjects).post(authMiddleware, createProject);

module.exports = router;
