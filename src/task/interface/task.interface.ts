import { TaskType } from '../enum';

export interface ITask {
  id: string;
  title: string;
  type: TaskType;
  completed: boolean;
}
