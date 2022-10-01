const ErrorResponse = require('../utils/ErrorResponse');

const errorHandlerMiddleware = (err, req, res, next) => {
    let error = { ...err}
    error.message = err.message;

    console.log(err.stack);

    /*
    * Mongoose bad ObjedtId
    * */
    if( err.name == "CastError"){
        const message = `Modules not found with id of ${err.value}`;
        error = new ErrorResponse(message, 404)
    }
    /*
    * Mongoose duplicate keys
    * */
    if(err.code == 11000){
        const message = "Detecting duplication record value was inserted";
        error = new ErrorResponse(message, 400);
    }
    /*
    * Mongoose validation error
    * */
    if(err.name == "ValidationError"){
        const message = Object.values(err.errors).map(val => val.message);
        error = new ErrorResponse(message, 400);
    }

    res.status(error.statusCode || 500).json({
        success: false,
        message: error.message || "Server Error"
    });
};

module.exports = errorHandlerMiddleware;