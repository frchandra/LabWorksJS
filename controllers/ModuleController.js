const Module = require('../models/Module');
const Student = require('../models/Student');
const ErrorResponse = require("../utils/ErrorResponse");
const asyncHandler = require('../middleware/AsyncHandlerMiddleware');

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

exports.addStudent = asyncHandler( async (req, res, next) => {
    const student = req.student;
    // try{
        const module = await Module.findById(req.params.id);

        const requestedModule =  Module.findOneAndUpdate({_id: req.params.id}, {$push: {students: student.name}, $inc:{studentsNum:1}}, {new: true},
            function (error, success) {
                if (error) {
                    console.log(error);
                } else {
                    console.log(success);
                }
            }
        );


       Student.findOneAndUpdate({_id: student._id}, {$push: {lab: module.title}, $inc:{labNum:1}},
            function (error, success) {
                if (error) {
                    console.log(error);
                } else {
                    console.log(success);
                }
            }
        )
        if(!requestedModule){
            return next(new ErrorResponse(`Cannot find modules with id of ${req.params.id}`, 404));
        }

        res.status(200).json({success: true, data: module});
    // }catch (e) {
    //     next(e);
    // }

    // res.status(200).json({
    //     success: true,
    //     data: "bug",
    // });
}
)
