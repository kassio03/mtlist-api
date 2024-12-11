import UserEntity from '../entities/user.entity';

const userEntityMock: UserEntity = {
  id: '8b5f291c-0f8d-45dd-96e9-ac1643b7e9ab',
  name: 'Jhon',
  password: '$2a$10$0tu..4AnXJIvD9HzzE5xdOfsFOXQZY3.bMPXQh2lbo4.r7aEmEHsq',
  email: 'jhon@gmail.com',
  tasks: [],
  createdAt: new Date(),
  updatedAt: new Date(),
  deletedAt: null,
};

export default userEntityMock;
