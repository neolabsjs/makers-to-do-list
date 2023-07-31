import { TaskType } from '../enum';
import { ITask } from './task.interface';

export interface ITaskService {
  getAll(type?: TaskType): Promise<ITask[]>;
  // create(data): Promise<ITask>;
}
