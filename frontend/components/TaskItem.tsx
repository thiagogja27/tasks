import { FC } from 'react';

interface Task {
  id: number;
  title: string;
  completed: boolean;
  onToggle: () => void;
}

const TaskItem: FC<Task> = ({ id, title, completed, onToggle }) => {
  return (
    <li>
      <span style={{ textDecoration: completed ? 'line-through' : '' }}>
        {title}
      </span>
      <button onClick={onToggle}>
        {completed ? 'Marcar como Incompleta' : 'Marcar como Completa'}
      </button>
    </li>
  );
};

export default TaskItem;
