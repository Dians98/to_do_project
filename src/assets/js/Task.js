export default class Task {
    constructor(id,title, description, dueDate, isImportant = false) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.done = false;
        this.isImportant = isImportant;
    }

    toggleDone() {
        this.done = !this.done;
    }
}
