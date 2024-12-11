import { Body, Controller, Post } from '@nestjs/common';
import UserService from './user.service';
import CreateUserDto from './dtos/createUser.dto';
import successBody from '../../common/utils/successBody';

@Controller('user')
class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(@Body() body: CreateUserDto) {
    const userCreated = await this.userService.insert(body);
    return successBody(201, userCreated);
  }
}

export default UserController;
