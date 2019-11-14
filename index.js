if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}

const express = require('express');
const app = express();

//Connecting to mongo db
const mongoose = require('mongoose');
mongoose.connect(process.env.DATABASE_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true
});
const db = mongoose.connection;
db.on("error", error => console.error(error));
db.once("open", () => console.log("Connected to Mongoose"));

//middleware 
app.use(express.json()); 

//import routes
const authRoute = require('./routes/auth');

//Route Middleware
app.use('/api/users',authRoute);

app.listen(3000, ()=> console.log('running server'));