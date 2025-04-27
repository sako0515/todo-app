"use client";
import { useEffect, useState } from "react";
import { getAllTodos } from "./api";
import { AddTask } from "./components/AddTask";
import { TodoList } from "./components/TodoList";
import { Todo } from "./types";

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const todos = await getAllTodos();
        setTodos(todos);
      } catch (error) {
        console.error("Failed to fetch todos:", error);
        alert("タスクの取得に失敗しました。後でもう一度お試しください。");
      }
    };
    fetchTodos();
  }, []);

  return (
    <main className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-200">
      <h1 className="text-4xl font-bold text-gray-700 -mt-32">Todo App</h1>
      <div className="w-full max-w-xl mt-5">
        <div className="w-full px-8 py-6 bg-white shadow-md rounded-lg">
          <AddTask setTodos={setTodos} />
          <TodoList todos={todos} setTodos={setTodos} />
        </div>
      </div>
    </main>
  );
}
