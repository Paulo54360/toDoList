import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  constructor(private sqlite: SQLite) {}

  async getDB() {
    const db = await this.sqlite.create({
      name: 'tasks.db',
      location: 'default',
    });
    return db;
  }

  async createTasksTable() {
    const db = await this.getDB();
    return db.executeSql(
      `CREATE TABLE IF NOT EXISTS tasks (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT)`,
      []
    );
  }

  async addTask(taskName: string) {
    const db = await this.getDB();
    return db.executeSql(`INSERT INTO tasks (name) VALUES (?)`, [taskName]);
  }

  async getTasks() {
    const db = await this.getDB();
    return db.executeSql(`SELECT * FROM tasks`, []).then(res => {
      const tasks = [];
      for (let i = 0; i < res.rows.length; i++) {
        tasks.push(res.rows.item(i));
      }
      return tasks;
    });
  }

  async deleteTask(taskId: number): Promise<void> {
    try {
      const db = await this.getDB();
      await db.executeSql('DELETE FROM tasks WHERE id = ?', [taskId]);
    } catch (e) {
      console.error(e);
    }
  }
}
