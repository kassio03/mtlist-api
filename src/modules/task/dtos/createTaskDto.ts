import { IsISO8601, IsNotEmpty, IsOptional, IsString } from 'class-validator';

class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsISO8601()
  @IsNotEmpty()
  date: string;
}

export default CreateTaskDto;
