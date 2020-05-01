const projForm = document.getElementById('newProjForm');
const newProjBtn = document.getElementById('newProjBtn');
const projCreateBtn = document.getElementById('projCreateBtn');
const deleteBtns = document.getElementsByClassName('deleteBtn');
const projLinks = document.getElementsByTagName('a');
let projects;
let currentProjId;

function getProjName() {
  window.localStorage.setItem('currentProjId', JSON.stringify(this.id));
}

function toggleForm() {
  if (projForm.style.display === 'none') {
    projForm.style.display = 'block';
  } else {
    projForm.style.display = 'none';
  }
}

function createProject() {
  let project = new Project(
    document.getElementById('projName').value,
    false,
    document.getElementById('projDescription').value,
    document.getElementById('projNotes').value,
    document.getElementById('projDueDate').value,
    document.getElementById('projPriority').value,
    document.getElementById('projStatus').value,
  );
  if (projects === null) {
    window.localStorage.setItem('Projects List', JSON.stringify([project]));
  } else {
    let arr = [...projects, project];
    console.log(arr);
    window.localStorage.removeItem('Projects List');
    window.localStorage.setItem('Projects List', JSON.stringify(arr));
    projects = JSON.parse(window.localStorage.getItem('Projects List'));
  }
  updateProjectsList(project);
}

function deleteProject() {
  let i = projects.findIndex((el) => el.uid == this.id);
  if (
    confirm(
      `Are you sure you want to delete ${projects[i].name}? This cannot be undone.`,
    ) == true
  ) {
    let ul = document.getElementById('projList');
    let li = document.getElementById(`${this.id}`)
    ul.removeChild(li);
    projects.splice(i, 1);
    window.localStorage.removeItem('Projects List');
    window.localStorage.setItem('Projects List', JSON.stringify(projects));
  }
}

function updateProjectsList(project) {
  let ul = document.getElementById('projList');
  let li = document.createElement('li');
  li.setAttribute('id', `${project.uid}`)
  li.innerHTML = `
  <a href="project.html" id="${project.uid}">${project.name} <button id="${project.uid}" class="deleteBtn"></button>`;
  ul.appendChild(li);
  setProjLinkListeners();
  setDeleteListeners();
}

function fetchProjects() {
  projects = JSON.parse(window.localStorage.getItem('Projects List'));
  if (projects !== null) {
    let ul = document.getElementById('projList');
    projects.forEach((project) => {
      let li = document.createElement('li');
      li.setAttribute('id', `${project.uid}`)
      li.innerHTML = `
      <a href="project.html" id="${project.uid}">${project.name}</a> <button id="${project.uid}" class="deleteBtn"></button>`;
      ul.appendChild(li);
    });
  }
}

function setProjLinkListeners() {
  for (let i = 0; i < projLinks.length; i++) {
    projLinks[i].addEventListener('click', getProjName);
  }
}

function setDeleteListeners() {
  for (let i = 0; i < deleteBtns.length; i++) {
    deleteBtns[i].addEventListener('click', deleteProject);
  }
}

newProjBtn.addEventListener('click', toggleForm);
projCreateBtn.addEventListener('click', createProject);
projCreateBtn.addEventListener('click', toggleForm);

window.onload = fetchProjects();
window.onload = setProjLinkListeners();
window.onload = setDeleteListeners();
