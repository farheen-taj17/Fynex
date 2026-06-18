const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema({

    sender:{
        type:String,
        required:true
    },

    fileName:{
        type:String,
        required:true
    },

    filePath:{
        type:String,
        required:true
    },

    fileType:{
        type:String,
        required:true
    },

    fileSize:{
        type:Number,
        default:0
    }

},{
    timestamps:true
});

module.exports =
mongoose.model(
    "File",
    fileSchema
);
