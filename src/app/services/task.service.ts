import { Injectable } from '@angular/core';

import { DatabaseService } from './database.service';
import { Task } from '../interfaces/task.interface';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor(private databaseService: DatabaseService) {}

  async getTasks(): Promise<Task[]> {
    const db = await this.databaseService.getDB();
    if (!db) {
      return [];
    }
    const res = await db.executeSql(
      `SELECT *
                                     FROM tasks`,
      []
    );
    const tasks: Task[] = [];
    for (let i = 0; i < res.rows.length; i++) {
      tasks.push(res.rows.item(i));
    }
    return tasks;
  }

  async addTask(taskName: string): Promise<void> {
    const db = await this.databaseService.getDB();
    if (db) {
      try {
        await db.transaction(tx => {
          tx.executeSql(
            `INSERT INTO tasks (name, completed)
             VALUES (?, ?)`,
            [taskName, 0],
            () => console.log('Task added successfully'),
            (tx: any, error: any) => console.error('Unable to add task', error)
          );
        });
      } catch (error) {
        console.error('Unable to add task', error);
      }
    }
  }

  async deleteTask(taskId: number): Promise<void> {
    const db = await this.databaseService.getDB();
    await db.executeSql(`DELETE FROM tasks WHERE id = ?`, [taskId]);
  }
}
