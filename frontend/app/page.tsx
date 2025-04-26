'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import TaskList from '../components/TaskList';
import NewTaskForm from '../components/NewTaskForm';
import { Task } from '../types/types'; // Importação correta


export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://localhost:3000/tasks');
      setTasks(response.data);
    } catch (error) {
      console.error('Erro ao buscar tarefas:', error);
    }
  };

  const createTask = async (title: string) => {
    try {
      await axios.post('http://localhost:3000/tasks', { title });
      fetchTasks();
    } catch (error) {
      console.error('Erro ao criar tarefa:', error);
    }
  };

  const toggleTask = async (id: number) => {
    try {
      await axios.post(`http://localhost:3000/tasks/${id}/toggle`);
      fetchTasks();
    } catch (error) {
      console.error('Erro ao alternar o status da tarefa:', error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div>
      <h1>Tarefas</h1>
      <NewTaskForm onCreate={createTask} />
      <TaskList tasks={tasks} onToggle={toggleTask} />
    </div>
  );
}