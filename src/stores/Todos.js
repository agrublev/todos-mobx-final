import { observable } from "mobx";

export class TodoStore {
  @observable todos = [];
  isLoading = true;

  constructor() {
    this.loadTodos();
  }

  // Fetches all Todos from the server.
  loadTodos() {
    this.isLoading = true;
    fetch("https://5bfe7fb5362b930013f65216.mockapi.io/api/v1/tasks")
      .then(response => response.json())
      .then(data => {
        // this.todos = data;
        console.warn("-- Console data", data);
        data.forEach(todo => {
          this.createTodo(todo);
        });
        this.isLoading = false;
      });
  }

  createTodo(data) {
    const todo = new Todo(this, data);
    this.todos.push(todo);
    return todo;
  }

  removeTodo(todo) {
    this.todos.splice(this.todos.indexOf(todo), 1);
    todo.dispose();
  }

  get unfinishedTodoCount() {
    return this.todos.filter(e => !e.completed).length + " / " + this.todos.length;
  }
}

export class Todo {
  id = null; // Unique id of this Todo, immutable.
  @observable completed = false;
  @observable title = "";
  store = null;

  constructor(store, ...rest) {
    this.store = store;
    Object.assign(this, ...rest);
  }

  // Remove this Todo from the client and the server.
  delete() {
    fetch(
      `https://5bfe7fb5362b930013f65216.mockapi.io/api/v1/tasks/${this.id}`,
      {
        method: "DELETE", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
          "Content-Type": "application/json"
        },
        referrerPolicy: "no-referrer"
      }
    )
      .then(response => response.json())
      .then(data => {
        this.store.removeTodo(this);
      });
  }
  toggle() {
    fetch(
      `https://5bfe7fb5362b930013f65216.mockapi.io/api/v1/tasks/${this.id}`,
      {
        method: "PUT", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
          "Content-Type": "application/json"
        },
        referrerPolicy: "no-referrer",
        body: JSON.stringify({ completed: !this.completed })
      }
    )
      .then(response => response.json())
      .then(data => {
        this.completed = data.completed;
      });
  }
  get asJson() {
    return {
      id: this.id,
      completed: this.completed,
      title: this.title
    };
  }
}
