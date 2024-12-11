import { Test, TestingModule } from '@nestjs/testing';
import UserController from '../user.controller';
import UserService from '../user.service';
import userEntityMock from '../__mocks__/userEntityMock';

describe('UserController', () => {
  let controller: UserController;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: UserService,
          useValue: {
            insert: jest.fn().mockResolvedValue(userEntityMock),
          },
        },
      ],
      controllers: [UserController],
    }).compile();
    controller = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(userService).toBeDefined();
  });

  it('should return user entity without password in insert', async () => {
    const user = (await controller.createUser(userEntityMock)).body;

    expect(user).toEqual(userEntityMock);
  });
});
