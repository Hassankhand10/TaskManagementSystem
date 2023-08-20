import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from './tasks/tasks.service';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {
  apiUrl = 'http://localhost:3000'
  constructor(private http: HttpClient) { }


  login(username: string, password: string): Observable<any[]> {
    return this.http.post<any>(`${this.apiUrl}/login`, { username, password });
  }

  addTask(body: Task): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/task`, body);
  }

  getTasks(groupID: string) {
    return this.http.get<any>(`${this.apiUrl}/task/${groupID}`);
  }

  markTask(taskId: string) {
    return this.http.patch<any>(`${this.apiUrl}/task/${taskId}/mark`, {});
  }
  
  deleteTask(taskId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/task/${taskId}`);
  }
}
