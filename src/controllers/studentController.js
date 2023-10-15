const mongoose = require("mongoose");
const StudentsModel = require("../models/StudentsModel");
const jwt = require('jsonwebtoken');

// Login 
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the user exists
    const user = await StudentsModel.findOne({ email, password });

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Generate JWT token
    const token = jwt.sign({ email: user.email }, 'secretKey');

    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

//! Create Student
exports.createStudent = async (req, res) => {
  try {
    let reqBody = req.body;
    let data = await StudentsModel.create(reqBody);
    res.status(200).json({ status: "Success", data: data });
  } catch (e) {
    res.status(200).json({ status: "error", error: e.toString() });
  }
};

//! Read Student Info
exports.getAllStudent = async (req, res) => {
  try {
    let data = await StudentsModel.aggregate([
      {
        $project: {
          email: 1,
          firstName: 1,
          lastName: 1,
          mobile: 1,
          address: 1,
          roll: 1,
          class: 1,
        },
      },
    ]);
    res.status(200).json({ status: "Success", data: data });
  } catch (e) {
    res.status(200).json({ status: "error", error: e.toString() });
  }
};

//! Delete Student
exports.deleteStudent = async (req, res) => {
  let id = new mongoose.Types.ObjectId(req.params.id);
  let query = { _id: id };
  try {
    let data = await StudentsModel.deleteOne(query);
    res.status(200).json({ status: "Success", data: data });
  } catch (e) {
    res.status(200).json({ status: "error", error: e.toString() });
  }
};

//! Update Student
exports.updateStudent = async (req, res) => {
  try {
    let id = new mongoose.Types.ObjectId(req.params.id);
    let query = { _id: id };
    let reqBody = req.body;
    let data = await StudentsModel.updateOne(query, reqBody);
    res.status(200).json({ status: "Success", data: data });
  } catch (e) {
    res.status(200).json({ status: "error", error: e.toString() });
  }
};
