"use client";
import { ChangeEvent, FormEvent, useState } from "react";
import { addTodo } from "../api";

export const AddTask = () => {
  const [todoTitle, setTodoTitle] = useState<string>("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await addTodo({ id: Date.now(), title: todoTitle });
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
