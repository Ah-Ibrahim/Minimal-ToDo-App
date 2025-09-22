import type { TodoBody, TodoType } from '../types/GlobalTypes';

interface TodoProps {
  todo: TodoType;
  onChange: (id: string, changedTodo: TodoBody) => void;
}

function Todo({ todo, onChange }: TodoProps) {
  // const [todoText, setTodoText] = useState<string>('');

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
  return (
    <div className="border flex items-center p-4 rounded-lg border-gray-500 gap-x-3">
      <input
        className="accent-secondary"
        type="checkbox"
        checked={todo.isCompleted}
        name=""
        onChange={handleCheckChange}
        id=""
      />
      <input type="text" value={todo.text} onChange={handleInputChange} />
    </div>
  );
}
export default Todo;
