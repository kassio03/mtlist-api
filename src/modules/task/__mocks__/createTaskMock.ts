import CreateTaskDto from '../dtos/createTaskDto';

const createTaskMock: CreateTaskDto = {
  title: 'Task title',
  description: 'Task description',
  date: new Date().toISOString(),
};

export default createTaskMock;
