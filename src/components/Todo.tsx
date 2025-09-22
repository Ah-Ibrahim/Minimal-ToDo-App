import type { TodoBody, TodoType } from '../types/GlobalTypes';

interface TodoProps {
  todo: TodoType;
  onChange: (id: string, changedTodo: TodoBody) => void;
  onDelete: (id: string) => void;
}

function Todo({ todo, onChange, onDelete }: TodoProps) {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(todo.id, {
      text: e.target.value,
      isCompleted: todo.isCompleted,
    });
  };
  const handleCheckChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(todo.id, {
      text: todo.text,
      isCompleted: e.currentTarget.checked,
    });
  };

  const handleDeleteClick = () => {
    onDelete(todo.id);
  };

  return (
    <div className="border flex items-center p-4 rounded-lg border-gray-500 gap-x-3">
      <input
        className="accent-secondary cursor-pointer"
        type="checkbox"
        checked={todo.isCompleted}
        name=""
        onChange={handleCheckChange}
        id=""
      />
      <input
        className="flex-1 outline-secondary"
        type="text"
        value={todo.text}
        onChange={handleInputChange}
      />
      <button
        className="text-primary w-4 aspect-square transition-colors hover:text-[#D90368]"
        onClick={handleDeleteClick}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M11.9997 10.5865L16.9495 5.63672L18.3637 7.05093L13.4139 12.0007L18.3637 16.9504L16.9495 18.3646L11.9997 13.4149L7.04996 18.3646L5.63574 16.9504L10.5855 12.0007L5.63574 7.05093L7.04996 5.63672L11.9997 10.5865Z"></path>
        </svg>
      </button>
    </div>
  );
}
export default Todo;
