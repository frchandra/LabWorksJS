module.exports = (app)=>{
    const modules = require("../controllers/module.controller");
    const router = require('express').Router();

    router.get('/', modules.findAll);
    app.use('/api/modules', router);
}