let todoItemsContainerEle = document.getElementById("todoItemsContainer");
let addTodoButtonEle = document.getElementById("addTodoButton");
let saveTodoButtonEle = document.getElementById("saveTodoButton");

function getTodoListFromLocalStorage(){
    let stringifiedTodoList = localStorage.getItem("todoList");
    let parsedTodoList = JSON.parse(stringifiedTodoList);
    if(parsedTodoList === null){
        return[];

    } else{
        return parsedTodoList;
    }


}

let todoList = getTodoListFromLocalStorage();
let todosCount = todoList.length;

saveTodoButtonEle.onclick = function(){
    localStorage.setItem("todoList",JSON.stringify(todoList));
}
function onAddTodo(){
    let todouserInputEle = document.getElementById("todoUserInput");
    let userInputValue = todouserInputEle.value;

    if(userInputValue === ""){
        alert("Enter a valid text");
        return;
    }
    todosCount = todosCount+1;
    
    let newTodo = {
        text:userInputValue,
        uniqueNo:todosCount,

    };
    todoList.push(newTodo);
    createAndAppend(newTodo);
    todouserInputEle.value= "";
}
addTodoButtonEle.onclick = function(){
    onAddTodo();
}
function onDeleteTodo(todoId){
    let todoIdEle = document.getElementById(todoId);
    todoItemsContainerEle.removeChild(todoIdEle);

    let deleteEle = todoList.findIndex(function(eachTodo){
    let eachTodoId = "todo"+eachTodo.uniqueNo;
        if(eachTodoId === todoId){
            return true;
        }else{
            return false;
        }

    });
    todoList.splice(deleteEle,1);
}
function onAddTodoStatus(checkboxId,labelId){
    let checkboxEle = document.getElementById(checkboxId);
    let labelIdEle = document.getElementById(labelId);
    labelIdEle.classList.add("checked");


}
function createAndAppend(todo){
    let todoId = "todo"+todo.uniqueNo;
    let checkboxId = "checkbox"+todo.uniqueNo;
    let labelId = "label"+todo.uniqueNo;

    let todoEle = document.createElement("li");
    todoEle.id =todoId;
    todoEle.classList.add("todo-item-container","d-flex","flex-row");
    todoItemsContainerEle.appendChild(todoEle);
    
    let inputEle = document.createElement("input");
    inputEle.id= checkboxId;
    inputEle.type ="checkbox";
    inputEle.onclick = function(){
        onAddTodoStatus(checkboxId,labelId);
    }
    inputEle.classList.add("checkbox-input");
    todoEle.appendChild(inputEle);

    let labelContainerEle = document.createElement("div");
    labelContainerEle.classList.add("label-container","d-flex","flex-row");
    todoEle.appendChild(labelContainerEle);

    let labelEle = document.createElement("label");
    labelEle.id=labelId;
    labelEle.setAttribute("for",checkboxId);
    labelEle.classList.add("checkbox-label");
    labelEle.textContent = todo.text;
    labelContainerEle.appendChild(labelEle);
  
    let deleteIconContainerEle = document.createElement("div");
    deleteIconContainerEle.classList.add("delete-icon-container");
    labelContainerEle.appendChild(deleteIconContainerEle);

    let deleteIconEle = document.createElement("i");
    deleteIconEle.classList.add("far","fa-trash-alt","delete-icon");

   deleteIconEle.onclick = function(){
    onDeleteTodo(todoId)
   };
   deleteIconContainerEle.appendChild(deleteIconEle);

}
for(let todo of todoList){
    createAndAppend(todo);
}