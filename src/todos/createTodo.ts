import { Todo } from './types';

let counter = 0;

function generateId(): string {
  counter += 1;
  return `${Date.now().toString(36)}-${counter.toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

export function createTodo(text: string): Todo {
  return {
    id: generateId(),
    text,
    completed: false,
  };
}
