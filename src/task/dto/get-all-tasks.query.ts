import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { TaskType } from '../enum';
import { IsEnum, IsNumberString, IsOptional } from 'class-validator';

export class GetAllTasksQuery {
  @ApiPropertyOptional({
    example: TaskType.IMPORTANT_AND_URGENT,
    enum: TaskType,
  })
  @IsEnum(TaskType)
  @IsOptional()
  type: TaskType;

  @ApiProperty({ example: 1, default: 1 })
  @IsNumberString()
  page: number;

  @ApiProperty({ example: 10, default: 10 })
  @IsNumberString()
  limit: number;

  // sortField: name | email
  // sortType: asc | desc
}
