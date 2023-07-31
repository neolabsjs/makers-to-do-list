import {
  ConflictException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ITask, ITaskService } from './interface';
import { TaskModel } from './model';
import { TaskType } from './enum';
import { CreateTaskDto } from './dto';

@Injectable()
export class TaskService implements ITaskService {
  constructor(
    @InjectModel(TaskModel.name) private readonly taskModel: Model<TaskModel>,
  ) {}

  async getAll(type?: TaskType): Promise<ITask[]> {
    return await this.taskModel.find(type ? { type } : {});
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
    try {
      const task = await this.taskModel.findById(id);
      return task;
    } catch (err) {
      Logger.error(err, 'TaskService getOne 26');
      throw new NotFoundException('Task is not defined');
      // throw new HttpException('Task is not defined', HttpStatus.NOT_FOUND);
    }
  }

  // 64c3eeb87984df7cca567306 - 0-9, a-f, length is 24

  async create(data: CreateTaskDto): Promise<ITask> {
    const { title } = data;

    const exist = await this.taskModel.findOne({ title });
    if (exist) {
      throw new ConflictException('Such task already exists');
    }

    const newTask = new this.taskModel(data);
    !newTask.type ? (newTask.type = TaskType.IMPORTANT_AND_URGENT) : null;

    Logger.log('New task was created', TaskService.name);
    return newTask.save();
  }

  // async createMany(data: CreateTaskDto[]): Promise<ITask[]> {
  //   return await this.taskModel.insertMany(data);
  // }

  // async update(id, title) {}

  // async complete(id) {}
}

// CRUD: create, read, update, delete

// C: new SomeModel({}).save(), insertMany

// R: find, findOne, findById

// U: updateOne, updateMany

// D: deleteOne, deleteMany
