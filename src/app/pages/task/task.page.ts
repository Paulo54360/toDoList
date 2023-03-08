import { Component } from '@angular/core';
import { TaskService } from '@services/task.service';

import { Task } from '@interfaces/task.interface';

@Component({
  selector: 'app-task',
  templateUrl: './task.page.html',
  styleUrls: ['./task.page.scss'],
})
export class TaskPage {
  tasks: Task[] = [];

  constructor(private taskService: TaskService) {}

  ionViewDidEnter() {
    this.taskService.getTasks().subscribe((tasks: Task[]) => {
      this.tasks = tasks;
    });
  }
}
