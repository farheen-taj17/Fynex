require("dotenv").config();

const express =
require("express");

const cors =
require("cors");

const connectDB =
require("./config/db");

const authRoutes =
require("./routes/authRoutes");

const app =
express();

/* Connect Database */

connectDB();

/* Middleware */

app.use(cors());

app.use(express.json());

/* Routes */

app.use(
"/api/auth",
authRoutes
);

/* Home Route */

app.get(
"/",
(req,res)=>{

res.send(
"🚀 Fynex Server Running"
);

}
);

const PORT =
process.env.PORT ||
5000;

app.listen(

PORT,

()=>{

console.log(

`Server Running on Port ${PORT}`

);

}
);
const http =
require("http");

const { Server } =
require("socket.io");

const server =
http.createServer(app);

const io =
new Server(server,{

    cors:{
        origin:"*"
    }

});

require(
"./socket/socketHandler"
)(io);

server.listen(

PORT,

()=>{

console.log(

`Server Running
on ${PORT}`

);

});

const messageRoutes =
require("./routes/messageRoutes");

app.use(
"/api/messages",
messageRoutes
);

const groupRoutes =
require("./routes/groupRoutes");

app.use(
"/api/groups",
groupRoutes
);

const fileRoutes =
require("./routes/fileRoutes");

app.use(
"/api/files",
fileRoutes
);

app.use(
"/uploads",
express.static("uploads")
);

const audioElement =
new Audio(

`http://localhost:5000/${audio.filePath}`

);

audioElement.onloadedmetadata =
()=>{

console.log(

audioElement.duration

);

};

div.innerHTML =

`
🎤 Voice Note

<br>

<audio controls>

<source
src="http://localhost:5000/${audio.filePath}">

</audio>

<br>

<a

href="http://localhost:5000/${audio.filePath}"

download>

⬇ Download

</a>

`;

const aiRoutes =
require("./routes/aiRoutes");

app.use(
"/api/ai",
aiRoutes
);

