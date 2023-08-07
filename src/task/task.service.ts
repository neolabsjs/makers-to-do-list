import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ITask, ITaskService } from './interface';
import { TaskModel } from './model';
import { TaskType } from './enum';
import { CreateTaskDto, GetAllTasksQuery, UpdateTaskDto } from './dto';

@Injectable()
export class TaskService implements ITaskService {
  constructor(
    @InjectModel(TaskModel.name) private readonly taskModel: Model<TaskModel>,
  ) {}

  async getAll(query: GetAllTasksQuery): Promise<ITask[]> {
    const { type, page, limit } = query;
    return await this.taskModel
      .find(type ? { type } : {})
      .skip(limit * (page - 1))
      .limit(limit)
      .sort({ title: 'asc' });
    // .sort({ [sortField]: sortType });
  }

  // enum filterField {
  //  PRICE = 'price',
  //  CATEGORY = 'category',
  // }

  // filterType = 'phones'

  // async filterProducts(filterField, filterType): Promise<ITask[]> {
  //   return await this.taskModel.find({ [filterField]: filterType });
  // }

  async getOne(id: string) {
    const task = await this.taskModel.findById(id);
    if (!task) {
      throw new NotFoundException('Task is not defined');
    }
    return task;
  }

  // 64c3eeb87984df7cca567306 - 0-9, a-f, length is 24

  async create(data: CreateTaskDto): Promise<ITask> {
    const newTask = new this.taskModel(data);
    !newTask.type ? (newTask.type = TaskType.IMPORTANT_AND_URGENT) : null;

    // Logger.log('New task was created', TaskService.name);
    return newTask.save();
  }

  // async createMany(data: CreateTaskDto[]): Promise<ITask[]> {
  //   return await this.taskModel.insertMany(data);
  // }

  async update(id: string, data: UpdateTaskDto): Promise<ITask> {
    const { title } = data;
    const task = await this.getOne(id);

    title != task.title ? await this.checkUnique(title) : null;

    Object.assign(task, data);
    return task.save();
  }

  async delete(id: string): Promise<void> {
    await this.getOne(id);
    await this.taskModel.deleteOne({ _id: id });
  }

  async checkUnique(title: string): Promise<void> {
    const exist = await this.taskModel.findOne({ title });
    if (exist) {
      throw new ConflictException('Such task already exists');
    }
  }

  // async update(id: string, data: UpdateTaskDto): Promise<ITask> {
  //   const task = await this.getOne(id);
  //   const { title, type } = data;
  //   const update = await this.taskModel.updateOne(
  //     { _id: id },
  //     { $set: { title, type } },
  //   );
  //   return await this.getOne(id);
  // }

  // async complete(id) {}
}

// CRUD: create, read, update, delete

// C: new SomeModel({}).save(), insertMany

// R: find, findOne, findById

// U: updateOne, updateMany

// D: deleteOne, deleteMany
