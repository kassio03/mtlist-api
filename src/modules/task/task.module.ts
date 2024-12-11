import { Module } from '@nestjs/common';
import TaskController from './task.controller';
import TaskEntity from './entities/task.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import TaskService from './task.service';

@Module({
  imports: [TypeOrmModule.forFeature([TaskEntity])],
  controllers: [TaskController],
  providers: [TaskService],
})
export default class TaskModule {}
