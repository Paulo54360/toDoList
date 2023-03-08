import { Injectable } from '@angular/core';

import { DatabaseService } from './database.service';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor(private databaseService: DatabaseService) {}

  async getTasks() {
    return this.databaseService.getTasks();
  }

  async addTask(taskName: string): Promise<void> {
    try {
      const db = await this.databaseService.getDB();
      await db.executeSql(`INSERT INTO tasks (name) VALUES (?)`, [taskName]);
    } catch (e) {
      console.error(e);
    }
  }

  async deleteTask(taskId: number) {
    return this.databaseService.deleteTask(taskId);
  }
}
