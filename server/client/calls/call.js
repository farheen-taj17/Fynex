const socket =
io(
"http://localhost:5000"
);

let localStream;

let peerConnection;

const configuration = {

iceServers:[
{
urls:
"stun:stun.l.google.com:19302"
}
]

};

const localVideo =
document.getElementById(
"localVideo"
);

const remoteVideo =
document.getElementById(
"remoteVideo"
);

async function startMedia(){

localStream =

await navigator
.mediaDevices
.getUserMedia({

video:true,
audio:true

});

localVideo.srcObject =
localStream;

}

startMedia();

function createPeer(){

peerConnection =
new RTCPeerConnection(
configuration
);

localStream
.getTracks()
.forEach(

track=>{

peerConnection
.addTrack(
track,
localStream
);

}

);

peerConnection.ontrack =
(event)=>{

remoteVideo.srcObject =
event.streams[0];

};

}

document
.getElementById(
"startCall"
)
.onclick =
async()=>{

createPeer();

const offer =

await peerConnection
.createOffer();

await peerConnection
.setLocalDescription(
offer
);

socket.emit(

"call-user",

{

offer

}

);

};

socket.on(

"incoming-call",

async(data)=>{

createPeer();

await peerConnection
.setRemoteDescription(
data.offer
);

const answer =

await peerConnection
.createAnswer();

await peerConnection
.setLocalDescription(
answer
);

socket.emit(

"answer-call",

{

answer

}

);

}
);

socket.on(

"call-answered",

async(data)=>{

await peerConnection
.setRemoteDescription(
data.answer
);

}
);

peerConnection
.onicecandidate =
(event)=>{

if(
event.candidate
){

socket.emit(

"ice-candidate",

{

candidate:
event.candidate

}

);

}

};

socket.on(

"ice-candidate",

async(data)=>{

await peerConnection
.addIceCandidate(

new RTCIceCandidate(
data.candidate
)

);

}
);


document
.getElementById(
"toggleMic"
)
.onclick =
()=>{

localStream
.getAudioTracks()
.forEach(

track=>{

track.enabled =
!track.enabled;

}

);

};

document
.getElementById(
"toggleCamera"
)
.onclick =
()=>{

localStream
.getVideoTracks()
.forEach(

track=>{

track.enabled =
!track.enabled;

}

);

};

document
.getElementById(
"shareScreen"
)
.onclick =
async()=>{

const screenStream =

await navigator
.mediaDevices
.getDisplayMedia({

video:true

});

const screenTrack =
screenStream
.getVideoTracks()[0];

const sender =

peerConnection
.getSenders()
.find(

sender=>

sender.track.kind
=== "video"

);

sender.replaceTrack(
screenTrack
);

};

document
.getElementById(
"endCall"
)
.onclick =
()=>{

peerConnection.close();

socket.emit(
"end-call",
{}
);

};

socket.on(

"call-ended",

()=>{

alert(
"Call Ended"
);

remoteVideo.srcObject =
null;

}
);

