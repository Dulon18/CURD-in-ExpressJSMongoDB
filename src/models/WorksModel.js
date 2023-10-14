const mongoose = require('mongoose');


const WorksSchema = new mongoose.Schema({

     title: {
          type: String,
          required: true
     },
     ClassNote: {
          type: String,
          required: true
     },
     description: {
          type: String,
          required: true
     },
     status: {
          type: String,
          required: true
     },
     email: {
          type: String,
          required: true
     },
});

const Works = mongoose.model('Works', WorksSchema);
module.exports = Works;