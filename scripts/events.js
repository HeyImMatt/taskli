const taskCreateBtn = document.getElementById('taskCreateBtn');
const taskForm = document.getElementById('newTaskForm');
const newTaskBtn = document.getElementById('newTaskBtn');
const checkboxes = document.getElementsByClassName('checkbox');
const deleteTaskBtns = document.getElementsByClassName('deleteTaskBtn');
const taskList = document.getElementById('taskList');
const quickAddProj = document.getElementById('quickAddProj');
const projNameField = document.getElementById('projNameField');
const newProjBtn = document.getElementById('newProjBtn');
const deleteProjBtn = document.getElementById('deleteProj');
const projList = document.getElementById('projList');
const projName = document.getElementById('currentProj');
const projLinks = document.getElementById('projList').childNodes;
let projects;
let currentProj;
let currentProjIndex;
let currentProjId;
let taskListArr;

function clearForms() {
  taskForm.style.display = 'none';
  quickAddProj.style.display = 'none';
}

function toggleForm(form) {
  if (form.style.display === 'none') {
    form.style.display = 'flex';
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
    ul.appendChild(li);
    setProjLinkListeners();
  } else {
    let div = document.createElement('div');
    let button = document.createElement('button');
    ul = taskList;
    button.id = item.uid;
    button.className = 'deleteTaskBtn';
    div.id = 'taskItem';
    li.className = 'task';
    li.innerHTML = `
    <input type="checkbox" class="checkbox" id=${item.uid}><label for=${
      item.uid
    }> ${item.priority} - ${item.name} </label>
    ${
      item.notes
        ? `<br>
      <span id="savedTaskNotes">${item.notes}</span>`
        : ''
    }`;
    ul.appendChild(div);
    div.appendChild(li);
    div.appendChild(button);
  }
}

function updateLocalStorage() {
  window.localStorage.removeItem('Projects List');
  window.localStorage.setItem('Projects List', JSON.stringify(projects));
}

// Project-specific actions
function getProjName() {
  window.localStorage.setItem('currentProjId', JSON.stringify(this.id));
}

function fetchProjects() {
  projects = JSON.parse(window.localStorage.getItem('Projects List'));
  if (projects !== null) {
    let ul = document.getElementById('projList');
    projects.forEach((project) => {
      let li = document.createElement('li');
      li.setAttribute('id', `${project.uid}`);
      li.innerHTML = `
      <a href="#" id="${project.uid}">${project.name}</a>`;
      ul.appendChild(li);
    });
  }
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
  let projDesc = document.getElementById('currentProjDesc');
  currentProj.description === ''
    ? (projDesc.textContent = 'Click to add description...')
    : (projDesc.innerHTML = currentProj.description);
  projLinks.forEach((item) => {
    if (item.id === currentProjId) {
      item.className = 'selected';
    } else {
      item.className = '';
    }
  });
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
  if (projects.length === 0) {
    document.getElementById('projectContent').style = 'display: none;';
  } else projList.firstElementChild.querySelector('a').click();
}

function showNewProject(id) {
  document.getElementById('projectContent').style = 'display: flex;';
  document.getElementById(id).click();
}

function setProjLinkListeners() {
  for (let i = 0; i < projLinks.length; i++) {
    projLinks[i].addEventListener('click', getProjName);
    projLinks[i].addEventListener('click', loadProject);
  }
}

function projDetailsListeners() {
  const projDetails = [...document.getElementById('projectDetails').children];
  projDetails.forEach((item) => {
    item.addEventListener('blur', editProject);
  });
}

newProjBtn.addEventListener('click', (event) => {
  toggleForm(quickAddProj);
  if (newProjBtn.textContent === ' New Project') {
    newProjBtn.innerHTML = `<img src="assets/xwhite.svg"> Cancel`;
  } else newProjBtn.innerHTML = `<img src="assets/addicon.svg"> New Project`;
});
deleteProjBtn.addEventListener('click', deleteProject);
projName.addEventListener('blur', editProject);
projNameField.addEventListener('blur', createProject);
projNameField.addEventListener('keyup', (event) => {
  if (event.keyCode === 13) {
    createProject();
  }
});

//Task-specific actions

function fetchTasks() {
  let ul = document.getElementById('taskList');
  taskListArr.forEach((task) => {
    let div = document.createElement('div');
    div.id = 'taskItem';
    let li = document.createElement('li');
    li.id = task.uid;
    let button = document.createElement('button');
    button.id = task.uid;
    button.className = 'deleteTaskBtn';
    let isChecked = 'checked';
    if (task.isComplete == false) {
      li.className = 'task';
      isChecked = '';
    } else {
      li.className = 'taskComplete';
    }
    li.innerHTML = `
    <input type="checkbox" class="checkbox" id=${
      task.uid
    } ${isChecked}><label for=${task.uid}>${task.priority} - ${
      task.name
    } </label>
    ${
      task.notes
        ? `<br>
    <span id="savedTaskNotes">${task.notes}</span>`
        : ''
    }`;
    ul.appendChild(div);
    div.appendChild(li);
    div.appendChild(button);
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

newTaskBtn.addEventListener('click', (event) => {
  toggleForm(taskForm);
  if (newTaskBtn.textContent === 'New Task') {
    newTaskBtn.innerHTML = `<img src="assets/xwhite.svg">Cancel`;
  } else newTaskBtn.innerHTML = `<img src="assets/pencilwhite.svg">New Task`;
});
taskCreateBtn.addEventListener('click', createTask);

window.onload = fetchProjects();
window.onload = setDefaultProject();
window.onload = setProjLinkListeners();
window.onload = projDetailsListeners();
window.onload = showFirstProject();
