const express = require('express');
const expressRouter = express.Router();
const studentController = require("../controllers/StudentController");
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
expressRouter.post('/', studentController.create);
expressRouter.put('/:id', studentController.update)
expressRouter.delete('/:id', studentController.delete)

module.exports = expressRouter;
