import type { TodoType, TodoBody, ShownStatusType } from '../types/GlobalTypes';
import { nanoid } from 'nanoid';

export const todosFilter: Record<ShownStatusType, (item: TodoType) => boolean> =
  {
    all: () => true,
    completed: (item) => item.isCompleted === true,
    uncompleted: (item) => item.isCompleted === false,
  };

export function initializeTodos(): TodoType[] {
  const todosBodies: TodoBody[] = JSON.parse(
    localStorage.getItem('Todos') ?? '[]',
  );

  const todos: TodoType[] = todosBodies.map((todoBody) => ({
    ...todoBody,
    id: nanoid(),
  }));

  return todos;
}

export function saveTodos(todos: TodoType[]): void {
  const todosBodies: TodoBody[] = todos.map((todo) => ({
    ...todo,
    id: undefined,
  }));

  localStorage.setItem('Todos', JSON.stringify(todosBodies));
}

export function isValidInput(str: string): boolean {
  return str.trim().length > 0;
}
