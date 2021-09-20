require('dotenv').config()

const mongoose = require('mongoose');
const url = process.env.MONGO_URL;

mongoose.connect(url,
    { useNewUrlParser: true, useUnifiedTopology: true }, 
    err => {
        console.log("MongoDB Connection --> Ready state is:", mongoose.connection.readyState);
});