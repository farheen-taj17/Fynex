/* Check Login */

const token =
localStorage.getItem("token");

if(!token){

window.location.href =
"../auth/login.html";

}

/* Demo Statistics */

document.getElementById(
"usersCount"
).innerText = "150";

document.getElementById(
"groupsCount"
).innerText = "20";

document.getElementById(
"messagesCount"
).innerText = "5,420";

/* Online Users */

document.getElementById(
"onlineUsers"
).innerHTML =

`
🟢 Farheen <br>
🟢 Alex <br>
🟢 Sophia <br>
🟢 John
`;

/* Activity */

document.getElementById(
"activity"
).innerHTML =

`
📢 New group created<br>
📢 User joined chat<br>
📢 New message received
`;

/* Navigation */

function openChat(){

window.location.href =
"../chat/chat.html";

}

function openGroups(){

window.location.href =
"../groups/groups.html";

}

/* Logout */

document
.getElementById(
"logoutBtn"
)
.addEventListener(

"click",

()=>{

localStorage.clear();

window.location.href =
"../auth/login.html";

});
