var taskInput = document.getElementById('new-task');
var addButton = document.getElementsByTagName('button')[0];
var incompleteTaskHolder = document.getElementById('incomplete-tasks');
var completedTasksHolder = document.getElementById('completed-tasks');
var containerHolder = document.getElementsByClassName('container');

var createNewTaskElement = function (taskString) {
  var listItem = document.createElement('li');
  var label = document.createElement('label');
  var deleteButton = document.createElement('button');
  var deleteIcon = document.createElement('span');

  deleteIcon.className = 'fa fa-remove';
  label.innerText = taskString;
  listItem.className = 'incomplete-tasks-list';
  deleteButton.className = 'delete';
  deleteButton.appendChild(deleteIcon);

  listItem.appendChild(label);
  listItem.appendChild(deleteButton);

  return listItem;
};

var addTask = function () {
  var listItem = createNewTaskElement(taskInput.value);

  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
  taskInput.value = '';
  addButton.disabled = true;
};

var deleteTask = function () {
  var listItem = this.parentNode;
  var ul = listItem.parentNode;
  ul.removeChild(listItem);
};

var taskCompleted = function () {
  var listItem = this.parentNode;
  listItem.className = 'completed-tasks-list';
  completedTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskIncomplete);
};

var taskIncomplete = function () {
  console.log('Incomplete Task...');
  var listItem = this.parentNode;
  listItem.className = 'incomplete-tasks-list';
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
};

var enableButton = function () {
  if (taskInput.value) {
    addButton.disabled = false;
  } else {
    addButton.disabled = true;
  }
};

addButton.disabled = true;
addButton.addEventListener('click', addTask);
taskInput.addEventListener('input', enableButton);

var bindTaskEvents = function (taskListItem, checkBoxEventHandler) {
  var label = taskListItem.querySelector('label');
  var deleteButton = taskListItem.querySelector('button.delete');

  label.onclick = checkBoxEventHandler;
  deleteButton.onclick = deleteTask;
};

for (var i = 0; i < incompleteTaskHolder.children.length; i++) {
  bindTaskEvents(incompleteTaskHolder.children[i], taskCompleted);
}

for (var i = 0; i < completedTasksHolder.children.length; i++) {
  bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}
