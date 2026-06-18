const express = require("express");
const router = express.Router();

const Message =
require("../models/Message");

/* Get Chat History */

router.get(

"/:sender/:receiver",

async(req,res)=>{

try{

const messages =
await Message.find({

$or:[

{
sender:req.params.sender,
receiver:req.params.receiver
},

{
sender:req.params.receiver,
receiver:req.params.sender
}

]

}).sort({
createdAt:1
});

res.json(messages);

}
catch(error){

res.status(500).json(error);

}

}

);

module.exports = router;
