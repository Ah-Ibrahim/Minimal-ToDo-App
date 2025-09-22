import Todo from '../components/Todo';
import { useEffect, useState } from 'react';
import type { TodoType, TodoBody, ShownStatusType } from '../types/GlobalTypes';
import { nanoid } from 'nanoid';
import {
  initializeTodos,
  isValidInput,
  saveTodos,
  todosFilter,
} from '../utils/MainPageUtils';
import { AnimatePresence } from 'motion/react';

import { motion } from 'motion/react';
function MainPage() {
  const [todos, setTodos] = useState<TodoType[]>(() => initializeTodos());

  const [shownStatus, setIsShownStatus] = useState<ShownStatusType>('all');
  const [newTodoText, setNewTask] = useState<string>('');

  const filterFunc = todosFilter[shownStatus];
  const filteredTodos: TodoType[] = todos.filter(filterFunc);

  const handleChangeTodo = (id: string, changedTodo: TodoBody) => {
    setTodos(
      todos.map((item: TodoType) => {
        if (item.id !== id) return item;

        return {
          id,
          text: changedTodo.text,
          isCompleted: changedTodo.isCompleted,
        };
      }) ?? [],
    );
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTask(e.target.value);
  };

  const addNewTask = (todoBody: TodoBody) => {
    setTodos([
      ...todos,
      {
        ...todoBody,
        id: nanoid(),
      },
    ]);
  };

  const deleteTask = (todoId: string) => {
    setTodos(todos.filter((item) => item.id !== todoId));
  };

  const handleNewTodo = () => {
    if (!isValidInput(newTodoText)) {
      return;
    }

    addNewTask({
      text: newTodoText,
      isCompleted: false,
    });

    setNewTask('');
  };

  const handleNewClick = handleNewTodo;

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        handleNewTodo();
      } else if (e.key === 'Escape') {
        setNewTask('');
      }
    };

    document.addEventListener('keydown', handler);

    return () => document.removeEventListener('keydown', handler);
  });

  useEffect(() => {
    saveTodos(todos);
  }, [todos]);

  const todoItems = filteredTodos.map((item) => (
    <Todo
      key={item.id}
      todo={item}
      onChange={handleChangeTodo}
      onDelete={deleteTask}
    />
  ));

  return (
    <section className="flex h-full flex-col p-8">
      <h1 className="mb-4 text-3xl font-semibold">Active Tasks</h1>
      <div className="mb-8 flex gap-x-4">
        <button
          className={`${
            shownStatus !== 'all' ? 'text-gray-500' : ''
          } transition-colors`}
          disabled={shownStatus === 'all'}
          onClick={() => setIsShownStatus('all')}
        >
          All
        </button>
        <button
          className={`${
            shownStatus !== 'completed' ? 'text-gray-500' : ''
          } transition-colors`}
          disabled={shownStatus === 'completed'}
          onClick={() => setIsShownStatus('completed')}
        >
          Completed
        </button>
        <button
          className={`${
            shownStatus !== 'uncompleted' ? 'text-gray-500' : ''
          } transition-colors`}
          disabled={shownStatus === 'uncompleted'}
          onClick={() => setIsShownStatus('uncompleted')}
        >
          Uncompleted
        </button>
      </div>
      <motion.div className="space-y-4 overflow-y-scroll py-4">
        <AnimatePresence>{todoItems}</AnimatePresence>
      </motion.div>
      <div className="mx-auto mt-auto flex w-full max-w-6xl justify-between gap-x-4">
        <input
          type="text"
          value={newTodoText}
          onChange={handleInputChange}
          className={`flex-1 rounded-lg border p-2 outline-0 transition-colors ${
            isValidInput(newTodoText) ? 'border-primary' : 'border-gray-500'
          }`}
          placeholder="Enter new task"
        />
        <button
          className={`aspect-square w-8 transition-colors ${
            isValidInput(newTodoText)
              ? 'text-secondary drop-shadow-[0_0_6px_currentColor]'
              : 'text-gray-500'
          }`}
          disabled={!isValidInput(newTodoText)}
          onClick={handleNewClick}
        >
          <svg
            className=""
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M11 11V5H13V11H19V13H13V19H11V13H5V11H11Z"></path>
          </svg>
        </button>
      </div>
    </section>
  );
}
export default MainPage;
