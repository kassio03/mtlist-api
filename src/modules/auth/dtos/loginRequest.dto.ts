import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

class LoginRequestDto {
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}

export default LoginRequestDto;
