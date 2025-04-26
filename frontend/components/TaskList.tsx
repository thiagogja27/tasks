import { FC } from 'react';
import TaskItem from './TaskItem';
import { Task } from '../types/types'; // Importe do arquivo centralizado

interface TaskListProps {
  tasks: Task[];
  onToggle: (id: number) => void;
}

const TaskList: FC<TaskListProps> = ({ tasks, onToggle }) => {
  return (
    <ul>
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          id={task.id}
          title={task.title}
          completed={task.completed}
          onToggle={() => onToggle(task.id)}
        />
      ))}
    </ul>
  );
};

export default TaskList;