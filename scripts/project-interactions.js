const taskCreateBtn = document.getElementById('taskCreateBtn');
const taskForm = document.getElementById('newTaskForm');
const newTaskBtn = document.getElementById('newTaskBtn');
const checkboxes = document.getElementsByClassName('checkbox');
let storedProjs;
let currentProjId;
let currentProj;
let currentProjIndex;
let taskListArr;

function setCurrentProj() {
  currentProjId = JSON.parse(window.localStorage.getItem('currentProjId'));
  storedProjs = JSON.parse(window.localStorage.getItem('Projects List'));
  currentProjIndex = storedProjs.findIndex((el) => el.uid == currentProjId);
  currentProj = storedProjs[currentProjIndex];
  taskListArr = currentProj.tasks;
}

function updateProj() {
  storedProjs.splice(currentProjIndex, 1, currentProj);
  window.localStorage.removeItem('Projects List');
  window.localStorage.setItem('Projects List', JSON.stringify(storedProjs));
}

function setProjectPage() {
  let projTitle = document.getElementById('currentProj');
  projTitle.innerHTML = currentProj.name;
}

function toggleTaskForm() {
  if (taskForm.style.display === 'none') {
    taskForm.style.display = 'block';
  } else {
    taskForm.style.display = 'none';
  }
}

function createTask() {
  let task = new Task(
    document.getElementById('taskName').value,
    false,
    document.getElementById('taskDescription').value,
    document.getElementById('taskNotes').value,
    document.getElementById('taskDueDate').value,
    document.getElementById('taskPriority').value,
    document.getElementById('taskStatus').value,
  );
  taskListArr.push(task);
  window.localStorage.removeItem('Projects List');
  window.localStorage.setItem('Projects List', JSON.stringify(storedProjs));
  updateTasksList(task);
}

function updateTasksList(task) {
  let ul = document.getElementById('taskList');
  let li = document.createElement('li');
  li.id = task.uid;
  li.className = 'task';
  li.innerHTML = `
    <input type="checkbox" class="checkbox" id=${task.uid}>${task.name} - ${task.description} - Checklist: ${task.checklistItems.length} - ${task.priority} - ${task.dueDate}`;
  ul.appendChild(li);
  li.addEventListener('click', toggleTaskComplete);
}

function toggleTaskComplete() {
  let i = taskListArr.findIndex((el) => el.uid == this.id);
  let taskListItem = document.getElementById(this.id);
  taskListArr[i].isComplete == false
    ? (taskListArr[i].isComplete = true)
    : (taskListArr[i].isComplete = false);
  taskListItem.className == 'task'
    ? (taskListItem.className = 'taskComplete')
    : (taskListItem.className = 'task');
  updateProj();
}

function fetchTasks() {
  let ul = document.getElementById('taskList');
  taskListArr.forEach((task) => {
    let li = document.createElement('li');
    li.id = task.uid;
    let isChecked = 'checked'
    if (task.isComplete == false) {
      li.className = 'task';
      isChecked = '';
    } else {
      li.className = 'taskComplete';
    }
    li.innerHTML = `
    <input type="checkbox" class="checkbox" id=${task.uid} ${isChecked}>${task.name} - ${task.description} - Checklist: ${task.checklistItems.length} - ${task.priority} - ${task.dueDate}`;
    ul.appendChild(li);
  });
}

function setCheckboxListeners() {
  for (let i = 0; i < checkboxes.length; i++) {
    checkboxes[i].addEventListener('click', toggleTaskComplete);
  }
}

newTaskBtn.addEventListener('click', toggleTaskForm);
taskCreateBtn.addEventListener('click', createTask);
taskCreateBtn.addEventListener('click', toggleTaskForm);

window.onload = setCurrentProj();
window.onload = setProjectPage();
window.onload = fetchTasks();
window.onload = setCheckboxListeners();
