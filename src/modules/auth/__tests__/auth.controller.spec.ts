import { Test, TestingModule } from '@nestjs/testing';
import AuthController from '../auth.controller';
import AuthService from '../auth.service';
import loginMock from '../__mocks__/loginMock';
import jwtMock from '../__mocks__/jwtMock';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: AuthService,
          useValue: {
            login: jest.fn().mockResolvedValue(jwtMock),
          },
        },
      ],
      controllers: [AuthController],
    }).compile();
    controller = module.get(AuthController);
    authService = module.get(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(authService).toBeDefined();
  });

  it('should return user accessToken', async () => {
    const accessToken = (await controller.login(loginMock)).body;

    expect(accessToken).toEqual(jwtMock);
  });
});
