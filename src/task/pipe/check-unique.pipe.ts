import { ConflictException, Injectable, PipeTransform } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTaskDto } from '../dto';
import { TaskModel } from '../model';

@Injectable()
export class CheckUniquePipe implements PipeTransform {
  constructor(
    @InjectModel(TaskModel.name) private readonly taskModel: Model<TaskModel>,
  ) {}

  async transform(value: CreateTaskDto) {
    const { title } = value;
    const exist = await this.taskModel.findOne({ title });
    if (exist) {
      throw new ConflictException('Such task already exists');
    }
    return value;
  }
}
