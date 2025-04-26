import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from '../src/tasks/task.entity'; // ou o caminho correto da sua entidade

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
  ) {}

  async create(title: string) {
    const task = this.taskRepository.create({ title, completed: false });
    return this.taskRepository.save(task);
  }

  async findAll() {
    return this.taskRepository.find();
  }

  async toggle(id: number) {
    const task = await this.taskRepository.findOneBy({ id });
    if (!task) return null;
    task.completed = !task.completed;
    return this.taskRepository.save(task);
  }
}
