const mongoose = require("mongoose");
require("dotenv").config();
const User = require("../models/User");


const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);

        console.log("MongoDB Connected");

        await User.create({
            name: "Atharva",
            email: "atharva@gmail.com",
            password: "123"
        });
    } catch (err) {
        console.log(err.message);
        process.exit(1);
    }
};

module.exports = connectDB;