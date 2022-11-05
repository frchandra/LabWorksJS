const express = require('express');
const expressRouter = express.Router();
const studentController = require("../controllers/StudentController");
const { protect } = require('../middleware/AuthMiddleware');
/*
* This is used for catching the query parameter on the URL string
* */
const RequestParamMiddleware = require("../middleware/RequestParamMiddleware");
const Student = require("../models/Student");


/*
* Basic CRUD functionality
* */
expressRouter.get('/', RequestParamMiddleware(Student), studentController.findAll);
expressRouter.get('/:id', studentController.findOne);
expressRouter.post('/', protect, studentController.create);
expressRouter.put('/:id', protect, studentController.update)
expressRouter.delete('/:id', protect, studentController.delete)

module.exports = expressRouter;
