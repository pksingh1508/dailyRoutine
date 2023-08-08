// import mongoose from "mongoose";
const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
    day: String,
    todo: String,
    userId: String
});

module.exports = mongoose.model("Todo", todoSchema);