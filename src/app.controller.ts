import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('app')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getHello(): Promise<string> {
    return await this.appService.getHello();
  }

  @Get('/ping')
  async ping(): Promise<string> {
    return await this.appService.ping();
  }
}

// http://backend-url/controller-name/?route-name?
// http://localhost:5000/app
// http://123.123.123.123:5000/app

// http://localhost:5000/user/login
// http://localhost:5000/user/me

// Create
// Read
// Update
// Delete
