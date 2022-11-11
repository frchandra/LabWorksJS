const express  = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const connectToDB = require('./config/dbConf');
const errorHandlerMiddleware = require('./middleware/ErrorHandlerMiddleware');
const cors = require('cors');
const path = require('path');


//todo: find module by like title(done), filter module by availability(done), sort and group modules by name and batch(done), pagination(done),
/*
* Load the env variables
* */
dotenv.config({path: './config/config.env'});
const PORT = process.env.PORT || 3000;

/*
* Connect to mongo database
* */
connectToDB();


/*
* Load the routes file
* */
const HomeRoute = require("./routes/HomeRoute");
const ModuleRoute = require("./routes/ModuleRoute");
const StudentRoute = require("./routes/StudentRoute");
const AuthRoute =  require('./routes/AuthRoute');
const {home} = require("nodemon/lib/utils");

/*
* Load the express module
* */
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

/*
* Load logging middleware during dev phase
* */
if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'));
}

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

/*
* Mount the base routers to the express object
* */
app.use('/api/v1/modules', ModuleRoute);
app.use('/api/v1/students', StudentRoute);
app.use('/api/v1/auth', AuthRoute);
// app.use('/', HomeRoutes);

/*
* Load the error handler middleware
* */
app.use(errorHandlerMiddleware);

const server = app.listen(PORT, () => {
    console.log(`Server is running in ${process.env.NODE_ENV} mode on http://localhost:${PORT}`);
});

/*
* Handle unhandled promise rejection
* */
process.on('unhandledRejection', (err, promise)=>{
    console.log(`Unhandeled rejection, error : ${err.message}`);
    /*
    * then close the server and stop the app
    * */
    server.close(() => process.exit(1));
});