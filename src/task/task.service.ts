import { Injectable } from '@nestjs/common';
import { ITask, ITaskService } from './interface';
import { InjectModel } from '@nestjs/mongoose';
import { TaskModel } from './model/task.model';
import { Model } from 'mongoose';

@Injectable()
export class TaskService implements ITaskService {
  constructor(
    @InjectModel(TaskModel.name) private readonly taskModel: Model<TaskModel>,
  ) {}

  async getAll(): Promise<ITask[]> {
    return await this.taskModel.find();
  }

  async getOne(id: string) {
    const task = await this.taskModel.findOne({
      _id: id,
    });
    return task;
  }

  async create(data): Promise<ITask> {
    const newTask = new this.taskModel(data);
    return newTask.save();
  }

  // async update(id, title) {}

  // async complete(id) {}
}
