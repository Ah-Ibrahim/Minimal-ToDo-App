import { useState } from 'react';

type ShownStatusType = 'all' | 'completed' | 'uncompleted';

function MainPage() {
  const [shownStatus, setIsShownStatus] = useState<ShownStatusType>('all');
  const [newTask, setNewTask] = useState<string>('');
  const [isValidNewTask, setIsValidNewTask] = useState<boolean>(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTask(e.target.value);

    setIsValidNewTask(isValidInput(e.target.value));
  };

  return (
    <section className="p-8 relative h-full">
      <h1 className="text-3xl mb-4 font-semibold">Active Tasks</h1>
      <div className="flex gap-x-4">
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
      <div className="absolute flex bottom-0 left-0 right-0 p-8 justify-between gap-x-4">
        <input
          type="text"
          value={newTask}
          onChange={handleInputChange}
          className={`border outline-0 p-2 rounded-lg  flex-1 transition-colors ${
            isValidNewTask ? 'border-primary' : 'border-gray-500'
          }`}
          placeholder="Enter new task"
        />
        <button
          className={`w-8 aspect-square transition-colors ${
            isValidNewTask ? 'text-primary' : 'text-gray-500'
          }`}
        >
          <svg
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
