const express = require('express');
const router = require('./src/routes/api');
const mongoose = require('mongoose');
const app = new express();
const bodyParser = require('body-parser');

//! Security Middleware
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const hpp = require("hpp");
const cors = require("cors");

//! ENV
const dotENV = require("dotenv");
dotENV.config();

//! Security Middleware implements
app.use(helmet());
app.use(mongoSanitize());
app.use(xss());
app.use(hpp());
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "100mb" }));

//! Rate Limit
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 3000,
});
app.use(limiter);

//! BodyParser implements
app.use(bodyParser.json());

//! Database Connect
const mongoLocal = "mongodb://127.0.0.1:27017/CURD";

mongoose
  .connect(mongoLocal, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected Successfully"))
  .catch((err) => {
    console.error(err);
  });

//! Routes
app.use("/api/", router);

app.use("*", (req, res) => {
     res.status(404).json({ status: "fail", data: "Not Found..Sorry..Shut u computer & go to sleep..tata" });
});

module.exports = app;
