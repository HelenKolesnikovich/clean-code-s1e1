//Some variables for key elements from the DOM-tree
let addButton = document.querySelector('#add-button');
let editButtonsCollection = document.querySelectorAll('.form__button-edit');
let deleteButtonsCollection = document.querySelectorAll('.form__image-button');
let checkboxesCollection = document.querySelectorAll('.form__checkbox');


//Create new element for created task
let createNewTaskElement = function(taskString) {
  let wrapperTaskElement = document.createElement('div');
  wrapperTaskElement.classList.add('form__line', 'form__line_separated');

  let checkBox = document.createElement('input');  
  checkBox.type = 'checkbox';
  checkBox.classList.add('form__checkbox');
  checkBox.addEventListener('mousedown', changeSectionToDisplay);

  let taskName = document.createElement('input');
  taskName.type = 'text';
  taskName.classList.add('form__input');
  taskName.value = taskString;
  taskName.disabled = true;

  let editButton = document.createElement('input');
  editButton.type = 'button';
  editButton.classList.add('form__button', 'isEditButton');
  editButton.value = 'edit';
  editButton.addEventListener('click', editTask);

  let deleteButton = document.createElement('input');
  deleteButton.type = 'image';
  deleteButton.alt = 'button to delete';
  deleteButton.src = './remove.svg';
  deleteButton.classList.add('form__image-button');
  deleteButton.addEventListener('click', deleteTask);

  wrapperTaskElement.appendChild(checkBox);
  wrapperTaskElement.appendChild(taskName);
  wrapperTaskElement.appendChild(editButton);
  wrapperTaskElement.appendChild(deleteButton);
  
  return wrapperTaskElement;
}

//Add new task
let addTask = function(event) {
  let parentElement = event.target.closest('.form__fieldset');
  let inputArea = parentElement.querySelector('.form__input');

  if(!inputArea.value) 
  { 
    return; 
  }
  let newTaskElement = createNewTaskElement(inputArea.value);
  inputArea.value = '';

  const incompleteTasksSection = document.querySelector('#incomplete-tasks');
  incompleteTasksSection.appendChild(newTaskElement);
}

//Edit an existing task.
let editTask = function(event) {
  let parentContainer = event.target.closest('.form__line');
  let inputField = parentContainer.querySelector('.form__input');

  if(event.target.classList.contains('isEditButton'))
  {
    event.target.value = 'save';
    event.target.classList.remove('isEditButton');

    inputField.classList.add('form__input_edit-mode');
    inputField.disabled = false;
  }
  else
  {
    event.target.value = 'edit';
    event.target.classList.add('isEditButton');

    inputField.classList.remove('form__input_edit-mode');
    inputField.disabled = true;
  }
}

//Delete task.
let deleteTask = function(event) {
  let parentContainer = event.target.closest('.form__line');
  let formSection = parentContainer.closest('.form__fieldset');
  formSection.removeChild(parentContainer);
}

//Place the task in incomplete or completed sections according to the set flag in the checkbox 
let changeSectionToDisplay = function(event) {
  let incompleteTasksSection = document.querySelector('#incomplete-tasks');
  let completedTasksSection = document.querySelector('#completed-tasks');
  let parentContainer = event.target.closest('.form__line');
  let initialTaskLocation = event.target.closest('.form__fieldset');

  if(initialTaskLocation.classList.contains('form__incomplete-tasks'))
  {
    completedTasksSection.appendChild(parentContainer);
    event.target.checked = true;
  }
  else
  {
    incompleteTasksSection.appendChild(parentContainer);
    event.target.checked = false;
  }
}

var ajaxRequest = function() {
  console.log("AJAX Request");
}

//Set addEventListeners for key elements in DOM-tree
addButton.onclick = addTask;
addButton.addEventListener("click", addTask);
addButton.addEventListener("click", ajaxRequest);
for(let i = 0; i < editButtonsCollection.length; i++)
{
  editButtonsCollection[i].addEventListener('click', editTask);
}

for(let i = 0; i < deleteButtonsCollection.length; i++)
{
  deleteButtonsCollection[i].addEventListener('click', deleteTask);
}

for(let i = 0; i < checkboxesCollection.length; i++)
{
  checkboxesCollection[i].addEventListener('mousedown', changeSectionToDisplay);
}