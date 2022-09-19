const dbConf = require('../config/dbConf');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConf.url;
db.modules = require('./Module')(mongoose);

module.exports = db;