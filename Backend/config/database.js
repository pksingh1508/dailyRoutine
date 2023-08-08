const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

exports.dbConnector = () => {
    const url = process.env.MONGODB_URL;
    mongoose.connect(url, {
        useNewUrlParser: true,
        useUniFiedTopology: true
    }).then(() => {
        console.log("Db connection established");
    })
        .catch(() => {
            console.log("Db connection failed");
        })
}