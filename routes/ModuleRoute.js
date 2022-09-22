const express = require('express');
const expressRouter = express.Router();
const moduleController = require("../controllers/ModuleController");
const RequestParamMiddleware = require("../middleware/RequestParamMiddleware");
const Module = require("../models/Module");



expressRouter.get('/', RequestParamMiddleware(Module), moduleController.findAll);
expressRouter.get('/:id', moduleController.findOne);
expressRouter.post('/', moduleController.create);
expressRouter.put('/:id', moduleController.update)
expressRouter.delete('/:id', moduleController.delete)

module.exports = expressRouter;
