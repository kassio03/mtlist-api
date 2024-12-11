import { Repository } from 'typeorm';
import UserService from '../user.service';
import UserEntity from '../entities/user.entity';
import { Test, TestingModule } from '@nestjs/testing';
import userEntityMock from '../__mocks__/userEntityMock';
import createUserMock from '../__mocks__/createUserMock';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('UserService', () => {
  let service: UserService;
  let userRepository: Repository<UserEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(UserEntity),
          useValue: {
            findOne: jest.fn().mockResolvedValue(userEntityMock),
            save: jest.fn().mockResolvedValue(userEntityMock),
            create: jest.fn().mockResolvedValue({}),
            insert: jest.fn().mockResolvedValue(userEntityMock),
          },
        },
      ],
    }).compile();
    service = module.get(UserService);
    userRepository = module.get(getRepositoryToken(UserEntity));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(userRepository).toBeDefined();
  });

  it('should throw an error if email is already registered', async () => {
    await expect(service.insert(createUserMock)).rejects.toThrow(
      BadRequestException,
    );
  });

  it('should return user if created', async () => {
    jest.spyOn(userRepository, 'findOne').mockResolvedValueOnce(undefined);

    const user = await service.insert(createUserMock);
    expect(user).toEqual(userEntityMock);
  });

  /* integration */
  it('should hash the password before save', async () => {
    jest.spyOn(userRepository, 'findOne').mockResolvedValueOnce(undefined);

    await service.insert(createUserMock);
    expect(userRepository.save).toHaveBeenCalledWith(
      expect.not.objectContaining({ password: createUserMock.password }),
    );
  });

  it('should throw an error if user not found', async () => {
    jest.spyOn(userRepository, 'findOne').mockResolvedValueOnce(undefined);

    await expect(service.findOne({ email: 'invalidEmail' })).rejects.toThrow(
      NotFoundException,
    );
  });

  it('should return user if found', async () => {
    jest.spyOn(userRepository, 'findOne');

    expect(await service.findOne({ email: createUserMock.email })).toEqual(
      userEntityMock,
    );
  });
});
