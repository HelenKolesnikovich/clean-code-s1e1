//Document is the DOM can be accessed in the console with document.window.
// Tree is from the top, html, body, p etc.

//Problem: User interaction does not provide the correct results.
//Solution: Add interactivity so the user can manage daily tasks.
//Break things down into smaller steps and take each step at a time.


// Event handling, user interaction is what starts the code execution.

const taskInput = document.getElementById('new-task');//Add a new task.
const addButton = document.getElementById('add-button');//first button
const incompleteTaskHolder = document.getElementById('incompleteTasks');//ul of #incompleteTasks
const completedTasksHolder = document.getElementById('completed-tasks');//completed-tasks


//New task list item
let createNewTaskElement = function(taskString) {
  let wrapperTaskElement = document.createElement('div');
  wrapperTaskElement.classList.add = 'form__line';
  wrapperTaskElement.classList.add = 'form__line_separated';

  let checkBox = document.createElement('input');  
  checkBox.type = 'checkbox';
  checkBox.classList.add = 'form__checkbox';

  let taskName = document.createElement('input');
  taskName.type = 'text';
  taskName.classList.add = 'form__input';
  taskName.value = taskString;
  //taskName.disabled = 'true';

  let editButton = document.createElement('input');
  editButton.type = 'button';
  editButton.classList.add = 'form__button';
  editButton.value = 'edit';

  let deleteButton = document.createElement('input');
  deleteButton.type = 'image';
  deleteButton.alt = 'button to delete';
  deleteButton.src = './remove.svg';
  deleteButton.classList.add = 'form__image-button';

  wrapperTaskElement.appendChild(checkBox);
  wrapperTaskElement.appendChild(taskName);
  wrapperTaskElement.appendChild(editButton);
  wrapperTaskElement.appendChild(deleteButton);
  
  return wrapperTaskElement;
}



var addTask=function() {           /* add new task for Todo*/
  console.log("Add Task...");
  //Create a new list item with the text from the #new-task:
  if (!taskInput.value) return;
  var listItem = createNewTaskElement(taskInput.value);

  //Append listItem to incompleteTaskHolder
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);

  taskInput.value = '';
}

//Edit an existing task.

var editTask=function() {
  console.log("Edit Task...");
  console.log("Change 'edit' to 'save'");


  var listItem = this.parentNode;

  var editInput = listItem.querySelector('input[type=text]');
  var label = listItem.querySelector("label");
  var editBtn = listItem.querySelector(".edit");
  var containsClass = listItem.classList.contains("editMode");
  //If class of the parent is .editmode
  if(containsClass) {

      //switch to .editmode
      //label becomes the inputs value.
      label.innerText=editInput.value;
      editBtn.innerText="Edit";
  }
  else {
      editInput.value=label.innerText;
      editBtn.innerText="Save";
  }

  //toggle .editmode on the parent.
  listItem.classList.toggle("editMode");
};


//Delete task.
var deleteTask=function() {
    console.log("Delete Task...");

    var listItem=this.parentNode;
    var ul=listItem.parentNode;
    //Remove the parent list item from the ul.
    ul.removeChild(listItem);

}


//Mark task completed
var taskCompleted = function() {
    console.log("Complete Task...");

    //Append the task list item to the #completed-tasks
    var listItem = this.parentNode;
    completedTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskIncomplete);

}


var taskIncomplete = function() {
  console.log("Incomplete Task...");
  //Mark task as incomplete.
  //When the checkbox is unchecked
  //Append the task list item to the #incompleteTasks.
  var listItem = this.parentNode;
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem,taskCompleted);
}



var ajaxRequest = function() {
  console.log('AJAX Request');
}

//The glue to hold it all together.


//Set the click handler to the addTask function.
addButton.onclick = addTask;
addButton.addEventListener("click",addTask);
addButton.addEventListener("click",ajaxRequest);


var bindTaskEvents = function(taskListItem, checkBoxEventHandler) {
  console.log("bind list item events");
  //select ListItems children
  var checkBox = taskListItem.querySelector('.form__checkbox');
  var editButton = taskListItem.querySelector('.form__button');
  var deleteButton = taskListItem.querySelector('.form__image-button');


  //Bind editTask to edit button.
  editButton.addEventListener('click', editTask);
  //Bind deleteTask to delete button.
  deleteButton.addEventListener('click', deleteTask);
  //Bind taskCompleted to checkBoxEventHandler.
  checkBox.onchange = checkBoxEventHandler;
}

//cycle over incompleteTaskHolder ul list items
//for each list item
for (let i = 0; i < incompleteTaskHolder.children.length; i++) {
  //bind events to list items chldren(tasksCompleted)
  bindTaskEvents(incompleteTaskHolder.children[i],taskCompleted);
}




//cycle over completedTasksHolder ul list items
for (let i = 0; i < completedTasksHolder.children.length; i++) {
  //bind events to list items chldren(tasksIncompleted)
  bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}




// Issues with usability don't get seen until they are in front of a human tester.

//prevent creation of empty tasks.

//Change edit to save when you are in edit mode.