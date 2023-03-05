import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Task } from '@interfaces/task.interface';


@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient) { }

  getTasks() {
    return this.http.get<Task[]>('./assets/task.json"');
  }

}
