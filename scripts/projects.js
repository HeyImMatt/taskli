class Project extends ObjectHandler {
  constructor(name, description, tasks) {
    super(...arguments);
    this.description = description;
    this.tasks = [];
  }

  //not using the function below to create tasks probably. let's do that.
  createTask() {
    let task = new Task(...arguments);
    this.tasks.push(task);
    console.log(this.tasks);
  }
}

function createProject() {
  if (projNameField.value === '') {
    document.getElementById('newProjBtn').click();
  } else {
    let project = new Project(projNameField.value, '');
    if (projects === null) {
      window.localStorage.setItem('Projects List', JSON.stringify([project]));
    } else {
      let arr = [...projects, project];
      window.localStorage.removeItem('Projects List');
      window.localStorage.setItem('Projects List', JSON.stringify(arr));
      projects = JSON.parse(window.localStorage.getItem('Projects List'));
    }
    updateItemList(project);
    showNewProject(project.uid);
    projNameField.value = '';
  }
}

function updateProj() {
  projects.splice(currentProjIndex, 1, currentProj);
  updateLocalStorage();
}

function editProject() {
  console.log(this.id);
  if (this.id == 'currentProj') {
    currentProj.name = this.textContent;
  } else if (this.id == 'currentProjDesc') {
    currentProj.description = this.textContent;
  }
  console.log('editProject fired');
  updateProj();
}

function deleteProject() {
  let i = projects.findIndex((el) => el.uid == currentProjId);
  if (
    confirm(
      `Are you sure you want to delete ${projects[i].name}? This cannot be undone.`,
    ) == true
  ) {
    let ul = document.getElementById('projList');
    let li = document.getElementById(`${currentProjId}`);
    ul.removeChild(li);
    projects.splice(i, 1);
    updateLocalStorage();
    showFirstProject();
  }
}
