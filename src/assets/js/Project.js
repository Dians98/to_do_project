export default class Project {
    constructor(name) {
        this.name = name;
        this.tasks = [];
    }

    getAllTasks() {
        return this.tasks
    }

    addTask(task) {
        this.tasks.push(task);
    }

    removeTask(taskId) {
        this.tasks = this.tasks.filter(t => t.id !== taskId);
    }
}


