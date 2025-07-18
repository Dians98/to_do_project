export default class Project {
    constructor(name) {
        this._name = name;
        this._tasks = [];
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
    

    addTask(task) {
        this._tasks.push(task);
    }

    getTaskById (id){
        return this._tasks.find(task => task.id == id);
    }
}


