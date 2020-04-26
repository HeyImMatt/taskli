const projForm = document.getElementById('newProjForm');
const newProjBtn = document.getElementById('newProjBtn');
const projCreateBtn = document.getElementById('projCreateBtn');
let currentProjName;

function getProjName(id) {
  currentProjName = id;
  window.localStorage.setItem('currentProjName', JSON.stringify(currentProjName));
}

function toggleForm() {
  if (projForm.style.display === 'none') {
    projForm.style.display = 'block';
  } else {
    projForm.style.display = 'none';
  }
}

function createProject() {
  let storedProjs = JSON.parse(window.localStorage.getItem('Projects List'));
  console.log(storedProjs);
  let project = new Project(
    document.getElementById('projName').value,
    false,
    document.getElementById('projDescription').value,
    document.getElementById('projNotes').value,
    document.getElementById('projDueDate').value,
    document.getElementById('projPriority').value,
    document.getElementById('projStatus').value,
  );
  if (storedProjs === null) {
    window.localStorage.setItem('Projects List', JSON.stringify([project]));
  } else {
    let arr = [...storedProjs, project];
    console.log(arr);
    window.localStorage.removeItem('Projects List');
    window.localStorage.setItem('Projects List', JSON.stringify(arr));
  }
  updateProjectsList(project);
}

function updateProjectsList(project) {
  let ul = document.getElementById('projList');
  let li = document.createElement('li');
  li.innerHTML = `
  <a href="project.html" id="${project.name}" onclick="getProjName(this.id)">${project.name} - ${project.description} - Tasks: ${project.tasks.length} - ${project.priority} - ${project.dueDate}</a>`;
  ul.appendChild(li);
}

function fetchProjects() {
  let projects = JSON.parse(window.localStorage.getItem('Projects List'));
  if (projects !== null) {
    let ul = document.getElementById('projList');
    projects.forEach((project) => {
      let li = document.createElement('li');
      li.innerHTML = `
      <a href="project.html" id="${project.name}" onclick="getProjName(this.id)">${project.name} - ${project.description} - Tasks: ${project.tasks.length} - ${project.priority} - ${project.dueDate}</a>`;
      ul.appendChild(li);
    });
  }
}

newProjBtn.addEventListener('click', toggleForm);
projCreateBtn.addEventListener('click', createProject);
projCreateBtn.addEventListener('click', toggleForm);
window.onload = fetchProjects();
