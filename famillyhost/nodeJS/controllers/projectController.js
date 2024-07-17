// backend/controllers/projectController.js
const Project = require('../models/Project');

exports.getProjects = async (req, res) => {
  const projects = await Project.find({ user: req.user._id });
  res.json(projects);
};

exports.createProject = async (req, res) => {
  const { title, description } = req.body;

  const project = new Project({
    title,
    description,
    user: req.user._id,
  });

  const createdProject = await project.save();
  res.status(201).json(createdProject);
};
