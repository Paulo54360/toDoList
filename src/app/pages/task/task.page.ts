import { Component } from '@angular/core';
import { Task } from '@interfaces/task.interface';
import { TaskService } from '@services/task.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.page.html',
  styleUrls: ['./task.page.scss'],
})
export class TaskPage {
  tasks: Task[] = [];

  constructor(private taskService: TaskService) {}

  ionViewDidEnter() {
    this.taskService.getTasks().subscribe((tasks) => {
      this.tasks = tasks;
    });
  }
}
