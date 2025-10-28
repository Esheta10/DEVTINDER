const mongoose = require("mongoose");

// Define the User Schema

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    age: {
        type: Number,
        min: 0
    },
    gender: {
        type: String,
        enum: ['Male','Female','Other']
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


