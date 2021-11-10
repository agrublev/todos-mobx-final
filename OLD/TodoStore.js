import { types } from "mobx-state-tree";

import { Todo } from "./TodoModel";

export const TodoStore = types
	.model("TodoStore", {
		todos: types.array(Todo),
		newTodoTitle: types.optional(types.string, "")
	})
	.actions(self => {
		return {
			addTodo() {
				self.todos.push(
					Todo.create({
						title: self.newTodoTitle
					})
				);
				self.newTodoTitle = "";
			},
			delete(index) {
				self.todos.splice(index, 1);
			},
			setNewTodoTitle(title) {
				self.newTodoTitle = title;
			}
		};
	})
	.views(self => {
		return {
			get unfinishedTodoCount() {
				return self.todos.filter(
					todo => !todo.finished
				).length;
			}
		};
	});
