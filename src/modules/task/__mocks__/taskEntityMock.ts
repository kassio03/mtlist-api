import TaskEntity, { TaskState } from '../entities/task.entity';

const taskEntityMock: TaskEntity = {
  id: '65914f58-190e-4dc7-8627-132ff97ec2cb',
  title: 'Task title',
  description: 'Task description',
  state: TaskState.OPENED,
  date: new Date().toISOString(),
  authorId: '8b5f291c-0f8d-45dd-96e9-ac1643b7e9ab',
  author: {
    id: '8b5f291c-0f8d-45dd-96e9-ac1643b7e9ab',
    name: 'Jhon',
    password: '$2a$10$0tu..4AnXJIvD9HzzE5xdOfsFOXQZY3.bMPXQh2lbo4.r7aEmEHsq',
    email: 'jhon@gmail.com',
    tasks: [],
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null,
  },
  createdAt: new Date(),
  updatedAt: new Date(),
  deletedAt: null,
};

export default taskEntityMock;
