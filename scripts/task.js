const projectsList = [];

class ObjectHandler {
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
  #uid;
  constructor(
    name,
    description,
    notes,
    tasks,
    dueDate,
    priority,
    status,
    isComplete,
  ) {
    super();
    this.#uid = super.createUid();
    this.name = name;
    this.description = description;
    this.notes = notes;
    this.tasks = [tasks];
    this.dueDate = dueDate;
    this.priority = priority;
    this.status = status;
    this.isComplete = isComplete;
  }
}

class Task extends ObjectHandler {
  #uid
  constructor(
    name,
    description,
    notes,
    checklistItems,
    dueDate,
    priority,
    status,
    isComplete,
  ) {
    super();
    this.#uid = super.createUid();
    this.name = name;
    this.description = description;
    this.notes = notes;
    this.checklistItems = [checklistItems]
    this.dueDate = dueDate;
    this.priority = priority;
    this.status = status;
    this.isComplete = isComplete;
  }
}

class ChecklistItem extends ObjectHandler {
  #uid;
  constructor(name, isComplete) {
    super();
    this.#uid = super.createUid();
    this.name = name;
    this.isComplete = isComplete;
  }
}

const p1 = new Project(
  'Test Project',
  'Some Description',
  'Some Notes',
  '',
  '',
  '',
  'Backlog',
  false,
);
const t1 = new Task(
  'Test Task',
  'Task Description',
  'Task notes',
  '',
  '',
  '',
  false,
  '',
);
const ci1 = new ChecklistItem('Test Checklist Item', false);
const ci2 = new ChecklistItem('Second Checklist Item', true);
t1.checklistItems.push(ci1)
console.log(p1, t1, ci1, ci2);


