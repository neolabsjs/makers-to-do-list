import { ApiProperty } from '@nestjs/swagger';
import { TaskType } from '../enum';
import { IsEnum, IsString, Length } from 'class-validator';

export class CreateTaskDto {
  @ApiProperty({ example: 'Buy groceries' })
  @Length(5, 200)
  @IsString()
  title: string;

  @ApiProperty({
    example: TaskType.IMPORTANT_AND_URGENT,
    enum: TaskType,
  })
  @IsEnum(TaskType)
  type: TaskType;
}
