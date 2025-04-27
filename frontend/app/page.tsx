'use client';
import { useState, useEffect } from 'react';
import { supabase } from '../app/lib/supabaseClient';
import TaskList from '../components/TaskList';
import NewTaskForm from '../components/NewTaskForm';
import { Task } from '../types/types';

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  // Função para buscar tarefas
  const fetchTasks = async () => {
    try {
      console.log('Tentando buscar tarefas...');
      const { data, error } = await supabase.from('task').select('*'); // Alterado para 'task'
      if (error) {
        console.error('Erro ao buscar tarefas:', error);
        throw error;
      }
      console.log('Tarefas buscadas com sucesso:', data);
      setTasks(data || []);
    } catch (error) {
      console.error('Erro ao buscar tarefas:', error);
    }
  };

  // Função para criar uma nova tarefa
  const createTask = async (title: string) => {
    try {
      console.log('Tentando criar uma nova tarefa com título:', title);
      const { error } = await supabase.from('task').insert({ title }); // Alterado para 'task'
      if (error) {
        console.error('Erro ao criar tarefa:', error);
        throw error;
      }
      console.log('Tarefa criada com sucesso!');
      fetchTasks(); // Atualiza a lista após criar
    } catch (error) {
      console.error('Erro ao criar tarefa:', error);
    }
  };

  // Função para alternar o status de uma tarefa
  const toggleTask = async (id: number) => {
    try {
      console.log('Tentando alternar status da tarefa com id:', id);
      const { error } = await supabase
        .from('task') // Alterado para 'task'
        .update({ completed: true })
        .eq('id', id);
      if (error) {
        console.error('Erro ao alternar status da tarefa:', error);
        throw error;
      }
      console.log('Status da tarefa alternado com sucesso!');
      fetchTasks(); // Atualiza a lista após alternar o status
    } catch (error) {
      console.error('Erro ao alternar status da tarefa:', error);
    }
  };

  useEffect(() => {
    console.log('Componente carregado, buscando tarefas...');
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