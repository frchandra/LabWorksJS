const errorHandlerMiddleware = (err, req, res, next) => {
    console.log(err.stack);

    /*
    * Mongoose bad ObjedtId
    * */
    if( err.name == "CastError"){
        const mesaage = `Bootcamp not found with id of ${req.params}`;
    }

    res.status(err.statusCode || 500).json({
        success: false,
        message: err.message || "Server Error"
    });
};

module.exports = errorHandlerMiddleware;