// Declare variables
let draggedTask = null;
let currentColumn = null;


 
// Open a Modal
function openModal(colId){
    currentColumn = colId;
    document.getElementById('taskModal').style.display = "block";
}


//Close Modal
function closeModal(){
      document.getElementById('taskModal').style.display = "none";
     document.getElementById('taskTitle').value = "";
     document.getElementById('taskDesc').value = "";
     document.getElementById('taskPriority').value = "";
}

//Submit task
function submitTask(){
  
    const title = document.getElementById("taskTitle").value;
    const description = document.getElementById("taskDesc").value;
    const priority = document.getElementById("taskPriority").value;

        if(!title) alert('Please Enter a Title!!');

    const now = new Date();
    const timestamp = now.toLocaleString();

    const task = document.createElement('div');
    task.classList.add('task');
    task.setAttribute('draggable','true');

    task.innerHTML = `
    <h3>${title}</h3>
    <p>${description}</p>
    <span class = "priority ${priority}">${priority}</span>
    <p>📅 ${now.toDateString()}</p>
    <p>⏱ ${timestamp}</p>
    `
    task.addEventListener('dragstart',dragStart);
    task.addEventListener('dragend',dragEnd);

    document.querySelector(`#${currentColumn} .tasks`).appendChild(task);
    closeModal();
}


//Drag Start
function dragStart(e){
    draggedTask = e.target;
    setTimeout(()=> e.target.style.display = "none",0);
}

//Drag End
function dragEnd(e){
    draggedTask.style.display = "block";
    draggedTask = null;
}

//Allows Drop

function allowDrop(e){
    e.preventDefault();
    e.currentTarget.classList.add('drag-over');
}

function drop(e,colId){
    e.preventDefault();
    e.currentTarget.classList.remove('drag-over');
    if(draggedTask){
        e.currentTarget.appendChild(draggedTask);
    }
}

document.querySelectorAll(".tasks").forEach((taskEl) => {
    taskEl.addEventListener("dragleave", (E)=>{
        E.currentTarget.classList.remove('drag-over');
    });
}); 

window.onclick = ((event)=>{
    if(event.target == document.getElementById('taskModal')){
        closeModal();
    }
})