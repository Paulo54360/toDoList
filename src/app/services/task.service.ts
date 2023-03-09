import { Injectable } from '@angular/core';

import { Task } from '@interfaces/task.interface';

import { DatabaseService } from './database.service';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  tasks: Task[] = [];

  constructor(private database: DatabaseService) {}

  async getTasks(): Promise<Task[]> {
    const tasks: Task[] = [];
    try {
      const result = await this.database.db.executeSql(
        'SELECT * FROM tasks',
        []
      );
      for (let i = 0; i < result.rows.length; i++) {
        tasks.push({
          id: result.rows.item(i).id,
          name: result.rows.item(i).name,
          description: result.rows.item(i).description,
          completed: result.rows.item(i).completed, // Renommez la propriété complete en completed
        });
      }
      console.log('Tasks fetched');
    } catch (error) {
      console.error('Error fetching tasks', error);
    }
    return tasks;
  }

  async addTask(task: Task): Promise<void> {
    try {
      await this.database.db.executeSql(
        'INSERT INTO tasks(name, description, completed) VALUES (?, ?, ?)',
        [task.name, task.description, task.completed ? 1 : 0]
      );
      console.log('Task added');
    } catch (error) {
      console.error('Error adding task', error);
    }
  }

  async updateTask(task: Task): Promise<void> {
    try {
      await this.database.db.executeSql(
        'UPDATE tasks SET name = ?, description = ?, completed = ? WHERE id = ?',
        [task.name, task.description, task.completed ? 1 : 0, task.id]
      );
      console.log('Task updated');
    } catch (error) {
      console.error('Error updating task', error);
    }
  }

  async deleteTask(id: number): Promise<void> {
    try {
      await this.database.db.executeSql('DELETE FROM tasks WHERE id = ?', [id]);
      console.log('Task deleted');
    } catch (error) {
      console.error('Error deleting task', error);
    }
  }
}
