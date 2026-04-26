import { Checkbox, Button } from '@fluentui/react-components';
import { DeleteRegular } from '@fluentui/react-icons';

export default function TodoItem({ todo, onToggle, onDelete }) {
  return (
    <div>
      <Checkbox
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
        label={
          <span
            style={{
              textDecoration: todo.completed ? 'line-through' : 'none',
            }}
          >
            {todo.text}
          </span>
        }
      />
      <Button
        appearance="subtle"
        icon={<DeleteRegular />}
        aria-label="Delete todo"
        onClick={() => onDelete(todo.id)}
      />
    </div>
  );
}
