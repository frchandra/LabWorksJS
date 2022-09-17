const express  = require('express');
const cors = require('cors');


const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

const db = require('./models/');
db.mongoose.connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=>{
    console.log("Database connected");
}).catch((e)=>{
   console.log(`connection failed`, e);
   process.exit();
});

require("./routes/home.routes");
require("./routes/module.routes")(app);

const PORT = 8000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});