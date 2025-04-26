import { Todo } from "../types";
import { TodoAction } from "./TodoAction";

export interface TodoListProps {
  todos: Todo[];
}

export const TodoList = ({ todos }: TodoListProps) => {
  return (
    <ul className="space-y-3">
      {todos.map((todo) => (
        <TodoAction key={todo.id} todo={todo} />
      ))}
    </ul>
  );
};
