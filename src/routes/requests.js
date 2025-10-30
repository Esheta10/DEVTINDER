const express = require("express")
const requestRouter = express.Router();

const User = require("../models/user");

requestRouter.post("/sendConnectionRequest", async(req,res) => {
    const user = req.user;
    console.log("Sending a connection request!");

    res.send(user.firstName + " sent the connection request!");
});

module.exports = requestRouter;