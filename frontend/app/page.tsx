'use client';
import { useState, useEffect } from 'react';
import supabase from '../app/lib/supabaseClient';
import TaskList from '../components/TaskList';
import NewTaskForm from '../components/NewTaskForm';
import { Task } from '../types/types';

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  // Função para buscar tarefas
  const fetchTasks = async () => {
    try {
      const { data, error } = await supabase.from('tasks').select('*');
      if (error) {
        throw error;
      }
      setTasks(data || []);
    } catch (error) {
      console.error('Erro ao buscar tarefas:', error);
    }
  };

  // Função para criar uma nova tarefa
  const createTask = async (title: string) => {
    try {
      const { error } = await supabase.from('tasks').insert({ title });
      if (error) {
        throw error;
      }
      fetchTasks(); // Atualiza a lista após criar
    } catch (error) {
      console.error('Erro ao criar tarefa:', error);
    }
  };

  // Função para alternar o status de uma tarefa
  const toggleTask = async (id: number) => {
    try {
      const { error } = await supabase
        .from('tasks')
        .update({ completed: true }) // Exemplo: atualiza o campo "completed"
        .eq('id', id);
      if (error) {
        throw error;
      }
      fetchTasks(); // Atualiza a lista após alternar o status
    } catch (error) {
      console.error('Erro ao alternar status da tarefa:', error);
    }
  };

  useEffect(() => {
    fetchTasks(); // Busca as tarefas ao carregar a página
  }, []);

  return (
    <div>
      <h1>Tarefas</h1>
      <NewTaskForm onCreate={createTask} />
      <TaskList tasks={tasks} onToggle={toggleTask} />
    </div>
  );
}
