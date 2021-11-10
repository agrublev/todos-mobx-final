import React, { Component } from "react";
import { observable } from "mobx";
import { observer } from "mobx-react";

@observer
class TodoCreate extends Component {
    @observable title = "";

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
        e.preventDefault();
    };
    render() {
        return (
            <form onSubmit={this.handleFormSubmit} className={"todoCreateForm"}>
                <label for="title">New Todo:</label>
                <input
                    type="text"
                    name="title"
                    id="title"
                    value={this.title}
                    onChange={this.handleInputChange}
                />
                <button type="submit">Add</button>
            </form>
        );
    }
}
export default TodoCreate;
