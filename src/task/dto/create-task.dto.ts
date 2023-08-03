import { ApiProperty } from '@nestjs/swagger';
import { TaskType } from '../enum';

export class CreateTaskDto {
  @ApiProperty({ example: 'Buy groceries' })
  title: string;

  @ApiProperty({
    example: TaskType.IMPORTANT_AND_URGENT,
    enum: TaskType,
  })
  type: TaskType;
}
