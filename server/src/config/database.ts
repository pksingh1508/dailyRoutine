import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config();

export const dbConnector = () :void => {
    if(!process.env.MONGODB_URL) {
        return;
    }
    const url = process.env.MONGODB_URL;
    mongoose.connect(url).then(() => {
        console.log("Db connection established");
    })
    .catch(() => {
        console.log("Db connection failed");
    })
}