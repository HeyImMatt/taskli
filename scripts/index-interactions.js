// const projForm = document.getElementById('newProjForm');
// const newProjBtn = document.getElementById('newProjBtn');
// const projCreateBtn = document.getElementById('projCreateBtn');
// const deleteProjBtn = document.getElementById('deleteProj');
// const projList = document.getElementById('projList');
// const projLinks = document.getElementsByTagName('a');
// let projects;
// let currentProjId;

function getProjName() {
  window.localStorage.setItem('currentProjId', JSON.stringify(this.id));
}

function showFirstProject() {
  projList.firstElementChild.querySelector('a').click();
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
    window.localStorage.removeItem('Projects List');
    window.localStorage.setItem('Projects List', JSON.stringify(arr));
    projects = JSON.parse(window.localStorage.getItem('Projects List'));
  }
  updateProjectsList(project);
  toggleForm(projForm);
}

function deleteProject() {
  let i = projects.findIndex((el) => el.uid == currentProjId);
  if (
    confirm(
      `Are you sure you want to delete ${projects[i].name}? This cannot be undone.`,
    ) == true
  ) {
    let ul = document.getElementById('projList');
    let li = document.getElementById(`${currentProjId}`)
    ul.removeChild(li);
    projects.splice(i, 1);
    window.localStorage.removeItem('Projects List');
    window.localStorage.setItem('Projects List', JSON.stringify(projects));
    showFirstProject();
  }
}

function updateProjectsList(project) {
  let ul = document.getElementById('projList');
  let li = document.createElement('li');
  li.setAttribute('id', `${project.uid}`)
  li.innerHTML = `
  <a href="#" id="${project.uid}">${project.name}</a>`;
  ul.appendChild(li);
  setProjLinkListeners();
}

function fetchProjects() {
  projects = JSON.parse(window.localStorage.getItem('Projects List'));
  if (projects !== null) {
    let ul = document.getElementById('projList');
    projects.forEach((project) => {
      let li = document.createElement('li');
      li.setAttribute('id', `${project.uid}`)
      li.innerHTML = `
      <a href="#" id="${project.uid}">${project.name}</a>`;
      ul.appendChild(li);
    });
  }
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

window.onload = fetchProjects();
window.onload = setProjLinkListeners();
window.onload = showFirstProject();
