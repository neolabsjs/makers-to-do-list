import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ITask } from '../interface';
import { TaskType } from '../enum';

@Schema()
export class TaskModel implements ITask {
  @Prop()
  id: string;

  @Prop()
  title: string;

  @Prop({ default: false })
  completed: boolean;

  @Prop()
  type: TaskType;
}

export const TaskSchema = SchemaFactory.createForClass(TaskModel);
