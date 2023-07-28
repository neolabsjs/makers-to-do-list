import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TaskModule } from './task/task.module';

@Module({
  imports: [
    TaskModule,
    MongooseModule.forRoot(
      'mongodb+srv://admin:admin123@to-do-list.oixgfdx.mongodb.net/?retryWrites=true&w=majority',
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
  exports: [],
})
export class AppModule {}

// nest new <project-name> - create new project with name <project-name>
// nest new to-do-list

// nest generate module/service/controller name
// nest g mo/s/co name

// nest g mo task
// nest g s task
// nest g co task
