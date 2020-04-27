const taskCreateBtn = document.getElementById('taskCreateBtn');
const taskForm = document.getElementById('newTaskForm');
const newTaskBtn = document.getElementById('newTaskBtn');
let storedProjs;
let currentProjId;
let currentProj;
let taskListArr;

function setCurrentProj() {
  currentProjId = JSON.parse(window.localStorage.getItem('currentProjId'));
  storedProjs = JSON.parse(window.localStorage.getItem('Projects List'));
  let i = storedProjs.findIndex((el) => el.uid == currentProjId);
  currentProj = storedProjs[i];
  taskListArr = currentProj.tasks;
}

function setProjectPage(){
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
  li.appendChild(
    document.createTextNode(
      `${task.name} - ${task.description} - Checklist: ${task.checklistItems.length} - ${task.priority} - ${task.dueDate}`,
    ),
  );
  ul.appendChild(li);
}

function fetchTasks() {
  let ul = document.getElementById('taskList');
  taskListArr.forEach((task) => {
    let li = document.createElement('li');
    li.appendChild(
      document.createTextNode(
        `${task.name} - ${task.description} - Checklist: ${task.checklistItems.length} - ${task.priority} - ${task.dueDate}`,
      ),
    );
    ul.appendChild(li);
  });
}

newTaskBtn.addEventListener('click', toggleTaskForm);
taskCreateBtn.addEventListener('click', createTask);
taskCreateBtn.addEventListener('click', toggleTaskForm);

window.onload = setCurrentProj();
window.onload = setProjectPage();
window.onload = fetchTasks();
