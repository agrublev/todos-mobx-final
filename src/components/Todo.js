import React from "react";
import { observer } from "mobx-react";

@observer
class Todo extends React.Component {
    toggleCheckbox = () => {
        const { todo } = this.props;
        todo.toggle();
    };
    render() {
        const { index, todo } = this.props;
        return (
            <li className={`todoitem ${todo.completed ? "completed" : "notcompleted"}`}>
                <input
                    id={todo.id}
                    type="checkbox"
                    checked={todo.completed}
                    onChange={this.toggleCheckbox}
                />
                {todo.title}
                <button
                    onClick={() => {
                        todo.delete(index);
                    }}
                >
                    delete
                </button>
            </li>
        );
    }
}

export default Todo;
