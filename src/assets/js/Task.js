export default class Task {
    constructor(id,title, description, dueDate) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.done = false;
        this.is_important = false;
    }

    toggleDone() {
        this.done = !this.done;
    }
}
