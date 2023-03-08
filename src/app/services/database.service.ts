import { Injectable } from '@angular/core';
import { SQLite } from '@ionic-native/sqlite/ngx';

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
    return db.executeSql(`INSERT INTO tasks (task) VALUES (?)`, [taskName]);
  }

  async tableExists(tableName: string): Promise<boolean> {
    const db = await this.getDB();
    const res = await db.executeSql(
      `SELECT name FROM sqlite_master WHERE type='table' AND name=?;`,
      [tableName]
    );
    return res.rows.length > 0;
  }

  async getTasks() {
    if (await this.tableExists('tasks')) {
      const db = await this.getDB();
      const res = await db.executeSql(`SELECT * FROM tasks`, []);
      const tasks = [];
      for (let i = 0; i < res.rows.length; i++) {
        tasks.push(res.rows.item(i));
      }
      return tasks;
    } else {
      return [];
    }
  }

  async deleteTask(taskId: number) {
    const db = await this.getDB();
    return db.executeSql(`DELETE FROM tasks WHERE id = ?`, [taskId]);
  }
}
