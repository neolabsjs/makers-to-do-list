import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  async getHello(): Promise<string> {
    return 'Hello World!';
  }

  async ping(): Promise<string> {
    return 'pong';
  }
}
