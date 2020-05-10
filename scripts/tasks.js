class Task extends ObjectHandler {
  constructor(name, isComplete, notes, priority) {
    super(...arguments);
    this.isComplete = false;
    this.notes = notes;
    this.priority = priority;
  }
}

function createTask() {
  let taskValid = /.*\S.*/;
  if (taskValid.test(document.getElementById('taskName').value) === true ) {
    let task = new Task(
      document.getElementById('taskName').value,
      false,
      document.getElementById('taskNotes').value,
      document.getElementById('taskPriority').value,
    );
    taskListArr.push(task);
    updateLocalStorage();
    updateItemList(task);
    toggleForm(taskForm);
    newTaskBtn.innerHTML = `<img src="assets/pencilwhite.svg">New Task`;
    setCheckboxListeners();
    setDeleteTaskListeners();
  } else alert('Please enter a name for the task');
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
    let div = li.closest('div');
    ul.removeChild(div);
    taskListArr.splice(i, 1);
    updateProj();
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
