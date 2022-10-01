const mongoose = require('mongoose');

const connectToDB = async () => {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`mongodb connected at host: ${conn.connection.host}`);
}

module.exports = connectToDB;



