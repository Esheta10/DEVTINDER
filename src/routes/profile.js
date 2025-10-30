const express = require("express");

const router = express.Router();

router.get("/profile", userAuth, async(req,res) => {

    const cookies = req.cookies;
    console.log(cookies);
    res.send("Reading cookies");


    const {token} = cookies;
    // Validate my token
    const decodedMessage = await jwt.verify(token,"DEV@TINDER$790");
    console.log(decodedMessage);
    const {_id} = decodedMessage;
    console.log("Logged in user is: " + _id);

})


module.exports = router;