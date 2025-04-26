import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { Task } from './task.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Task])], // 👈 Isso é ESSENCIAL
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
