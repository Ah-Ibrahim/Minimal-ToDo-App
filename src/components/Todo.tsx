import type { TodoBody, TodoType } from '../types/GlobalTypes';
import { motion } from 'motion/react';

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
    <motion.div
      className="flex items-center gap-x-3 rounded-lg border border-gray-500 p-4"
      initial={{
        opacity: 0,
        y: 50,
      }}
      animate={{
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.35,
          type: 'spring',
          stiffness: 120,
        },
      }}
      exit={{
        opacity: 0,
        transition: {
          duration: 0.35,
        },
      }}
      layout
      // layoutRoot
      transition={{
        duration: 0.35,
      }}
    >
      <input
        className="accent-secondary cursor-pointer"
        type="checkbox"
        checked={todo.isCompleted}
        name=""
        onChange={handleCheckChange}
        id=""
      />
      <input
        className={`outline-secondary flex-1 ${todo.isCompleted ? 'text-gray-500 line-through' : ''}`}
        type="text"
        value={todo.text}
        onChange={handleInputChange}
      />
      <button
        className="text-primary aspect-square w-4 transition-colors hover:text-[#D90368]"
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
    </motion.div>
  );
}
export default Todo;
