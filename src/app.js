const express = require("express");
const connectDB = require("./config/database")
const app = express();


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

