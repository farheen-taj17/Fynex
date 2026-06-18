async function loadFiles(){

const response =
await fetch(
"http://localhost:5000/api/files"
);

const files =
await response.json();

const gallery =
document.getElementById(
"gallery"
);

gallery.innerHTML = "";

files.forEach(

file=>{

gallery.innerHTML +=

`
<div>

<a
target="_blank"
href="http://localhost:5000/${file.filePath}">

${file.fileName}

</a>

</div>
`;

}

);

}

loadFiles();

