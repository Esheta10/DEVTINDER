const express = require("express");
const connectDB = require("./config/database")
const app = express();
const User = require("./models/user"); // Adjust the path to where the User model is defined

app.use(express.json());

app.post("/signup", async (req,res) => {

    // Creating a new instance of the User model
    // const user = new User({
    //     firstName: "Divya",
    //     lastName: "Baid",
    //     email: "divya@baid.com",
    //     age: 16,
    //     gender: "Female"
    // });

    const user = new User(req.body);
    
    // Save the document to the database
    try {
        await user.save();
        res.send("User added successfully!")
    } catch(err) {
        res.status(400).send("Error saving the user: " + err.message);
    }
})

// Get User by email
app.get("/user", async (req,res) => {
    const userEmail = req.body.email;

   try{
    const users = await User.findOne({email: userEmail});

    if(users.length === 0){
        res.status(404).send("No User Found!")
    } else {
        res.send(users);
    }
   }
   catch(err){
    res.status(400).send("Something went wrong!")
   }
})

// Feed API - to get all the users from the database
app.get("/feed", async(req,res) => {
    try {
        const users = await User.find({});
        res.send(users);
    } catch(err) {
        res.status(404).send("No data found.");
    }
})

// Delete User API -  deleting a used by its _id
app.delete("/user", async(req,res) => {
    const userID = req.body._id;

    try {
        const deletedUser = await User.findByIdAndDelete(userID);
        if(!deletedUser){
            return res.status(400).send("User not found");
        }
        res.status(200).send("User deleted successfully");
    } catch(err) {
        res.status(404).send("Something went wrong while deleting user");
    }
});

// patch user API - updating the data of the user
app.patch("/user", async (req,res) => {
    const userID  = req.body._id;
    const {_id,...updateData} = req.body;   // Exclude _id from update

    try{
        const updatedUser = await User.findByIdAndUpdate(userID, updateData, {returnDocument: "after"});
        if(!updatedUser){
            res.status(404).send("User not found!");
        }
        console.log("Updated user: ",updatedUser);
        res.status(200).send("User updated successfully");
    } catch(err) {
        res.status(404).send("Something went wrong");
    }
})

connectDB()
.then(() => {
    console.log("Database connection established");
    // start the server only after db connection is successful
    app.listen(7777, () => {
    console.log("Server is successfully listening on port 7777.");
    });
})
.catch(err => {
    console.error("Database connection cannot be established");
})

