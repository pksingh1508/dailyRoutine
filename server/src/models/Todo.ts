import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
    day: String,
    todo: String, 
    userId: String
});

export default mongoose.model("Todo", todoSchema);