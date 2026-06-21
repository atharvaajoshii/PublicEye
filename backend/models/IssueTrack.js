const mongoose = require("mongoose");

const issueTrackSchema = new mongoose.Schema({
    issue: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Issue",
        required: true
    },
    officer: {
        type: String,
        required: true
    },
    progress: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("IssueTrack", issueTrackSchema);