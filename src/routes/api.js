const express=require('express');

const router = express.Router();

const productController = require("../controllers/studentController");
const worksController = require('../controllers/worksController');

// Student route
router.post('/login', studentController.login); 
router.post("/createStudent", studentController.createStudent);
router.get("/get-allStudent", studentController.getAllStudent);
router.delete("/deleteStudent/:id", studentController.deleteStudent);
router.post("/updateStudent/:id", studentController.updateStudent);


//works route
router.post('/createWork', worksController.createWork);
router.get('/get-allWorks', worksController.getAllWorks);
router.get('/getWork/:id', worksController.getWorkById);
router.post('/updateWork/:id', worksController.updateWorkById);
router.delete('/deleteWork/:id', worksController.deleteWorkById);

module.exports=router;