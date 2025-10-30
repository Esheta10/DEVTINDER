const express = require("express");

const router = express.Router();

router.post("/signup", async (req,res) => {
 
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

router.post("/login", async (req,res) => {
    try {
        const {email,password} = req.body;

        const user = await User.findOne({email:email});
        if(!user){
            throw new Error("Invalid credential");
        }

        const isValidPassword = await bcrypt.compare(password,user.password);

        if(isValidPassword){
            // Create a JWT Token
            const token = await jwt.sign({_id: user._id},"DEV@TINDER$790",{expiresIn: "1d"});
            console.log(token);
            // Add the token to cookie and send the response back to the user
            res.cookie("token",token);

            res.send("Login successful!");
        }else{
            throw new Error("Invalid credentials");
        }
    } catch(err) {
        res.status(404).send("ERROR: " + err.message);
    }
})

module.exports = router;