module.exports = (app)=>{
    const modules = require("../controllers/module.controller");
    const router = require('express').Router();

    router.get('/', modules.findAll);
    router.get('/:id', modules.findOne);
    router.post('/', modules.create);
    router.put('/:id', modules.update)
    router.delete('/:id', modules.delete)


    app.use('/api/modules', router);
}