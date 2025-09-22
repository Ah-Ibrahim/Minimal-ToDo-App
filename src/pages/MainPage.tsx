import Todo from '../components/Todo';
import { useState } from 'react';
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
  const [isValidNewTask, setIsValidNewTask] = useState<boolean>(false);

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

    setIsValidNewTask(isValidInput(e.target.value));
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

  const handleNewClick = () => {
    if (!isValidNewTask) {
      return;
    }

    addNewTask({
      text: newTodoText,
      isCompleted: false,
    });
    setNewTask('');
    setIsValidNewTask(false);
  };

  const todoItems = filteredTodos.map((item) => (
    <Todo key={item.id} todo={item} onChange={handleChangeTodo} />
  ));

  return (
    <section className="p-8 relative h-full">
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
      <div className="space-y-4">{todoItems}</div>
      <div className="absolute flex bottom-0 left-0 right-0 m-8 justify-between gap-x-4">
        <input
          type="text"
          value={newTodoText}
          onChange={handleInputChange}
          className={`border outline-0 p-2 rounded-lg  flex-1 transition-colors ${
            isValidNewTask ? 'border-primary' : 'border-gray-500'
          }`}
          placeholder="Enter new task"
        />
        <button
          className={` w-8 aspect-square transition-colors ${
            isValidNewTask
              ? 'text-secondary drop-shadow-[0_0_6px_currentColor]'
              : 'text-gray-500'
          }`}
          disabled={!isValidNewTask}
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
