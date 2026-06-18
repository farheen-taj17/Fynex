function getSmartReplies(message){

message = message.toLowerCase();

if(message.includes("hello"))
return ["Hi 👋","Hello 😊","Hey there"];

if(message.includes("thank"))
return ["You're welcome","Anytime 😊","Glad to help"];

if(message.includes("meeting"))
return [
"Let's schedule it",
"I'll join shortly",
"Sounds good"
];

return [
"Okay 👍",
"Sounds good",
"Got it"
];

}

module.exports = getSmartReplies;

