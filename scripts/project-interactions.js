const taskCreateBtn = document.getElementById('taskCreateBtn');
const taskForm = document.getElementById('newTaskForm');
const newTaskBtn = document.getElementById('newTaskBtn');

function toggleTaskForm() {
  if (taskForm.style.display === 'none') {
    taskForm.style.display = 'block';
  } else {
    taskForm.style.display = 'none';
  }
}

function createTask() {
  let storedProjs = JSON.parse(window.localStorage.getItem('Projects List'));
  let i = storedProjs.findIndex((el) => el.name === 'Project 8');
  let taskListArr = storedProjs[i].tasks;
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
  console.log(storedProjs);
  window.localStorage.removeItem('Projects List');
  window.localStorage.setItem('Projects List', JSON.stringify(storedProjs));
  updateTasksList(task);
}

function updateTasksList(task) {
  let ul = document.getElementById('taskList');
  let li = document.createElement('li');
  li.appendChild(
    document.createTextNode(
      `${task.name} - ${task.description} - Checklist: ${task.checklistItems.length} - ${task.priority} - ${task.dueDate}`,
    ),
  );
  ul.appendChild(li);
}

function fetchTasks() {
  let storedProjs = JSON.parse(window.localStorage.getItem('Projects List'));
  let i = storedProjs.findIndex((el) => el.name === 'Project 8');
  let taskListArr = storedProjs[i].tasks;
  let ul = document.getElementById('taskList');
  taskListArr.forEach((task) => {
    let li = document.createElement('li');
    li.appendChild(
      document.createTextNode(
        `${task.name} - ${task.description} - Checklist: ${task.checklistItems.length} - ${task.priority} - ${task.dueDate}`,
      ),
    );
    ul.appendChild(li);
  });
}

newTaskBtn.addEventListener('click', toggleTaskForm);
taskCreateBtn.addEventListener('click', createTask);
taskCreateBtn.addEventListener('click', toggleTaskForm);

window.onload = fetchTasks();
