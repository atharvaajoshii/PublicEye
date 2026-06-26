const mongoose = require("mongoose");

const issueTrackSchema = new mongoose.Schema({
    issue: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Issue",
        required: true
    },
    officer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    progress: {
        type: Number,
        required: true,
        min: 0,
        max: 100,
        default: 0
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("IssueTrack", issueTrackSchema);