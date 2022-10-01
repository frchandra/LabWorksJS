const express = require('express');
const expressRouter = express.Router();
const moduleController = require("../controllers/ModuleController");
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
expressRouter.post('/', moduleController.create);
expressRouter.put('/:id', moduleController.update)
expressRouter.delete('/:id', moduleController.delete)

module.exports = expressRouter;
