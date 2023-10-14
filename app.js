const express = require('express');
const router = require('./src/routes/api');
const mongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser');

app.use("/api/", router);

app.use("*", (req, res) => {
     res.status(404).json({ status: "fail", data: "Not Found..Sorry..Shut u computer & go to sleep..tata" });
});

module.exports = app;