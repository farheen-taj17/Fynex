function sentiment(text){

if(
text.includes("happy")
)

return "Positive 😊";

if(
text.includes("sad")
)

return "Negative 😔";

return "Neutral 😐";

}

module.exports =
sentiment;

