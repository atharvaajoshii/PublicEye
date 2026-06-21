const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: String,
    location: String,
    role: {
        type: String,
        default: "citizen"
    },
    phoneNumber: String,
    profilePhoto: String,
    email: {
        type: String,
        unique: true
    },
    password: String
},{
    timestamps:true
});

module.exports = mongoose.model("User", userSchema);