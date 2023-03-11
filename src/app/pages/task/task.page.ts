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

  async ionViewWillEnter() {
    this.tasks = await this.taskService.getTasks();
  }

  async addTask() {
    await this.taskService.addTask(this.taskName);
    this.taskName = '';
    this.tasks = await this.taskService.getTasks();
  }

  async removeTask(id: number) {
    await this.taskService.removeTask(id);
    this.tasks = await this.taskService.getTasks();
  }
}
