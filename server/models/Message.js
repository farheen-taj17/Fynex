const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({

    sender: {
        type: String,
        required: true
    },

    receiver: {
        type: String,
        required: true
    },

    message: {
        type: String,
        required: true
    },

    isRead: {
        type: Boolean,
        default: false
    }

},{
    timestamps:true
});

module.exports =
mongoose.model(
    "Message",
    messageSchema
);

const mongoose =
require("mongoose");

const messageSchema =
new mongoose.Schema({

sender:{
type:String,
required:true
},

receiver:{
type:String,
required:true
},

message:{
type:String,
required:true
},

isRead:{
type:Boolean,
default:false
},

reaction:{
type:String,
default:""
}

},{
timestamps:true
});

module.exports =
mongoose.model(
"Message",
messageSchema
);

function addMessage(

text,

type="received"

){

const div =
document.createElement(
"div"
);

div.classList.add(
"message"
);

div.classList.add(
type
);

div.innerText =
text;

document
.getElementById(
"messages"
)
.appendChild(
div
);

}

addMessage(
`You: ${message}`,
"sent"
);


const messagesArea =
document.getElementById(
"messages"
);

messagesArea.addEventListener(

"dragover",

(event)=>{

event.preventDefault();

}
);

messagesArea.addEventListener(

"drop",

(event)=>{

event.preventDefault();

const file =
event.dataTransfer.files[0];

fileInput.files =
event.dataTransfer.files;

fileInput.dispatchEvent(
new Event("change")
);

}
);


loadReplies(
data.message
);