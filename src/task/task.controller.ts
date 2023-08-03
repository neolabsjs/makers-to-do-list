import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { ExceptionDto } from 'src/utils';
import { TaskService } from './task.service';
import { TaskType } from './enum';
import { CreateTaskDto, TaskDto, UpdateTaskDto } from './dto';
import { ITask } from './interface';

@ApiTags('Task')
@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  @ApiOperation({ summary: 'Get list of tasks' })
  @ApiOkResponse({
    type: [TaskDto],
    description: 'List of tasks (with such type if that param was provided)',
  })
  @ApiQuery({ name: 'type', enum: TaskType })
  async getAll(@Query('type') type?: TaskType): Promise<ITask[]> {
    return await this.taskService.getAll(type);
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Get such task by ID' })
  @ApiOkResponse({
    type: TaskDto,
    description: 'Such task finded by id',
  })
  @ApiNotFoundResponse({
    type: ExceptionDto,
    description: 'Task is not defined',
  })
  async getOne(@Param('id') id: string): Promise<ITask> {
    return await this.taskService.getOne(id);
  }

  @Post()
  // @ApiConflictResponse()
  async create(@Body() data: CreateTaskDto): Promise<ITask> {
    return await this.taskService.create(data);
  }

  @Patch('/:id')
  async update(
    @Param('id') id: string,
    @Body() data: UpdateTaskDto,
  ): Promise<ITask> {
    return await this.taskService.update(id, data);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id') id: string): Promise<void> {
    return await this.taskService.delete(id);
  }
}

// DTO: Data Transfer Object
