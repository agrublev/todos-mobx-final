import { types, destroy, getRoot } from "mobx-state-tree";
const { string, optional, boolean, number } = types;
export const Todo = types
	.model("Todo", {
		title: string,
		finished: optional(boolean, false),
		id: optional(number, () => Math.random())
	})
	.actions(self => {
		return {
			delete(index) {
				getRoot(self).delete(index);
			},
			toggle() {
				self.finished = !self.finished;
			}
		};
	});
