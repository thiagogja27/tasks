import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { TasksService } from '../src/app.service';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  findAll() {
    return this.tasksService.findAll();
  }

  @Post()
  create(@Body() body: { title: string }) {
    return this.tasksService.create(body.title);
  }

  @Post(':id/toggle')
  toggle(@Param('id') id: string) {
    return this.tasksService.toggle(Number(id));
  }
}
