const mongoose = require("mongoose");

const connectDB = async () => {
    await mongoose.connect("mongodb+srv://eshetajaiswal99_db_user:Esheta@cluster0.wcwdnmr.mongodb.net/");
}

connectDB().then(() => {
    console.log("Database connection established");
}).catch(err => {
    console.error("Database connection cannot be established");
})