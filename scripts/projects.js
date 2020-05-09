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

function setDefaultProject() {
  if (projects === null) {
    let defaultProject = new Project(
      'Getting Started',
      `Welcome to Taskli!<br>
      Learn how to use Taskli by completing the tasks below.
      <p style="font-size: 12px; max-width: 90%">Important note: This is for demonstration purposes only. Taskli is currently using local storage in your browser to save information so it may not persist if you close your browser, navigate to another website, etc.</p>`,
    );
    defaultProject.tasks.push(
      new Task(
        'Click the New Project button to create a new project',
        false,
        'Enter a name and hit enter or click outside the box to save. Create projects that you want to assign tasks to like Weekend Chores, Vacation Prep, or Learn to Code.',
        'High',
      ),
      new Task(
        'Add a new task by clicking the New Task button',
        false,
        'Tasks can have a priority, a name, and notes.',
        'High',
      ),
      new Task(
        'Click the checkbox to mark this task complete',
        false,
        'Tasks that are complete will be crossed out, but will not be removed from your project.',
        'High',
      ),
      new Task(
        'Delete this task by clicking the red "remove" circle icon',
        false,
        'This permanently deletes a task from your project.',
        'Medium',
      ),
      new Task(
        'Delete this project by clicking the Delete button',
        false,
        'This permanently deletes the project. Feel free to delete this project when you are ready to get started!',
        'Low',
      ),
    ),
      console.log(defaultProject);
    window.localStorage.setItem(
      'Projects List',
      JSON.stringify([defaultProject]),
    );
    updateItemList(defaultProject);
    showNewProject(defaultProject.uid);
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
    if (projects.length === 0) {
      document.getElementById('projectContent').style = 'display: none;'
      window.localStorage.removeItem('currentProjId');
    } else if (projects != null) {
      showFirstProject();
    }
  }
}
