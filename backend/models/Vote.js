const mongoose = require("mongoose");

const voteSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

    issue: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Issue"
    }
},{
    timestamps:true
});

module.exports = mongoose.model("Vote", voteSchema);