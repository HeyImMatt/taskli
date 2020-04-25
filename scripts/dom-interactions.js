const projForm = document.getElementById('newProjForm');
const newProjBtn = document.getElementById('newProjBtn');
const projCreateBtn = document.getElementById('projCreateBtn');

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
  if (localStorage.getItem('Projects List') === null) {
    //projectsList.push(project);
    window.localStorage.setItem('Projects List', JSON.stringify(project));
    fetchProjects();
  } else {
    let localProjs = [JSON.parse(localStorage.getItem('Projects List'))];
    // projectsList.push(localProjs);
    localProjs.push(project);
    window.localStorage.setItem('Projects List', JSON.stringify(localProjs));
    fetchProjects();
    console.log(localProjs);
  }
  //let localProjects = window.localStorage.getItem('Projects List');
  
  // let ul = document.getElementById('projList');
  // let li = document.createElement('li')
  // li.appendChild(document.createTextNode(`${project.name} - ${project.description} - ${project.dueDate} - ${project.priority}`));
  // ul.appendChild(li)
}

function fetchProjects() {
  let projects = JSON.parse(localStorage.getItem('Projects List'));
  let ul = document.getElementById('projList');
  let li = document.createElement('li');
  console.log(projects);
  for (let i = 0; i < projects.length; i++) {
    let name = projects[i].name;
    let description = projects[i].description;
    let dueDate = projects[i].dueDate;
    let priority = projects[i].priority;
    //let tasks = projects[i].tasks.length; - Tasks: ${tasks}
    li.appendChild(
      document.createTextNode(
        `${name} - ${description} - ${dueDate} - ${priority}`,
      ),
    );
    ul.appendChild(li);
  }
}

newProjBtn.addEventListener('click', toggleForm);
projCreateBtn.addEventListener('click', createProject);
projCreateBtn.addEventListener('click', toggleForm);
window.onload = fetchProjects()