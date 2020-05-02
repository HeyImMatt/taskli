

function updateProj() {
  projects.splice(currentProjIndex, 1, currentProj);
  window.localStorage.removeItem('Projects List');
  window.localStorage.setItem('Projects List', JSON.stringify(projects));
}


// function updateTasksList(task) {
//   let ul = document.getElementById('taskList');
//   let li = document.createElement('li');
//   li.id = task.uid;
//   li.className = 'task';
//   //li.setAttribute('id', `${task.uid}`);
//   li.innerHTML = `
//     <input type="checkbox" class="checkbox" id=${task.uid}>${task.name} - ${task.priority} - ${task.dueDate} <button id="${task.uid}" class="deleteTaskBtn">X</button>`;
//   ul.appendChild(li);
// }


function createTask() {
  let task = new Task(
    document.getElementById('taskName').value,
    false,
    document.getElementById('taskDescription').value,
    document.getElementById('taskNotes').value,
    document.getElementById('taskDueDate').value,
    document.getElementById('taskPriority').value,
    document.getElementById('taskStatus').value,
  );
  taskListArr.push(task);
  window.localStorage.removeItem('Projects List');
  window.localStorage.setItem('Projects List', JSON.stringify(projects));
  updateItemList(task);
  toggleForm(taskForm);
  setCheckboxListeners();
  setDeleteTaskListeners();
}

function deleteItem() {

}

function deleteTask() {
  let i = taskListArr.findIndex((el) => el.uid == this.id);
  if (
    confirm(
      `Are you sure you want to delete ${taskListArr[i].name}? This cannot be undone.`,
    ) == true
  ) {
    let ul = document.getElementById('taskList');
    let li = document.getElementById(`${this.id}`);
    ul.removeChild(li);
    taskListArr.splice(i, 1);
    updateProj()
  }
}

function toggleTaskComplete() {
  let i = taskListArr.findIndex((el) => el.uid == this.id);
  let taskListItem = document.getElementById(this.id);
  taskListArr[i].isComplete == false
    ? (taskListArr[i].isComplete = true)
    : (taskListArr[i].isComplete = false);
  taskListItem.className == 'task'
    ? (taskListItem.className = 'taskComplete')
    : (taskListItem.className = 'task');
  updateProj();
}
