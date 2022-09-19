const express  = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const connectToDB = require('./config/dbConf');
const cors = require('cors');

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
const {home} = require("nodemon/lib/utils");

/*
* Load the express module
* */
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));

/*
* Development logging middleware
* */
if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'));
}

/*
* Mount the routers to the express object
* */
app.use('/api/v1/modules', ModuleRoute);
// app.use('/', HomeRoutes);



// const db = require('./models/');
// db.mongoose.connect(db.url).then(()=>{
//     console.log("Database connected");
// }).catch((e)=>{
//    console.log(`connection failed`, e);
//    process.exit();
// });

// require("./routes/homeRoute");
// require("./routes/moduleRoute")(app);


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