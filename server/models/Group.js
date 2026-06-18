const mongoose = require("mongoose");

const groupSchema = new mongoose.Schema({

    name:{
        type:String,
        required:true
    },

    description:{
        type:String,
        default:""
    },

    avatar:{
        type:String,
        default:""
    },

    admin:{
        type:String,
        required:true
    },

    members:[{
        type:String
    }]

},{
    timestamps:true
});

module.exports =
mongoose.model(
    "Group",
    groupSchema
);

socket.on(

"group-notification",

(message)=>{

alert(message);

}
);

