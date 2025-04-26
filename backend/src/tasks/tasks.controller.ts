import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.entity';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  getAll(): Promise<Task[]> {
    return this.tasksService.getAll();
  }

  @Post()
  create(@Body('title') title: string): Promise<Task> {
    return this.tasksService.create(title);
  }

  @Post(':id/toggle')
  toggle(@Param('id') id: number): Promise<Task> {
    return this.tasksService.toggle(Number(id));
  }
}
