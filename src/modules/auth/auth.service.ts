import { Injectable, NotFoundException } from '@nestjs/common';
import UserService from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import LoginRequestDto from './dtos/loginRequest.dto';
import { compare } from 'bcrypt';

@Injectable()
class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async login(data: LoginRequestDto) {
    const user = await this.userService
      .findOne({ email: data.email })
      .catch(() => undefined);
    const passwordsMatch = await compare(
      data.password,
      user ? user.password : '',
    );
    if (!user || !passwordsMatch)
      throw new NotFoundException('Email e/ou senha inválidos.');

    return {
      token: this.jwtService.sign(
        { id: user.id, name: user.name, email: user.email },
        { expiresIn: Number(process.env.TOKEN_EXPIRES_IN) },
      ),
    };
  }
}

export default AuthService;
