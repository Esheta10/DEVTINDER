const express = require("express")

const router = express.Router();

module.exports = router;

router.post("/sendConnectionRequest", async(req,res) => {
    const user = req.user;
    console.log("Sending a connection request!");

    res.send(user.firstName + " sent the connection request!");
});

module.exports = router;