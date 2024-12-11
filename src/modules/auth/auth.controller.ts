import { Body, Controller, Post } from '@nestjs/common';
import AuthService from './auth.service';
import LoginRequestDto from './dtos/loginRequest.dto';
import successBody from '../../common/utils/successBody';

@Controller('auth')
class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  async login(@Body() body: LoginRequestDto) {
    const token = await this.authService.login(body);
    return successBody(200, token);
  }
}
export default AuthController;
