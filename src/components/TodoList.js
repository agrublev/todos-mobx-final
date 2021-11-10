import React, { Component } from "react";
import { observer } from "mobx-react";

@observer
class TodoList extends Component {
    render() {
        const { store } = this.props;
        return (
            <div>
                {store.todos.map(todo => (
                    <div key={todo.id}>{todo.title}</div>
                ))}
            </div>
        );
    }
}

export default TodoList;
