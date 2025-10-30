const express = require("express");
const profileRouter = express.Router();

const User = require("../models/user");
const { userAuth } = require("../middlewares/auth")
const jwt = require("jsonwebtoken")

profileRouter.get("/profile", userAuth, async(req,res) => {

    const cookies = req.cookies;
    console.log(cookies);


    const {token} = cookies;
    // Validate my token
    const decodedMessage = await jwt.verify(token,"DEV@TINDER$790");
    const {_id,firstName,lastName,email,password,age,gender} = decodedMessage;

    console.log("Logged in user is: " + _id);
     const user = req.user;
    res.send(user);

})


module.exports = profileRouter;

