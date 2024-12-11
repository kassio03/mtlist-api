import { TaskState } from './../entities/task.entity';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

class UpdateTaskDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  title: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsEnum(TaskState)
  @IsOptional()
  state: TaskState;
}

export default UpdateTaskDto;
