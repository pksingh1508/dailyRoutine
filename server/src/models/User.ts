import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        required: true
    },
    token: {
        type: String,
        default: null
    }
});

export default mongoose.model('User', userSchema);