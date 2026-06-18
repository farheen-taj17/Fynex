const createBtn =
document.getElementById(
"createGroup"
);

createBtn.onclick =
async()=>{

const name =
document.getElementById(
"groupName"
).value;

const description =
document.getElementById(
"groupDescription"
).value;

const response =
await fetch(

"http://localhost:5000/api/groups/create",

{

method:"POST",

headers:{
"Content-Type":
"application/json"
},

body:JSON.stringify({

name,

description,

admin:
localStorage.getItem(
"username"
)

})

}

);

if(response.ok){

loadGroups();

}

};

async function loadGroups(){

const response =
await fetch(

"http://localhost:5000/api/groups"

);

const groups =
await response.json();

const list =
document.getElementById(
"groupsList"
);

list.innerHTML = "";

groups.forEach(

group=>{

list.innerHTML +=

`
<div class="group-card">

<h3>
${group.name}
</h3>

<p>
${group.description}
</p>

<p>
👑 Admin:
${group.admin}
</p>

</div>
`;

}

);

}

loadGroups();
