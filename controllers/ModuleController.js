const Module = require('../models/Module');
const ErrorResponse = require("../utils/ErrorResponse");

/*
* @description  get all lab modules data
* @route        GET /api/v1/module
* @access       public
* */
exports.findAll = async (req, res, next) => {
    res.status(200).json(res.RequestParamMiddleware);
}

/*
* @description  get one lab modules data by id
* @route        GET /api/v1/module/:id
* @access       public
* */
exports.findOne = async (req, res, next) => {
    try{
        const requestedModule = await Module.findById(req.params.id);
        if(!requestedModule){
            return next(new ErrorResponse(`Cannot find modules with id of ${req.params.id}`, 404));
        }
        res.status(200).json({success: true, data: requestedModule});
    }catch (e) {
        next(e);
    }
}

/*
* @description  create a lab modules data
* @route        POST /api/v1/module
* @access       private
* */
exports.create = async (req, res, next) => {
    try {
        const createdModule  = await Module.create(req.body);
        res.status(201).json({success: true, data: createdModule});
    }catch (e) {
        next(e);
    }

}

/*
* @description  update a lab modules data
* @route        PUT /api/v1/module/:id
* @access       private
* */
exports.update = async (req, res, next) => {
    try{
        const requestedModule = await Module.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        if(!requestedModule){
            return next(new ErrorResponse(`Cannot find modules with id of ${req.params.id}`, 404));
        }
        res.status(200).json({success: true, data: requestedModule});
    }catch (e) {
        next(e);
    }

}

/*
* @description  delete a lab modules data
* @route        DELETE /api/v1/module/:id
* @access       private
* */
exports.delete = async (req, res, next) => {
    try{
        const requestedModule = await Module.findByIdAndDelete(req.params.id);
        if(!requestedModule){
            return next(new ErrorResponse(`Cannot find modules with id of ${req.params.id}`, 404));
        }
        res.status(200).json({success: true, data: {}});
    }catch (e) {
        next(e);
    }
}
