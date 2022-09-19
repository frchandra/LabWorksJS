const Module = require('../models/Module');


/*
* @description  get all lab modules data
* @route        GET /api/v1/module
* @access       public
* */
exports.findAll = async (req, res, next) => {
    try{
        const requestedModules = await Module.find();
        res.status(200).json({success: true, data: requestedModules});
    }catch (e) {
        res.status(400).json({success: false});
    }
}

/*
* @description  get one lab modules data by id
* @route        GET /api/v1/module/:id
* @access       public
* */
exports.findOne = async (req, res, next) => {
    try{
        const requestedModule = await Module.findById(req.params.id);
        res.status(200).json({success: true, data: requestedModule});
    }catch (e) {
        res.status(400).json({success: false});
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
        res.status(400).json({success: false});
    }

}

/*
* @description  update a lab modules data
* @route        PUT /api/v1/module/:id
* @access       private
* */
exports.update = (req, res, next) => {
    const id = req.params.id;
    Module.findByIdAndUpdate(id, req.body)
        .then((result) =>{
            if (!result){
                res.status(404).send({
                    message: "Modules not found"
                });
            }
            res.send({
                message: "Modules was updated"
            });
        }).catch((e)=>{
        res.status(409).send({
            message: e.message || "some error while updating data"
        });
    })
}


/*
* @description  delete a lab modules data
* @route        DELETE /api/v1/module/:id
* @access       private
* */
exports.delete = (req, res, next) => {
    const id = req.params.id;
    Module.findByIdAndRemove(id)
        .then((result)=>{
            if (!result){
                res.status(404).send({
                    message: "Modules not found"
                });
            }
            res.send({
                message: "Modules was deleted"
            });
        }).catch((e)=>{
        res.status(409).send({
            message: e.message || "some error while deleting data"
        });
    })
}
