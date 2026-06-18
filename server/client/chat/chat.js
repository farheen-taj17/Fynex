const socket =
io(
"http://localhost:5000"
);

const username =
localStorage.getItem(
"username"
);

socket.emit(
"user-online",
username
);

let currentReceiver =
"Alex";

/* Send Message */

document
.getElementById(
"sendBtn"
)
.onclick = ()=>{

const input =
document.getElementById(
"messageInput"
);

const message =
input.value;

socket.emit(

"send-message",

{

sender:
username,

receiver:
currentReceiver,

message

}

);

addMessage(

`You:
${message}`

);

input.value="";

};

/* Receive */

socket.on(

"receive-message",

(data)=>{

addMessage(

`${data.sender}:
${data.message}`

);

}
);

/* Typing */

document
.getElementById(
"messageInput"
)
.addEventListener(

"input",

()=>{

socket.emit(

"typing",

{

sender:
username,

receiver:
currentReceiver

}

);

}
);

socket.on(

"user-typing",

(user)=>{

document
.getElementById(
"typing"
)
.innerText =

`${user}
is typing...`;

setTimeout(()=>{

document
.getElementById(
"typing"
)
.innerText="";

},2000);

}
);

/* Online Users */

socket.on(

"online-users",

(users)=>{

document
.getElementById(
"usersList"
)
.innerHTML =

users.map(

user=>

`<div>

🟢 ${user}

</div>`

).join("");

});

/* Message Display */

function addMessage(
message
){

const div =
document.createElement(
"div"
);

div.innerText =
message;

document
.getElementById(
"messages"
)
.appendChild(div);

}

document
.getElementById(
"searchInput"
)
.addEventListener(

"input",

()=>{

const searchText =

document
.getElementById(
"searchInput"
)
.value
.toLowerCase();

const messages =

document
.querySelectorAll(
"#messages div"
);

messages.forEach(

message=>{

message.style.display =

message.innerText
.toLowerCase()
.includes(
searchText
)

? "block"
: "none";

}

);

}
);
async function loadMessages(){

const response =
await fetch(

`http://localhost:5000/api/messages/${username}/${currentReceiver}`

);

const messages =
await response.json();

document
.getElementById(
"messages"
)
.innerHTML = "";

messages.forEach(

message=>{

addMessage(

`${message.sender}:
${message.message}`

);

}

);

}

loadMessages();

document
.getElementById(
"emojiPicker"
)
.addEventListener(

"change",

(event)=>{

document
.getElementById(
"messageInput"
)
.value +=
event.target.value;

}
);

socket.on(

"message-seen",

()=>{

const status =
document.createElement(
"div"
);

status.innerText =
"✓✓ Seen";

document
.getElementById(
"messages"
)
.appendChild(
status
);

}
);

const uploadBtn =
document.getElementById(
"uploadBtn"
);

const fileInput =
document.getElementById(
"fileInput"
);

uploadBtn.onclick =
()=>{

fileInput.click();

};

fileInput.onchange =
async()=>{

const file =
fileInput.files[0];

const formData =
new FormData();

formData.append(
"file",
file
);

formData.append(
"sender",
username
);

const response =
await fetch(

"http://localhost:5000/api/files/upload",

{

method:"POST",

body:formData

}

);

const uploaded =
await response.json();

socket.emit(
"file-message",
uploaded
);

};

socket.on(

"receive-file",

(file)=>{

const div =
document.createElement(
"div"
);

if(
file.fileType
.includes("image")
){

div.innerHTML =

`
<img
src="http://localhost:5000/${file.filePath}"
width="250">

<br>

${file.fileName}
`;

}
else{

div.innerHTML =

`
📎

<a
target="_blank"
href="http://localhost:5000/${file.filePath}">

${file.fileName}

</a>
`;

}

document
.getElementById(
"messages"
)
.appendChild(
div
);

}
);

let mediaRecorder;

let audioChunks = [];

const recordBtn =
document.getElementById(
"recordBtn"
);

recordBtn.addEventListener(

"click",

async()=>{

if(

!mediaRecorder ||

mediaRecorder.state === "inactive"

){

const stream =

await navigator
.mediaDevices
.getUserMedia({

audio:true

});

mediaRecorder =

new MediaRecorder(
stream
);

audioChunks = [];

mediaRecorder.start();

recordBtn.classList.add(
"recording"
);

mediaRecorder.ondataavailable =
(event)=>{

audioChunks.push(
event.data
);

};

mediaRecorder.onstop =
uploadVoice;

}else{

mediaRecorder.stop();

recordBtn.classList.remove(
"recording"
);

}

}
);

async function uploadVoice(){

const audioBlob =

new Blob(

audioChunks,

{
type:"audio/webm"
}

);

const formData =
new FormData();

formData.append(

"file",

audioBlob,

"voice-note.webm"

);

formData.append(
"sender",
username
);

const response =
await fetch(

"http://localhost:5000/api/files/upload",

{

method:"POST",

body:formData

}

);

const uploaded =
await response.json();

socket.emit(

"voice-message",

uploaded

);

}

socket.on(

"receive-voice",

(audio)=>{

const div =
document.createElement(
"div"
);

div.innerHTML =

`
🎤 Voice Note

<br><br>

<audio controls>

<source

src="http://localhost:5000/${audio.filePath}"

type="audio/webm">

</audio>

`;

document
.getElementById(
"messages"
)
.appendChild(
div
);

}
);

socket.on(

"voice-alert",

(sender)=>{

console.log(

`${sender}
sent a voice note`

);

}
);

async function loadReplies(message){

const response =
await fetch(

"http://localhost:5000/api/ai/replies",

{

method:"POST",

headers:{
"Content-Type":
"application/json"
},

body:JSON.stringify({
message
})

}

);

const replies =
await response.json();

const container =
document.getElementById(
"smartReplies"
);

container.innerHTML="";

replies.forEach(

reply=>{

const chip =
document.createElement(
"div"
);

chip.classList.add(
"reply-chip"
);

chip.innerText =
reply;

chip.onclick =
()=>{

document
.getElementById(
"messageInput"
)
.value = reply;

};

container.appendChild(
chip
);

}

);

}

