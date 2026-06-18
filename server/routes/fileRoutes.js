const express = require("express");
const multer = require("multer");

const router = express.Router();

const File =
require("../models/File");

/* Storage Configuration */

const storage =
multer.diskStorage({

destination:(req,file,cb)=>{

cb(
null,
"uploads"
);

},

filename:(req,file,cb)=>{

cb(
null,
Date.now() +
"-" +
file.originalname
);

}

});

const upload =
multer({
storage
});

/* Upload */

router.post(

"/upload",

upload.single(
"file"
),

async(req,res)=>{

try{

const savedFile =
await File.create({

sender:
req.body.sender,

fileName:
req.file.originalname,

filePath:
req.file.path,

fileType:
req.file.mimetype,

fileSize:
req.file.size

});

res.status(201)
.json(savedFile);

}
catch(error){

res.status(500)
.json(error);

}

}

);

/* Get Files */

router.get(

"/",

async(req,res)=>{

const files =
await File.find()
.sort({
createdAt:-1
});

res.json(files);

}

);

module.exports =
router;
