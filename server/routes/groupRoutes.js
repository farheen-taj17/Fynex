const express =
require("express");

const router =
express.Router();

const Group =
require("../models/Group");

/* Create Group */

router.post(
"/create",

async(req,res)=>{

try{

const group =
await Group.create({

name:req.body.name,

description:
req.body.description,

admin:req.body.admin,

members:[
req.body.admin
]

});

res.status(201)
.json(group);

}
catch(error){

res.status(500)
.json(error);

}

}
);

/* Get Groups */

router.get(

"/",

async(req,res)=>{

const groups =
await Group.find();

res.json(groups);

}

);

module.exports =
router;
