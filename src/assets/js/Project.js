export default class Project {
    constructor(id, name) {
        this._id = id;
        this._name = name;
        this._tasks = [];
    }
    get id() {
        return this._id;
    }

    set name(name) {
        this._name = name;
    }

    get name() {
        return this._name;
    }

    get tasks() {
        return this._tasks;
    }
    
    set tasks(tasks) {
        this._tasks = tasks;
    }

    addTask(task) {
        this._tasks.push(task);
    }

    removeTask(taskId) {
        this._tasks = this._tasks.filter(task => task.id != taskId);
    }

    getTaskById (id){
        return this._tasks.find(task => task.id == id);
    }
}


