const Student = require('../models/Student');
const ErrorResponse = require("../utils/ErrorResponse");

/*
* @description  get all lab student data
* @route        GET /api/v1/module
* @access       public
* */
exports.findAll = async (req, res, next) => {
    res.status(200).json(res.RequestParamMiddleware);
}
/*
* @description  get one lab student data by id
* @route        GET /api/v1/module/:id
* @access       public
* */
exports.findOne = async (req, res, next) => {
    try{
        const requestedStudent = await Student.findById(req.params.id);
        if(!requestedStudent){
            return next(new ErrorResponse(`Cannot find student with id of ${req.params.id}`, 404));
        }
        res.status(200).json({success: true, data: requestedStudent});
    }catch (e) {
        next(e);
    }
}
/*
* @description  create a lab student data
* @route        POST /api/v1/module
* @access       private
* */
exports.create = async (req, res, next) => {
    try {
        const createdStudent  = await Student.create(req.body);
        res.status(201).json({success: true, data: createdStudent});
    }catch (e) {
        next(e);
    }

}
/*
* @description  update a lab student data
* @route        PUT /api/v1/module/:id
* @access       private
* */
exports.update = async (req, res, next) => {
    try{
        const requestedStudent = await Student.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        if(!requestedStudent){
            return next(new ErrorResponse(`Cannot find student with id of ${req.params.id}`, 404));
        }
        res.status(200).json({success: true, data: requestedStudent});
    }catch (e) {
        next(e);
    }

}
/*
* @description  delete a lab student data
* @route        DELETE /api/v1/module/:id
* @access       private
* */
exports.delete = async (req, res, next) => {
    try{
        const requestedStudent = await Student.findByIdAndDelete(req.params.id);
        if(!requestedStudent){
            return next(new ErrorResponse(`Cannot find student with id of ${req.params.id}`, 404));
        }
        res.status(200).json({success: true, data: {}});
    }catch (e) {
        next(e);
    }
}
