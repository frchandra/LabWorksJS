const mongoose = require('mongoose');

const connectToDB = async () => {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`mongodb connected at host: ${conn.connection.host}`);
}

module.exports = connectToDB;


// module.exports = {
//     url: "mongodb://admin2:admin2@localhost:27017/labworksjs"
// }

