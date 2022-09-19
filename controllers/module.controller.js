const db = require('../models');
const Module = db.modules;

exports.findAll = (req, res) => {
    Module.find()
        .then((result)=>{
            res.send(result);
        }).catch((e)=>{
            res.status(500).send({
                message: e.message || "some error when retrieving data"
            });
    });
}

exports.create = (req, res) => {
    const module = new Module({
        title: req.body.title,
        timeStart: req.body.timeStart,
        timeEnd: req.body.timeEnd,
        day: req.body.day,
        batch: req.body.batch,
        semester: req.body.semester,
        acadYearStart: req.body.acadYearStart,
        acadYearEnd: req.body.acadYearEnd,
        lab: req.body.lab,
        timestamp: Date.now()
    });

    module.save(module)
        .then((result)=>{
            res.send(result);
        }).catch((e)=>{
            res.status(409).send({
                message: e.message || "some error while creating data"
            });
    })
}

exports.findOne = (req, res) => {
    const id = req.params.id;
    Module.findById(id)
        .then((result) => {
            res.send(result);
        }).catch((e)=>{
        res.status(409).send({
            message: e.message || "some error while showing data"
        });
    })
}

exports.update = (req, res) => {
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

exports.delete = (req, res) => {
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
