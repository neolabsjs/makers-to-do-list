import { ApiProperty } from '@nestjs/swagger';
import { TaskType } from '../enum';
import { ITask } from '../interface';

export class TaskDto implements ITask {
  @ApiProperty({ example: '64c3eeb87984df7cca567306' })
  id: string;

  @ApiProperty({ example: 'Buy groceries' })
  title: string;

  @ApiProperty({ example: TaskType.IMPORTANT_AND_URGENT })
  type: TaskType;

  @ApiProperty({ example: false })
  completed: boolean;
}
