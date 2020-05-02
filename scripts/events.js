const taskCreateBtn = document.getElementById('taskCreateBtn');
const taskForm = document.getElementById('newTaskForm');
const newTaskBtn = document.getElementById('newTaskBtn');
const checkboxes = document.getElementsByClassName('checkbox');
const deleteTaskBtns = document.getElementsByClassName('deleteTaskBtn');
const taskList = document.getElementById('taskList');
const projForm = document.getElementById('newProjForm');
const newProjBtn = document.getElementById('newProjBtn');
const projCreateBtn = document.getElementById('projCreateBtn');
const deleteProjBtn = document.getElementById('deleteProj');
const projList = document.getElementById('projList');
const projLinks = document.getElementsByTagName('a');
let projects;
let currentProj;
let currentProjIndex;
let currentProjId;
let taskListArr;

function clearForms() {
  taskForm.style.display = 'none';
  projForm.style.display = 'none';
}

function toggleForm(form) {
  if (form.style.display === 'none') {
    form.style.display = 'block';
  } else {
    form.style.display = 'none';
  }
}

function updateItemList(item) {
  let ul;
  let li = document.createElement('li');
  li.id = item.uid;
  if (item.tasks) {
    ul = projList;
    li.innerHTML = `
  <a href="#" id="${item.uid}">${item.name}</a>`;
  setProjLinkListeners();
  } else {
    ul = taskList;
    li.className = 'task';
    li.innerHTML = `
    <input type="checkbox" class="checkbox" id=${item.uid}>${item.name} - ${item.priority} - ${item.dueDate} <button id="${item.uid}" class="deleteTaskBtn">X</button>`;
  }
  ul.appendChild(li);
}

// Project-specific actions
function getProjName() {
  window.localStorage.setItem('currentProjId', JSON.stringify(this.id));
}

function setCurrentProj() {
  currentProjId = JSON.parse(window.localStorage.getItem('currentProjId'));
  projects = JSON.parse(window.localStorage.getItem('Projects List'));
  currentProjIndex = projects.findIndex((el) => el.uid == currentProjId);
  currentProj = projects[currentProjIndex];
  currentProj.tasks ? (taskListArr = currentProj.tasks) : (taskListArr = []);
}

function setProjectPage() {
  let projTitle = document.getElementById('currentProj');
  projTitle.innerHTML = `<h3>${currentProj.name}</h3>`;
}

function loadProject() {
  setCurrentProj();
  setProjectPage();
  clearTasksList();
  fetchTasks();
  setCheckboxListeners();
  setDeleteTaskListeners();
  clearForms();
}

function showFirstProject() {
  projList.firstElementChild.querySelector('a').click();
}

function setProjLinkListeners() {
  for (let i = 0; i < projLinks.length; i++) {
    projLinks[i].addEventListener('click', getProjName);
    projLinks[i].addEventListener('click', loadProject);
  }
}

newProjBtn.addEventListener('click', event => {
  toggleForm(projForm)});
projCreateBtn.addEventListener('click', createProject);
deleteProjBtn.addEventListener('click', deleteProject);


//Task-specific actions 

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
  
  newTaskBtn.addEventListener('click', event => {
    toggleForm(taskForm)});
  taskCreateBtn.addEventListener('click', createTask);

window.onload = fetchProjects();
window.onload = setProjLinkListeners();
window.onload = showFirstProject();
