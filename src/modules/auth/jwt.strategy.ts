import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import UserService from '../user/user.service';
import JwtDto from './dtos/jwt.dto';
import { Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.SECRET_KEY,
      ignoreExpiration: false,
    });
  }

  async validate(data: JwtDto) {
    const userExists = await this.userService.findOne({ email: data.email });
    if (!userExists) throw new UnauthorizedException();

    return userExists;
  }
}

export default JwtStrategy;
