const mongoose = require("mongoose");
const validator = require("validator");
// Define the User Schema

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLength:1,
        maxLength: 50
    },
    lastName: {
        type: String,
        required: true,
        minLength:1 ,
        maxLength: 50
    },
    email: {
        type: String,
        lowercase: true,
        required: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        trim:true,
        required: true
    },
    age: {
        type: Number,
        min: 18
    },
    gender: {
        type: String,
        enum: ['Male','Female','Other'],
        validate(value){
            if(!["Male","Female","Others"].includes(value)){
                throw new Error("Not a valid gender.");
            }
        }
    },
    photoURL: {
        type: String,
        default: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.mauicardiovascularsymposium.com%2Fjohn-b-gordon-md-facc%2Fdummy-profile-pic-300x300%2F&psig=AOvVaw0q1BHF79oagWDiePx3KMX_&ust=1761739727250000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCLiDoYnuxpADFQAAAAAdAAAAABAE",
    },
    about: {
        type: String,
        default: "This is a default about section of the user.",
    },
    skills: {
        type: [String],
    },
   
},
    {
        timestamps: true,
    }
);

// Create a User model from the Schema

const User = mongoose.model("User",userSchema);
module.exports = User;


