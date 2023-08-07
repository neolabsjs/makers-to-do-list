import { GetAllTasksQuery } from '../dto';
import { ITask } from './task.interface';

export interface ITaskService {
  getAll(query: GetAllTasksQuery): Promise<ITask[]>;
  // create(data): Promise<ITask>;
}
