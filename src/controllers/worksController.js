const WorksModel = require('../models/WorksModel');
const jwt = require('jsonwebtoken');

// Middleware to verify token
const authVerifyMiddleware = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const decoded = jwt.verify(token, 'secretKey');
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};


// Create a new work (authenticated)
const createWork = async (req, res) => {
     try {

    const { title, classNote, description, status } = req.body;
    const email = req.user.email;

    // Create a new work
    const work = new WorksModel({ title, classNote, description, status, email });
    await work.save();

    res.json(work);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Get all works
const getAllWorks = async (req, res) => {
  try {
    const works = await WorksModel.find();
    res.json(works);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Get a specific work by ID
const getWorkById = async (req, res) => {
  try {
    const work = await WorksModel.findById(req.params.id);

    if (!work) {
      return res.status(404).json({ message: 'Work not found' });
    }

    res.json(work);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Update a work by ID
const updateWorkById = async (req, res) => {
  try {
    const { title, classNote, description, status } = req.body;

    const updatedWork = await WorksModel.findByIdAndUpdate(
      req.params.id,
      { title, classNote, description, status },
      { new: true }
    );

    if (!updatedWork) {
      return res.status(404).json({ message: 'Work not found' });
    }

    res.json(updatedWork);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Delete a work by ID
const deleteWorkById = async (req, res) => {
  try {
    const deletedWork = await WorksModel.findByIdAndDelete(req.params.id);

    if (!deletedWork) {
      return res.status(404).json({ message: 'Work not found' });
    }

    res.json({ message: 'Work deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = {
  createWork,
  getAllWorks,
  getWorkById,
  updateWorkById,
  deleteWorkById,
  authVerifyMiddleware,
};
