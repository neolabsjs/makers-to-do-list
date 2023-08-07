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
  ApiTags,
} from '@nestjs/swagger';
import { GetByIdParam, ExceptionDto } from 'src/utils';
import { TaskService } from './task.service';
import { CreateTaskDto, GetAllTasksQuery, TaskDto, UpdateTaskDto } from './dto';
import { ITask } from './interface';
import { CheckUniquePipe } from './pipe';

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
  async getAll(@Query() query: GetAllTasksQuery): Promise<ITask[]> {
    return await this.taskService.getAll(query);
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
  async getOne(@Param() { id }: GetByIdParam): Promise<ITask> {
    return await this.taskService.getOne(id);
  }

  @Post()
  // @ApiConflictResponse()
  async create(@Body(CheckUniquePipe) data: CreateTaskDto): Promise<ITask> {
    return await this.taskService.create(data);
  }

  @Patch('/:id')
  async update(
    @Param() { id }: GetByIdParam,
    @Body(CheckUniquePipe) data: UpdateTaskDto,
  ): Promise<ITask> {
    return await this.taskService.update(id, data);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param() { id }: GetByIdParam): Promise<void> {
    return await this.taskService.delete(id);
  }
}

// DTO: Data Transfer Object
