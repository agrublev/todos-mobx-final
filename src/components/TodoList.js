import React, { Component } from "react";
import { observable } from "mobx";
import { observer } from "mobx-react";
import Todo from "./Todo";
import TodoCreate from "./TodoCreate";

@observer
class TodoList extends Component {
    render() {
        const { store } = this.props;
        return (
            <div>
                <TodoCreate store={store} />
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
