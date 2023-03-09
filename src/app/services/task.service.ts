import { Injectable } from '@angular/core';
import { SQLiteObject } from '@ionic-native/sqlite/ngx';

import { DatabaseService } from './database.service';
import { Task } from '../interfaces/task.interface';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor(private databaseService: DatabaseService) {}

  async getTasks(): Promise<Task[]> {
    const db = await this.databaseService.getDB();
    const res = await db.executeSql(`SELECT * FROM tasks`, []);
    const tasks: Task[] = [];
    for (let i = 0; i < res.rows.length; i++) {
      tasks.push(res.rows.item(i));
    }
    return tasks;
  }

  async addTask(taskName: string): Promise<void> {
    const db = await this.databaseService.getDB();
    await db.executeSql(
      `INSERT INTO tasks (title, description, complete) VALUES (?, ?, ?)`,
      [taskName, '', false]
    );
  }

  async deleteTask(taskId: number): Promise<void> {
    const db = await this.databaseService.getDB();
    await db.executeSql(`DELETE FROM tasks WHERE id = ?`, [taskId]);
  }
}
