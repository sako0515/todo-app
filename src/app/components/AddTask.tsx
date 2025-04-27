"use client";
import { ChangeEvent, FormEvent, useState } from "react";
import { addTodo } from "../api";
import { Todo } from "../types";
import { v4 as uuidv4 } from 'uuid';

interface AddTaskProps {
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

export const AddTask = ({ setTodos }: AddTaskProps) => {
  const [todoTitle, setTodoTitle] = useState<string>("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (todoTitle.trim() === "") {
      alert("タスクのタイトルを入力してください。");
      return;
    }
    try {
      const newTodo = { id: uuidv4(), title: todoTitle };
      const res = await addTodo(newTodo);
      setTodos((prevTodos) => [...prevTodos, newTodo]);
      setTodoTitle("");
    } catch (error) {
      console.error("Failed to add todo:", error);
      alert("タスクの追加に失敗しました。もう一度お試しください。");
    }
  };

  return (
    <form className="mb-4 space-y-3" onSubmit={handleSubmit}>
      <input
        type="text"
        className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:border-blue-400"
        value={todoTitle}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setTodoTitle(e.target.value)
        }
      />
      <button className="w-full px-4 py-2 text-white bg-blue-500 rounded transform hover:bg-blue-400 hover:scale-95 duration-200">
        Add Task
      </button>
    </form>
  );
};
