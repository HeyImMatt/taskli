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