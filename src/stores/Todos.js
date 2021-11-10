import { observable } from "mobx";

export class TodoStore {
    @observable todos = [];
    constructor() {
        this.loadTodos();
    }

    // Fetches all Todos from the server.
    loadTodos() {
        this.todos.push({ title: "test", id: 5, completed: false });
    }
}
