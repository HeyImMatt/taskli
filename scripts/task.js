//const projectsList = [];

function createUidV2() {
  let uid = Date.now();
  if (uid <= this.previous) {
    uid = ++this.previous;
  } else {
    this.previous = uid;
  }
  return uid;
}

class ObjectHandler {
  #uid
  constructor(
    name,
    isComplete = false
  ) {
    this.#uid = createUidV2();
    this.name = name;
    this.isComplete = isComplete;
  }
  createUid() {
    let uid = Date.now();
    if (uid <= this.createUid.previous) {
      uid = ++this.createUid.previous;
    } else {
      this.createUid.previous = uid;
    }
    return uid;
  }
  // Want to add code to do DOM rendering here

  //   createRootElement(tag, cssClasses, attributes) {
//     const rootElement = document.createElement(tag);
//     if (cssClasses) {
//         rootElement.className = cssClasses;
//     }
//     if (attributes && attributes.length > 0) {
//         for (const attr of attributes) {
//             rootElement.setAttribute(attr.name, attr.value);
//         }
//     }
//     document.getElementById(this.hookId).append(rootElement);
//     return rootElement;
// }

}

class Project extends ObjectHandler {
  constructor(
    name,
    isComplete,
    description,
    notes,
    tasks,
    dueDate,
    priority,
    status,
  ) {
    super(...arguments);
    this.description = description;
    this.notes = notes;
    this.tasks = [];
    this.dueDate = dueDate;
    this.priority = priority;
    this.status = status;
  }

  createTask() {
    let task = new Task(...arguments);
    this.tasks.push(task)
    console.log(this.tasks);
  }

}

class Task extends ObjectHandler {
  constructor(
    name,
    isComplete,
    description,
    notes,
    checklistItems,
    dueDate,
    priority,
    status,
  ) {
    super(...arguments);
    this.description = description;
    this.notes = notes;
    this.checklistItems = []
    this.dueDate = dueDate;
    this.priority = priority;
    this.status = status;
  }

  createCheckListItem() {
    let item = new ChecklistItem(...arguments);
    this.checklistItems.push(item)
    console.log(this.checklistItems);
  }

}

class ChecklistItem extends ObjectHandler {
  constructor(name, isComplete) {
    super(...arguments);
  }
}

// projects have tasks - composition
// - who controls the creation?
//    - project or app?
//    - can tasks be reassigned?
// - are tasks aware of their project?
// - can tasks exist without a project?

// assuming project creates its own:
//    project.createTask(data) {
//        this.tasks.push(new Task(data));
//    }