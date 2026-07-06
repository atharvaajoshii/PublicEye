const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    role: {
        type: String,
        enum: ["citizen", "officer", "admin"],
        default: "citizen"
    }
});

module.exports = mongoose.model("User", userSchema);