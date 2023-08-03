// import { ApiPropertyOptional } from '@nestjs/swagger';
import { TaskType } from '../enum';

export class UpdateTaskDto {
  // @ApiPropertyOptional()
  title: string;
  type: TaskType;
}
