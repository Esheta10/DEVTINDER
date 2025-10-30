const express = require("express");
const connectDB = require("./config/database")
const app = express();
const User = require("./models/user"); // Adjust the path to where the User model is defined
const {validateSignUpData} = require("./utils/validation")
const bcrypt = require("bcrypt")
const cookieParser = require("cookie-parser")
const jwt = require("jsonwebtoken")
const { userAuth } = require("./middlewares/auth")

app.use(express.json());
app.use(cookieParser());


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

