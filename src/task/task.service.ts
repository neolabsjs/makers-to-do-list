import { Injectable } from '@nestjs/common';

@Injectable()
export class TaskService {
  #TASKS;
  constructor() {
    this.#TASKS = [
      { id: 1, title: 'Вынести мусор', completed: true },
      { id: 2, title: 'Купить хлеб и молоко', completed: false },
      { id: 3, title: 'Подписать договор', completed: false },
      { id: 4, title: 'Провести урок', completed: true },
    ];
  }

  async getAll() {
    return this.#TASKS;
  }

  // async getOne(id: string) {}

  // async create(data) {}
}
