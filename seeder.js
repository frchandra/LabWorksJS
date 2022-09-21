const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load env vars
dotenv.config({ path: './config/config.env' });

// Load models
const Module = require('./models/Module');

// Connect to DB
mongoose.connect(process.env.MONGO_URI);

// Read JSON files
const modules = JSON.parse(
    fs.readFileSync(`${__dirname}/.dummydata/Modules.json`, 'utf-8')
);

// Import into DB
const importData = async () => {
    try {
        await Module.create(modules);
        console.log('Data Imported...');
        process.exit();
    } catch (err) {
        console.error(err);
    }
};

// Delete data
const deleteData = async () => {
    try {
        await Module.deleteMany();
        console.log('Data Destroyed...');
        process.exit();
    } catch (err) {
        console.error(err);
    }
};

if (process.argv[2] === '-i') {
    importData();
} else if (process.argv[2] === '-d') {
    deleteData();
}
