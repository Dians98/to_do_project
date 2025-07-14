export default class Task {
    constructor(id,title, description, dueDate, isImportant = false) {
        this._id = id;
        this._title = title;
        this._description = description;
        this._dueDate = dueDate;
        this._done = false;
        this._isImportant = isImportant;
    }

    toggleDone() {
        this.done = !this.done;
    }
    get id(){
        return this._id
    }
    set id(id){
        this._id = id
    }

    get title(){
        return this._title
    }
    set title(title){
        this._title = title
    }

    get description(){
        return this._description
    }
    set description(description){
        this._description = description
    }

    get dueDate(){
        return this._dueDate
    }
    set dueDate(dueDate){
        this._dueDate = dueDate
    }

    get done(){
        return this._done
    }
    set done(done){
        this._done= done
    }

    get isImportant(){
        return this._isImportant
    }
    set isImportant(isImportant){
        this._isImportant = isImportant
    }
}
