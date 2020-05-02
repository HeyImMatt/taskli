const taskCreateBtn = document.getElementById('taskCreateBtn');
const taskForm = document.getElementById('newTaskForm');
const newTaskBtn = document.getElementById('newTaskBtn');
const checkboxes = document.getElementsByClassName('checkbox');
const deleteTaskBtns = document.getElementsByClassName('deleteTaskBtn');
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
