import { Injectable } from '@angular/core';
import { Task } from '../task.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const BASE_URL = '/api';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor(private http: HttpClient) {}

  // getTasks
  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(`${BASE_URL}/tasks`);
  }

  // addTask
  addTask(task: Task): Observable<any> {
    const { id, ...taskWithoutId } = task;
    return this.http.post(`${BASE_URL}/tasks`, { ...taskWithoutId, project: null });
  }

  // updateTask
  updateTask(newTask: Task): Observable<any> {
    return this.http.put(`${BASE_URL}/tasks/${newTask.id}`, {
      ...newTask,
      project: null,
    });
  }

  // deleteTask
  deleteTask(id: number): Observable<any> {
    return this.http.delete(`${BASE_URL}/tasks/${id}`);
  }
}
