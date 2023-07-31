import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskType } from './enum';
import { CreateTaskDto } from './dto';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  async getAll(@Query('type') type: TaskType) {
    return await this.taskService.getAll(type);
  }

  @Get('/:id')
  async getOne(@Param('id') id: string) {
    return await this.taskService.getOne(id);
  }

  @Post()
  async create(@Body() data: CreateTaskDto) {
    return await this.taskService.create(data);
  }

  // @Put()
}

// DTO: Data Transfer Object
