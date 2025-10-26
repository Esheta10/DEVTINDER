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

app.get("/example",
    (req,res,next) => {
    console.log("First Handler");
    next();
    },
    (req,res) => {
        res.send("Second Handler");
    }
)

app.get('/skip', (req,res,next) => {
    console.log("This handler will be skipped");
    next('route');  // Skips to the next matching route handler
},
    (req,res) => {
        res.send("You will not see this response because this handler is skipped");
    }
);

app.get("/skip", (req,res) => {
    res.send("Skipped to this route handler");
})


// Example of Middleware flow
// Middleware 1: Request Logger
app.use((req,res,next) => {
    console.log(`${req.method} ${req.url}`);
    next(); // Pass the control to next middleware
});

// Middleware 2: Authorization Check
// Handle user authentcation for all admin routes using middlewares
app.use("/admin",(req,res,next) => {
    const token ="999";
    const isAuthorizedAdmin = token === "999";
    if(!isAuthorizedAdmin){
        res.status(401).send("Unauthorized Admin");
    }else {
        next();
    }
})
app.get("/admin/getAllData", (req,res) => {
    res.send("All data generated")
})
app.get("/admin/deleteData", (req,res) => {
    res.send("Data deleted");
})
app.listen(7777, () => {
    console.log("Server is successfully listening on port 7777.");
});

