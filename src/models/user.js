const mongoose = require("mongoose");

// Define the User Schema

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    age: {
        type: Number,
        min: 0
    },
    gender: {
        type: String,
        enum: ['Male','Female','Other']
    }
});

// Create a User model from the Schema

const User = mongoose.model("User",userSchema);
module.exports = User;


