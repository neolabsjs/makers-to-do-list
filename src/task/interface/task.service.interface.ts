import { ITask } from './task.interface';

export interface ITaskService {
  getAll(): Promise<ITask[]>;
  // create(data): Promise<ITask>;
}
