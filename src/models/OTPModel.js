const mongoose = require('mongoose');

const OTPSchema = new mongoose.Schema({

     email: {
          type: String,
          required: true
     },
     otp: {
          type: String,
          required: true
     },
     status: {
          type: String,
          required: true
     },
});

const OTP = mongoose.model('OTP', OTPSchema);

module.exports = OTP;