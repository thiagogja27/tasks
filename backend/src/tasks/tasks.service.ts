import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private taskRepo: Repository<Task>,
  ) {}

  getAll(): Promise<Task[]> {
    return this.taskRepo.find();
  }

  create(title: string): Promise<Task> {
    const newTask = this.taskRepo.create({ title } as Partial<Task>);
    return this.taskRepo.save(newTask);
  }

  async toggle(id: number): Promise<Task> {
    const task = await this.taskRepo.findOneBy({ id });

    if (!task) {
      throw new NotFoundException(`Task com id ${id} não encontrada`);
    }

    task.completed = !task.completed;
    return this.taskRepo.save(task);
  }
}
