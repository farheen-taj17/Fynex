function translate(text){

return {

original:text,

translated:
"[Translated] " + text

};

}

module.exports =
translate;

document
.getElementById(
"translateBtn"
)
.onclick =
async()=>{

const text =
document
.getElementById(
"messageInput"
)
.value;

const response =
await fetch(

"http://localhost:5000/api/ai/translate",

{

method:"POST",

headers:{
"Content-Type":
"application/json"
},

body:JSON.stringify({
text
})

}

);

const result =
await response.json();

alert(
result.translated
);

};

router.post(

"/translate",

(req,res)=>{

const translate =
require(
"../ai/translator"
);

res.json(

translate(
req.body.text
)

);

}
);

