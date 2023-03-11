import { Injectable } from '@angular/core';
import { Task } from '@interfaces/task.interface';
import { DatabaseService } from '@services/database.service';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor(private databaseService: DatabaseService) {}

  async getTasks(): Promise<Task[]> {
    const query = 'SELECT * FROM tasks ORDER BY id DESC';
    const result = await this.databaseService.executeSQL(query);

    if (result?.rows) {
      const tasks: Task[] = [];
      for (let i = 0; i < result.rows.length; i++) {
        const item = result.rows.item(i);
        tasks.push({ id: item.id, name: item.name });
      }
      return tasks;
    } else {
      return [];
    }
  }

  async addTask(name: string): Promise<boolean> {
    const query = 'INSERT INTO tasks (name) VALUES (?)';
    const params = [name];
    try {
      await this.databaseService.executeSQL(query, params);
      return true;
    } catch (error) {
      console.error('Error during addTask', error);
      return false;
    }
  }

  async removeTask(id: number): Promise<boolean> {
    const query = 'DELETE FROM tasks WHERE id = ?';
    const params = [id];
    try {
      await this.databaseService.executeSQL(query, params);
      return true;
    } catch (error) {
      console.error('Error during removeTask', error);
      return false;
    }
  }
}
