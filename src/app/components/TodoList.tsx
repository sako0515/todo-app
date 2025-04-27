import { Todo } from "../types";
import { TodoAction } from "./TodoAction";
import { Dispatch, SetStateAction } from "react";

export interface TodoListProps {
  todos: Todo[];
  setTodos: Dispatch<SetStateAction<Todo[]>>;
}

export const TodoList = ({ todos, setTodos }: TodoListProps) => {
  return (
    <ul className="space-y-3">
      {todos.map((todo) => (
        <TodoAction key={todo.id} todo={todo} setTodos={setTodos} />
      ))}
    </ul>
  );
};
