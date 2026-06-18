const blockedWords = [

"spam",

"fake",

"scam"

];

function isSpam(message){

return blockedWords.some(

word=>

message
.toLowerCase()
.includes(word)

);

}

module.exports =
isSpam;

const isSpam =
require(
"../ai/moderation"
);

if(
isSpam(
data.message
)
){

return;

}

