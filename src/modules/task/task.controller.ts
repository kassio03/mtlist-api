import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import TaskService from './task.service';
import CreateTaskDto from './dtos/createTaskDto';
import successBody from '../../common/utils/successBody';
import JwtGuard from '../auth/jwt.guard';
import CurrentUser from '../auth/decorators/currentUser.decorator';
import UserEntity from '../user/entities/user.entity';
import UpdateTaskDto from './dtos/updateTaskDto';

@Controller('task')
class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @UseGuards(JwtGuard)
  @Post()
  async createTask(
    @Body() body: CreateTaskDto,
    @CurrentUser() user: UserEntity,
  ) {
    const task = await this.taskService.insert(body, user);
    return successBody(201, task);
  }

  @UseGuards(JwtGuard)
  @Get()
  async findAll(@CurrentUser() user: UserEntity) {
    const allTasks = await this.taskService.findAllByAuthorId(user.id);
    return successBody(200, allTasks);
  }

  @UseGuards(JwtGuard)
  @Patch(':id')
  async updateTask(
    @CurrentUser() user: UserEntity,
    @Body() body: UpdateTaskDto,
    @Param('id') id: string,
  ) {
    const updatedTask = await this.taskService.update(user, body, id);
    return successBody(200, updatedTask);
  }

  @UseGuards(JwtGuard)
  @Delete(':id')
  async deleteTask(@CurrentUser() user: UserEntity, @Param('id') id: string) {
    await this.taskService.delete(user, id);
    return successBody(204, { message: 'Tarefa deletada.' });
  }
}

export default TaskController;
