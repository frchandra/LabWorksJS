/*
* Route for redirecting user to home
* */
module.exports = (app)=>{

    const router = require('express').Router();

    router.get('/', (req, res)=>{
        res.send('Welcome');
    });
    app.use('/', router);
}

