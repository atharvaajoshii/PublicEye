const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({

    message:String,

    isRead:{
        type:Boolean,
        default:false
    },

    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }

},{
    timestamps:true
});

module.exports = mongoose.model("Notification",notificationSchema);