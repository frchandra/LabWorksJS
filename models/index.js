const dbConf = require('../config/database.conf');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConf.url;
db.modules = require('./module.model')(mongoose);

module.exports = db;