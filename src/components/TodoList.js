import React, { Component } from "react";
import { observer } from "mobx-react";
import { observable } from "mobx";
import Todo from "./Todo";
import uuid from "node-uuid";

@observer
class TodoList extends Component {
  @observable title = "";

  componentDidMount() {
    console.warn("test");
    console.log(this.props.store.todos);
  }

  handleInputChange = e => {
    this.title = e.target.value;
  };

  handleFormSubmit = e => {
    const { store } = this.props;
    let taskData = { title: this.title, completed: false };
    fetch("https://5bfe7fb5362b930013f65216.mockapi.io/api/v1/tasks", {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json"
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", //, // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(taskData) // body data type must match "Content-Type" header
    })
      .then(response => response.json())
      .then(data => {
        console.warn("ADDDEDDATA", data);
        this.props.store.createTodo(data);
        this.title = "";
      });
    // store.addTodo();
    // console.log("snapshot", getSnapshot(store.todos));
    e.preventDefault();
  };

  render() {
    const { store } = this.props;
    return (
      <div>
        <form onSubmit={this.handleFormSubmit}>
          New Todo:
          <input
            type="text"
            value={this.title}
            onChange={this.handleInputChange}
          />
          <button type="submit">Add</button>
        </form>
        <hr />
        <ul>
          {store.todos.map((todo, indx) => (
            <Todo todo={todo} index={indx} key={todo.id} />
          ))}
        </ul>
        Tasks left: {store.unfinishedTodoCount}
      </div>
    );
  }
}

export default TodoList;
