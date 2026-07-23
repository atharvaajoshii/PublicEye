const mongoose = require("mongoose");

const issueSchema = new mongoose.Schema({
    title: String,
    description: String,

    location: String,

    latitude: Number,
    longitude: Number,

    image: String,

    category: String,

    status: {
        type: String,
        enum: [
            "Pending",
            "Assigned",
            "In Progress",
            "Resolved",
            "Rejected"
        ],
        default: "Pending"
    },

    publicVoting: {
        type: Boolean,
        default: false
    },

    votes: {
        type: Number,
        default: 0
    },
    priority: {
        type: Number,
        default: 0
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }

}, {
    timestamps: true
});

module.exports = mongoose.model("Issue", issueSchema);