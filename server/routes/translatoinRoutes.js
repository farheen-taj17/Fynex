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
