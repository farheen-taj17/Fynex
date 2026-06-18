/* ===============================
   LOGIN
================================ */

const loginForm =
document.getElementById(
    "loginForm"
);

if(loginForm){

loginForm.addEventListener(

"submit",

async(event)=>{

event.preventDefault();

const email =
document.getElementById(
"email"
).value;

const password =
document.getElementById(
"password"
).value;

const response =
await fetch(

"http://localhost:5000/api/auth/login",

{

method:"POST",

headers:{
"Content-Type":
"application/json"
},

body:JSON.stringify({

email,
password

})

}

);

const data =
await response.json();

if(data.token){

localStorage.setItem(
"token",
data.token
);

localStorage.setItem(
"username",
data.username
);

window.location.href =
"../dashboard/dashboard.html";

}else{

alert(
"Login Failed"
);

}

});

}

/* ===============================
   REGISTER
================================ */

const registerForm =
document.getElementById(
"registerForm"
);

if(registerForm){

registerForm.addEventListener(

"submit",

async(event)=>{

event.preventDefault();

const username =
document.getElementById(
"username"
).value;

const email =
document.getElementById(
"registerEmail"
).value;

const password =
document.getElementById(
"registerPassword"
).value;

const response =
await fetch(

"http://localhost:5000/api/auth/register",

{

method:"POST",

headers:{
"Content-Type":
"application/json"
},

body:JSON.stringify({

username,
email,
password

})

}

);

if(response.ok){

alert(
"Registration Successful"
);

window.location.href =
"login.html";

}

});

}
