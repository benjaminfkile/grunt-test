import { useCallback } from 'react';
import useLocalStorage from './useLocalStorage';
import { createTodo } from '../todos/createTodo';

const STORAGE_KEY = 'grunt-todos';

export default function useTodos() {
  const [todos, setTodos] = useLocalStorage(STORAGE_KEY, []);

  const addTodo = useCallback(
    (text) => {
      setTodos((current) => [...current, createTodo(text)]);
    },
    [setTodos],
  );

  const toggleTodo = useCallback(
    (id) => {
      setTodos((current) =>
        current.map((todo) =>
          todo.id === id ? { ...todo, completed: !todo.completed } : todo,
        ),
      );
    },
    [setTodos],
  );

  const deleteTodo = useCallback(
    (id) => {
      setTodos((current) => current.filter((todo) => todo.id !== id));
    },
    [setTodos],
  );

  const clearCompleted = useCallback(() => {
    setTodos((current) => current.filter((todo) => !todo.completed));
  }, [setTodos]);

  return { todos, addTodo, toggleTodo, deleteTodo, clearCompleted };
}
