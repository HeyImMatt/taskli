const taskCreateBtn = document.getElementById('taskCreateBtn');
const taskForm = document.getElementById('newTaskForm');
const newTaskBtn = document.getElementById('newTaskBtn');
const checkboxes = document.getElementsByClassName('checkbox');
const deleteTaskBtns = document.getElementsByClassName('deleteTaskBtn');
let storedProjs;
//let currentProjId;
let currentProj;
let currentProjIndex;
let taskListArr;

function setCurrentProj() {
  currentProjId = JSON.parse(window.localStorage.getItem('currentProjId'));
  storedProjs = JSON.parse(window.localStorage.getItem('Projects List'));
  currentProjIndex = storedProjs.findIndex((el) => el.uid == currentProjId);
  currentProj = storedProjs[currentProjIndex];
  currentProj.tasks ? taskListArr = currentProj.tasks : taskListArr = [];
}

function updateProj() {
  storedProjs.splice(currentProjIndex, 1, currentProj);
  window.localStorage.removeItem('Projects List');
  window.localStorage.setItem('Projects List', JSON.stringify(storedProjs));
}

function setProjectPage() {
  let projTitle = document.getElementById('currentProj');
  projTitle.innerHTML = `${currentProj.name}  <button id="${currentProj.uid}" class="deleteProjBtn"></button>`;
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
  setCheckboxListeners();
  setDeleteTaskListeners();
}

function deleteItem() {

}

function deleteTask() {
  let i = taskListArr.findIndex((el) => el.uid == this.id);
  if (
    confirm(
      `Are you sure you want to delete ${taskListArr[i].name}? This cannot be undone.`,
    ) == true
  ) {
    let ul = document.getElementById('taskList');
    let li = document.getElementById(`${this.id}`);
    ul.removeChild(li);
    taskListArr.splice(i, 1);
    updateProj()
  }
}

function updateTasksList(task) {
  let ul = document.getElementById('taskList');
  let li = document.createElement('li');
  li.id = task.uid;
  li.className = 'task';
  li.setAttribute('id', `${task.uid}`);
  li.innerHTML = `
    <input type="checkbox" class="checkbox" id=${task.uid}>${task.name} - ${task.priority} - ${task.dueDate} <button id="${task.uid}" class="deleteTaskBtn">X</button>`;
  ul.appendChild(li);
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
    let isChecked = 'checked';
    if (task.isComplete == false) {
      li.className = 'task';
      isChecked = '';
    } else {
      li.className = 'taskComplete';
    }
    li.innerHTML = `
    <input type="checkbox" class="checkbox" id=${task.uid} ${isChecked}>${task.name} - ${task.priority} - ${task.dueDate} <button id="${task.uid}" class="deleteTaskBtn">X</button>`;
    ul.appendChild(li);
  });
}

// Note: can get all buttons in the variable and then use buttons.forEach (btn => {
  // btn.addEventListener('click', function)})
function setCheckboxListeners() {
  for (let i = 0; i < checkboxes.length; i++) {
    checkboxes[i].addEventListener('click', toggleTaskComplete);
  }
}

function setDeleteTaskListeners() {
  for (let i = 0; i < deleteTaskBtns.length; i++) {
    deleteTaskBtns[i].addEventListener('click', deleteTask);
  }
}

function clearTasksList() {
  let ul = document.getElementById('taskList');
  ul.innerHTML = '';
}

newTaskBtn.addEventListener('click', toggleTaskForm);
taskCreateBtn.addEventListener('click', createTask);
taskCreateBtn.addEventListener('click', toggleTaskForm);

function loadProject() {
setCurrentProj();
setProjectPage();
clearTasksList()
fetchTasks();
setCheckboxListeners();
setDeleteTaskListeners();
}