import AuthService from '../auth.service';
import { Test, TestingModule } from '@nestjs/testing';
import UserService from '../../user/user.service';
import { JwtService } from '@nestjs/jwt';
import loginMock from '../__mocks__/loginMock';
import { NotFoundException } from '@nestjs/common';
import userEntityMock from '../../user/__mocks__/userEntityMock';
import jwtMock from '../__mocks__/jwtMock';

describe('AuthService', () => {
  let service: AuthService;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UserService,
          useValue: {
            findOne: jest.fn().mockResolvedValue(userEntityMock),
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign: () => jwtMock,
          },
        },
      ],
    }).compile();
    service = module.get(AuthService);
    userService = module.get(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(userService).toBeDefined();
  });

  it('should throw an error if email is invalid', async () => {
    jest.spyOn(userService, 'findOne').mockResolvedValueOnce(undefined);

    await expect(
      service.login({ ...loginMock, email: 'invalidEmail' }),
    ).rejects.toThrow(NotFoundException);
  });

  it('should throw an error if password is different', async () => {
    await expect(
      service.login({ ...loginMock, password: 'pass' }),
    ).rejects.toThrow(NotFoundException);
  });

  it('should return user access token if user exists and password is equal', async () => {
    const accessToken = (await service.login(loginMock)).token;

    expect(accessToken).toEqual(jwtMock);
  });
});
