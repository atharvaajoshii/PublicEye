const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema(
{
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
    reason: {
        type: String,
        required: true
    },
    description: {
        type: String
    }
},
{
    timestamps: true
});

module.exports = mongoose.model("Report", reportSchema);