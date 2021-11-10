import React from "react";
import { render } from "react-dom";

import TodoList from "./components/TodoList";
import { TodoStore } from "./stores/Todos";
import "./style.less";

const store = new TodoStore();
render(
	<div>
		<TodoList store={store} />
	</div>,
	document.getElementById("root")
);
