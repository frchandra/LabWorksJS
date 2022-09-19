const express = require('express');
const expressRouter = express.Router();
const moduleController = require("../controllers/ModuleController");


expressRouter.get('/', moduleController.findAll);
expressRouter.get('/:id', moduleController.findOne);
expressRouter.post('/', moduleController.create);
expressRouter.put('/:id', moduleController.update)
expressRouter.delete('/:id', moduleController.delete)

module.exports = expressRouter;



// module.exports = (app)=>{
//     const modules = require("../controllers/ModuleController");
//     const router = require('express').Router();
//
//     router.get('/', modules.findAll);
//     router.get('/:id', modules.findOne);
//     router.post('/', modules.create);
//     router.put('/:id', modules.update)
//     router.delete('/:id', modules.delete)
//
//
//     app.use('/api/modules', router);
// }