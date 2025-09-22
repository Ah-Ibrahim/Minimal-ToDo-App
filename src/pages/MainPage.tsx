import Todo from '../components/Todo';
import { useEffect, useState } from 'react';
import type { TodoType, TodoBody } from '../types/GlobalTypes';
import { nanoid } from 'nanoid';

type ShownStatusType = 'all' | 'completed' | 'uncompleted';

const initialTodos: TodoType[] = [
  {
    id: nanoid(),
    text: 'Add more content',
    isCompleted: false,
  },
  {
    id: nanoid(),
    text: 'Make this Project',
    isCompleted: true,
  },
];

const todosFilter: Record<ShownStatusType, (item: TodoType) => boolean> = {
  all: () => true,
  completed: (item) => item.isCompleted === true,
  uncompleted: (item) => item.isCompleted === false,
};

function MainPage() {
  const [todos, setTodos] = useState<TodoType[]>(initialTodos);

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
      }) ?? []
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

  const todoItems = filteredTodos.map((item) => (
    <Todo
      key={item.id}
      todo={item}
      onChange={handleChangeTodo}
      onDelete={deleteTask}
    />
  ));

  return (
    <section className="p-8 h-full flex flex-col">
      <h1 className="text-3xl mb-4 font-semibold">Active Tasks</h1>
      <div className="flex gap-x-4 mb-8">
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
      <div className="space-y-4 overflow-y-scroll">{todoItems}</div>
      <div className="flex justify-between gap-x-4 mt-auto w-full max-w-6xl mx-auto">
        <input
          type="text"
          value={newTodoText}
          onChange={handleInputChange}
          className={`border outline-0 p-2 rounded-lg  flex-1 transition-colors ${
            isValidInput(newTodoText) ? 'border-primary' : 'border-gray-500'
          }`}
          placeholder="Enter new task"
        />
        <button
          className={` w-8 aspect-square transition-colors ${
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

function isValidInput(str: string): boolean {
  return str.trim().length > 0;
}
