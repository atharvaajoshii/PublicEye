const mongoose = require("mongoose");
require("dotenv").config();
const User = require("../models/User");

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL);

        console.log("MongoDB Connected");

    } catch (err) {
        console.log(err.message);
        process.exit(1);
    }
};

module.exports = connectDB;