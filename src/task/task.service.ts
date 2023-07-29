import { Injectable } from '@nestjs/common';

@Injectable()
export class TaskService {
  #TASKS;
  constructor() {
    this.#TASKS = [
      { id: 1, title: 'Вынести мусор', completed: true },
      { id: 2, title: 'Купить хлеб', completed: true },
      { id: 3, title: 'Выучить NestJs', completed: false },
      { id: 4, title: 'Забрать ребенка из садика', completed: true },
    ];
  }

  async getAll() {
    return this.#TASKS;
  }

  async getOne(id: string) {
    return this.#TASKS[Number(id) - 1];
  }

  async addTask(data: any) {
    const newTask = { id: this.#TASKS.length + 1, ...data };
    this.#TASKS.push(newTask);
    return newTask;
  }
}

