const express = require('express');
const expressRouter = express.Router();
const moduleController = require("../controllers/ModuleController");

const { protect, authorize} = require('../middleware/AuthMiddleware');
/*
* This is used for catching the query parameter on the URL string
* */
const RequestParamMiddleware = require("../middleware/RequestParamMiddleware");
const Module = require("../models/Module");


/*
* Basic CRUD functionality
* */
expressRouter.get('/', RequestParamMiddleware(Module), moduleController.findAll);
expressRouter.get('/:id', moduleController.findOne);
expressRouter.post('/', protect, authorize('admin'), moduleController.create);
expressRouter.put('/:id', protect, authorize('admin'), moduleController.update)
expressRouter.delete('/:id', protect, authorize('admin'), moduleController.delete)
expressRouter.put('/student/:id', protect, moduleController.addStudent)

module.exports = expressRouter;
