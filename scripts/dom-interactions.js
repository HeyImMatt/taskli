// const newProjBtn = document.getElementById('newProjBtn');
const projCreateBtn = document.getElementById('projCreateBtn');

// function renderForm() {
//   const form = document.getElementById('newProjForm');
//   form.append(document.createElement("input"));
// }

// newProjBtn.addEventListener('click', renderForm);

function createProject() {
  let project = new Project(
    document.getElementById('projName').value,
    document.getElementById('projDescription').value,
    document.getElementById('projNotes').value,
    null,
    document.getElementById('projDueDate').value,
    document.getElementById('projPriority').value,
    document.getElementById('projStatus').value,
  );
  projectsList.push(project);
  //update the project list dom display
  console.log(projectsList);
}

projCreateBtn.addEventListener('click', createProject);
