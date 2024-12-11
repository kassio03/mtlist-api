import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import UserEntity from './entities/user.entity';
import { Repository } from 'typeorm';
import CreateUserDto from './dtos/createUser.dto';
import { hash } from 'bcrypt';

@Injectable()
class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly repository: Repository<UserEntity>,
  ) {}
  async insert(newUser: CreateUserDto) {
    const emailAlreadyExists = await this.repository.findOne({
      where: { email: newUser.email },
    });
    if (emailAlreadyExists) {
      throw new BadRequestException('Email já registrado.');
    }

    const hashedPassword = await hash(newUser.password, 10);
    const entityToInsert = this.repository.create();
    entityToInsert.name = newUser.name;
    entityToInsert.email = newUser.email;
    entityToInsert.password = hashedPassword;

    const insertedEntity = await this.repository.save(entityToInsert);
    return insertedEntity;
  }

  async findOne(data: Partial<UserEntity>) {
    const entity = await this.repository.findOne({
      where: data,
    });
    if (!entity) throw new NotFoundException('Não encontrado.');
    return entity;
  }
}

export default UserService;
