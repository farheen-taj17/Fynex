function summarize(messages){

return messages
.slice(0,3)
.join(" ");

}

module.exports =
summarize;


router.post(

"/summary",

(req,res)=>{

const summarize =
require(
"../ai/summarizer"
);

res.json({

summary:

summarize(
req.body.messages
)

});

}
);

document
.getElementById(
"summaryBtn"
)
.onclick =
async()=>{

const messages =

[
"Project started",
"Database connected",
"Chat working"
];

const response =
await fetch(

"http://localhost:5000/api/ai/summary",

{

method:"POST",

headers:{
"Content-Type":
"application/json"
},

body:JSON.stringify({
messages
})

}

);

const result =
await response.json();

alert(
result.summary
);

};

