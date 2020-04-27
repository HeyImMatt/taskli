function createUid() {
  let uid = Date.now();
  if (uid <= this.previous) {
    uid = ++this.previous;
  } else {
    this.previous = uid;
  }
  return uid;
}

class ObjectHandler {
  uid
  constructor(
    name,
    isComplete = false
  ) {
    this.uid = createUid();
    this.name = name;
    this.isComplete = isComplete;
  }
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

  //not using the function below to create tasks probably. let's do that.
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

  // let's get rid of checklist items on tasks. can probably do that via notes or something.
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