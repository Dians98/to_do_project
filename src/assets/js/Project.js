export default class Project {
    constructor(name) {
        this._name = name;
        this._tasks = [];
    }

    getAllTasks() {
        return this._tasks
    }

    addTask(task) {
        this._tasks.push(task);
    }

    
}


