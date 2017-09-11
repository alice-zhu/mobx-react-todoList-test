import {observable, computed} from "mobx";

class TodoModel {
    id = Math.random();
    @observable title;
    @observable finished = false;
    @observable priority;

    constructor(title,priority){
        this.title = title;
        this.priority = priority;
    }
}

export default TodoModel;