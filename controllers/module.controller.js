const db = require('../models');
const Module = db.modules;

exports.findAll = (req, res) => {
    Module.find()
        .then((result)=>{
            res.send(result);
        }).catch((e)=>{
            res.status(500).send({
                message: e.message || "some error when retrieving data"
            })
    });
}
