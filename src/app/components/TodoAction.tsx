"use client";
import { useEffect, useRef, useState } from "react";
import { Todo } from "../types";
import { deleteTodo, editTodo } from "../api";

interface TodoProps {
  todo: Todo;
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

export const TodoAction = ({ todo, setTodos }: TodoProps) => {
  const ref = useRef<HTMLInputElement>(null);

  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);

  useEffect(() => {
    if(isEditing) {
      ref.current?.focus();
    }
  })

  const handleEdit = async () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      await editTodo(todo.id, editTitle);
      setTodos((prevTodos) =>
        prevTodos.map((t) => (t.id === todo.id ? { ...t, title: editTitle } : t))
      );
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to edit todo:", error);
      alert("タスクの編集に失敗しました。もう一度お試しください。");
    }
  };

  const handleDelete = async () => {
    try {
      await deleteTodo(todo.id);
      setTodos((prevTodos) => prevTodos.filter((t) => t.id !== todo.id));
    } catch (error) {
      console.error("Failed to delete todo:", error);
      alert("タスクの削除に失敗しました。もう一度お試しください。");
    }
  }

  return (
    <li
      key={todo.id}
      className="flex justify-between p-4 bg-white border-l-4 border-blue-500 rounded shadow"
    >
      {isEditing ? (
        <input
          ref={ref}
          type="text"
          className="mr-2 py-1 px-2 rounded border-gray-400"
          value={editTitle}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setEditTitle(e.target.value);
          }}
        />
      ) : (
        <span>{todo.title}</span>
      )}
      <div>
        {isEditing ? (
          <button className="text-blue-500 mr-3" onClick={handleSave}>
            save
          </button>
        ) : (
          <button className="text-green-500 mr-3" onClick={handleEdit}>
            edit
          </button>
        )}
        <button className="text-red-500" onClick={handleDelete}>delete</button>
      </div>
    </li>
  );
};
