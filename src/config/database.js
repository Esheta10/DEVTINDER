const mongoose = require("mongoose");

const connectDB = async () => {
    await mongoose.connect("mongodb+srv://eshetajaiswal99_db_user:Esheta@cluster0.wcwdnmr.mongodb.net/devTinder");
}

module.exports = connectDB;

