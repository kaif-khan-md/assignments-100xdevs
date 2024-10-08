let currentIndex = 1;
function addTodo(){
    const InputElement = document.getElementById("todo-input");
    const todo_name = InputElement.value.trim();
    
    if(todo_name === ""){
        alert("please enter a todo");
        return;
    }
  
    const parentElement = document.getElementById("todo-list");
  
    const new_todo = document.createElement('div');
    new_todo.setAttribute("id",'todo-' + currentIndex,);
    new_todo.setAttribute("style",'display: flex;justify-content: space-between');
  
    const new_heading = document.createElement('ul');
    new_heading.textContent = todo_name;
  
    const newButton = document.createElement('button');
    newButton.textContent = 'Delete';
    newButton.setAttribute("id",'delete-btn');
    newButton.setAttribute("onclick", "deleteTodo(" + currentIndex + ")"  );
    

    new_todo.appendChild(new_heading);
    new_todo.appendChild(newButton);
  
  
    parentElement.appendChild(new_todo);
  
    currentIndex++;
  
    InputElement.value = '';
  
  }

function deleteTodo(index) {
    const element = document.getElementById("todo-" + index);
    if(element){
        element.parentNode.removeChild(element);
    }
    currentIndex--;
  }
      
