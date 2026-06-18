const express = require("express");

const router = express.Router();

const getSmartReplies =
require("../ai/smartReplies");

router.post(

"/replies",

(req,res)=>{

const replies =
getSmartReplies(
req.body.message
);

res.json(replies);

}

);

module.exports = router;

