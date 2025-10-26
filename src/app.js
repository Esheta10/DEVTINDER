const express = require("express");
const app = express();

app.use("/user",
   [
     (req,res,next) => 
    {
        console.log("Middleware 1 ran");
        //res.send("Response-1");
        next();
    },
    (req,res,next) => 
    {
        console.log("Middleware 2 ran");
        //res.send("Response-2");
        next();
    },
    (req,res,next) => 
    {
        console.log("Middleware 3 ran");
        //res.send("Response-3");
        next();
    },
    (req,res,next) => 
    {
        console.log("Middleware 4 ran");
        //res.send("Response-4");
        next();
    },
    (req,res,next) => 
    {
        console.log("Middleware 5 ran");
        res.send("Response-5");
    }
   ]
)

app.listen(7777, () => {
    console.log("Server is successfully listening on port 7777.");
});

