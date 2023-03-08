import { Component } from '@angular/core';

import { Task } from '@interfaces/task.interface';
import { TaskService } from '@services/task.service';

@Component({
  selector: 'app-task',
  templateUrl: 'task.page.html',
  styleUrls: ['task.page.scss'],
})
export class TaskPage {
  tasks: Task[] = [];
  taskName = '';

  constructor(private taskService: TaskService) {}

  ionViewWillEnter() {
    this.getTasks();
  }

  async getTasks() {
    this.tasks = await this.taskService.getTasks();
  }

  async addTask() {
    await this.taskService.addTask(this.taskName);
    this.taskName = '';
    await this.getTasks();
  }

  async deleteTask(taskId: number) {
    await this.taskService.deleteTask(taskId);
    await this.getTasks();
  }
}
