const express = require("express");
const connectDB = require("./config/database")
const app = express();
const User = require("./models/user"); // Adjust the path to where the User model is defined
const {validateSignUpData} = require("./utils/validation")
const bcrypt = require("bcrypt")

app.use(express.json());

app.post("/signup", async (req,res) => {
 
    try {
        // Validation of data

        validateSignUpData(req);
        const {firstName,lastName,email,password,age,gender} = req.body;
        
       // Encrypt the password
       // const {password} = req.body;
        const passwordHash = await bcrypt.hash(password,10);
        console.log(passwordHash);

        const user = new User({
        firstName,
        lastName,
        email,
        password: passwordHash,
        age,
        gender,
    });

        await user.save();
        res.send("User added successfully!")
    } catch(err) {
        res.status(400).send("Error saving the user: " + err.message);
    }
})

app.post("/login", async (req,res) => {
    try {
        const {email,password} = req.body;

        const user = await User.findOne({email:email});
        if(!user){
            throw new Error("Invalid credential");
        }

        const isValidPassword = await bcrypt.compare(password,user.password);

        if(isValidPassword){
            res.send("Login successful!");
        }else{
            throw new Error("Invalid credentials");
        }
    } catch(err) {
        res.status(404).send("ERROR: " + err.message);
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

