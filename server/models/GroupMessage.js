const mongoose =
require("mongoose");

const groupMessageSchema =
new mongoose.Schema({

    groupId:{
        type:String,
        required:true
    },

    sender:{
        type:String,
        required:true
    },

    message:{
        type:String,
        required:true
    }

},{
    timestamps:true
});

module.exports =
mongoose.model(
    "GroupMessage",
    groupMessageSchema
);

socket.on(

"group-message",

async(data)=>{

io.to(
data.groupId
).emit(

"receive-group-message",

data

);

}
);

