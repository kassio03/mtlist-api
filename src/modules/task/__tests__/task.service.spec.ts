import { Test, TestingModule } from '@nestjs/testing';
import TaskService from '../task.service';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import TaskEntity from '../entities/task.entity';
import createTaskMock from '../__mocks__/createTaskMock';
import taskEntityMock from '../__mocks__/taskEntityMock';
import { NotFoundException, UnauthorizedException } from '@nestjs/common';
import updateTaskMock from '../__mocks__/updateTaskMock';

describe('TaskService', () => {
  let service: TaskService;
  let repository: Repository<TaskEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TaskService,
        {
          provide: getRepositoryToken(TaskEntity),
          useValue: {
            create: jest.fn().mockResolvedValue({}),
            save: jest.fn().mockResolvedValue(taskEntityMock),
            findOne: jest.fn().mockResolvedValue(taskEntityMock),
            find: jest.fn().mockResolvedValue([taskEntityMock]),
          },
        },
      ],
    }).compile();

    service = module.get(TaskService);
    repository = module.get(getRepositoryToken(TaskEntity));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
  });

  it('should return the created task', async () => {
    const task = await service.insert(createTaskMock, taskEntityMock.author);
    expect(task).toEqual(taskEntityMock);
  });

  it('should return task if found in findOne (by id)', async () => {
    const spy = jest.spyOn(repository, 'findOne');
    const task = await service.findOne(taskEntityMock.id);
    expect(task).toEqual(taskEntityMock);
    expect(spy.mock.calls[0][0]).toEqual({
      where: { id: taskEntityMock.id },
    });
  });

  it('should throw an error if not found a task', async () => {
    jest.spyOn(repository, 'findOne').mockResolvedValueOnce(undefined);

    await expect(service.findOne('invalidId')).rejects.toThrow(
      NotFoundException,
    );
  });

  it('should find all tasks by author id using relations', async () => {
    const spy = jest.spyOn(repository, 'find');
    const tasks = await service.findAllByAuthorId(taskEntityMock.authorId);

    expect(tasks).toEqual([taskEntityMock]);
    expect(spy.mock.calls[0][0]).toEqual({
      where: { authorId: taskEntityMock.authorId },
      relations: { author: true },
    });
  });

  it('should not update if user is not task owner', async () => {
    await expect(
      service.update(
        { ...taskEntityMock.author, id: 'invalidUserId' },
        updateTaskMock,
        taskEntityMock.id,
      ),
    ).rejects.toThrow(UnauthorizedException);
  });

  it('should return the updated task', async () => {
    jest.spyOn(repository, 'save').mockResolvedValueOnce(updateTaskMock);
    const task = await service.update(
      taskEntityMock.author,
      updateTaskMock,
      taskEntityMock.id,
    );

    expect(task).toEqual(updateTaskMock);
  });

  it('should not delete if user is not task owner', async () => {
    await expect(
      service.delete(
        { ...taskEntityMock.author, id: 'invalidId' },
        taskEntityMock.id,
      ),
    ).rejects.toThrow(UnauthorizedException);
  });
});
