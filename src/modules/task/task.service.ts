import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import TaskEntity, { TaskState } from './entities/task.entity';
import CreateTaskDto from './dtos/createTaskDto';
import { InjectRepository } from '@nestjs/typeorm';
import UserEntity from '../user/entities/user.entity';
import UpdateTaskDto from './dtos/updateTaskDto';

@Injectable()
class TaskService {
  constructor(
    @InjectRepository(TaskEntity)
    private readonly repository: Repository<TaskEntity>,
  ) {}

  async insert(newTask: CreateTaskDto, user: UserEntity) {
    const entityToInsert = this.repository.create();
    entityToInsert.title = newTask.title;
    entityToInsert.description = newTask.description;
    entityToInsert.state = TaskState.OPENED;
    entityToInsert.authorId = user.id;
    entityToInsert.date = newTask.date;

    const insertedEntity = await this.repository.save(entityToInsert);
    return insertedEntity;
  }

  async findOne(id: string) {
    const entity = await this.repository.findOne({ where: { id } });
    if (!entity) throw new NotFoundException('Não encontrado.');
    return entity;
  }

  async findAllByAuthorId(authorId: string) {
    const allTasks = await this.repository.find({
      where: { authorId },
      relations: { author: true },
    });
    return allTasks;
  }

  async update(
    currentUser: UserEntity,
    updatedTask: Partial<UpdateTaskDto>,
    id: string,
  ) {
    const entityToUpdate = await this.findOne(id);
    if (currentUser.id !== entityToUpdate.authorId)
      throw new UnauthorizedException(
        'Essa tarefa não pertence ao usuário logado.',
      );

    entityToUpdate.title = updatedTask.title || entityToUpdate.title;
    entityToUpdate.description =
      updatedTask.description || entityToUpdate.description;
    entityToUpdate.state = updatedTask.state || entityToUpdate.state;

    const updatedEntity = await this.repository.save(entityToUpdate);
    return updatedEntity;
  }

  async delete(currentUser: UserEntity, id: string) {
    const entityToDelete = await this.findOne(id);
    if (currentUser.id !== entityToDelete.authorId)
      throw new UnauthorizedException(
        'Essa tarefa não pertence ao usuário logado.',
      );
    await this.repository.softDelete(id);
  }
}

export default TaskService;
