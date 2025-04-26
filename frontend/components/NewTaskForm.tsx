'use client';

import { FC, useState } from 'react';

interface NewTaskFormProps {
  onCreate: (title: string) => void;
}

const NewTaskForm: FC<NewTaskFormProps> = ({ onCreate }) => {
  const [newTask, setNewTask] = useState<string>('');

  const handleSubmit = () => {
    if (newTask.trim()) {
      onCreate(newTask);
      setNewTask('');
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Nova tarefa"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
      />
      <button onClick={handleSubmit}>Criar Tarefa</button>
    </div>
  );
};

export default NewTaskForm;
