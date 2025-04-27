import { Todo } from "./types";

export const getAllTodos = async (): Promise<Todo[]> => {
  const res = await fetch("http://localhost:3001/todos", {
    cache: "no-store",});
  const todos = await res.json();

  return todos;
};

export const addTodo = async (todo: Todo): Promise<Todo> => {
  const res = await fetch("http://localhost:3001/todos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json", 
    },
    body: JSON.stringify(todo),
  });
  const newTodo = await res.json();

  return newTodo;
};

export const editTodo = async (id: string, newTitle: string): Promise<Todo> => {
  const res = await fetch(`http://localhost:3001/todos/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json", 
    },
    body: JSON.stringify({title: newTitle}),
  });
  const updatedTodo = await res.json();

  return updatedTodo;
};

export const deleteTodo = async (id: string): Promise<Todo> => {
  const res = await fetch(`http://localhost:3001/todos/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json", 
    },
  });
  const deleteTodo = await res.json();

  return deleteTodo;
};

