import { Test, TestingModule } from '@nestjs/testing';
import TaskController from '../task.controller';
import TaskService from '../task.service';
import createTaskMock from '../__mocks__/createTaskMock';
import taskEntityMock from '../__mocks__/taskEntityMock';
import updateTaskMock from '../__mocks__/updateTaskMock';

describe('TaskController', () => {
  let controller: TaskController;
  let taskService: TaskService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: TaskService,
          useValue: {
            insert: jest.fn().mockResolvedValue(taskEntityMock),
            findAllByAuthorId: jest.fn().mockResolvedValue([taskEntityMock]),
            update: jest.fn().mockResolvedValue(updateTaskMock),
            delete: jest.fn().mockResolvedValue(undefined),
          },
        },
      ],
      controllers: [TaskController],
    }).compile();

    controller = module.get(TaskController);
    taskService = module.get(TaskService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(taskService).toBeDefined();
  });

  it('should return the task created without author (user) password', async () => {
    const successBody = await controller.createTask(
      createTaskMock,
      taskEntityMock.author,
    );

    expect(successBody).toEqual({
      statusCode: 201,
      body: taskEntityMock,
    });
  });

  it('should return all tasks by user id', async () => {
    const successBody = await controller.findAll(taskEntityMock.author);
    expect(successBody).toEqual({
      statusCode: 200,
      body: [taskEntityMock],
    });
  });

  it('should return task updated', async () => {
    const successBody = await controller.updateTask(
      taskEntityMock.author,
      updateTaskMock,
      taskEntityMock.id,
    );
    expect(successBody).toEqual({
      statusCode: 200,
      body: updateTaskMock,
    });
  });

  it('should delete task', async () => {
    const successBody = await controller.deleteTask(
      taskEntityMock.author,
      taskEntityMock.id,
    );
    expect(successBody).toEqual({
      statusCode: 204,
      body: { message: 'Tarefa deletada.' },
    });
  });
});
