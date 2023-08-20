import { Injectable } from '@angular/core';
import { moveItemInArray } from '@angular/cdk/drag-drop';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiServiceService } from '../api-service.service';
import { Observable } from 'rxjs';

export interface Task {
  id: string,
  title: string,
  description: string,
  isCompleted: boolean,
  createdBy : string
}

@Injectable()
export class TasksService {
  private tasks: Task[] = []
  constructor(private apiService: ApiServiceService, private snackBar: MatSnackBar) {}

  addTask(title: string, description: string , createdBy: string) {
    const id = Math.random().toString(36).slice(2, 7);
    const body = { id , title, description, isCompleted: false , createdBy};
    this.apiService.addTask(body).subscribe({
      next: (response) => {
        this.tasks.push(body);
        this.showSnackbar('Task added successfully', 'Dismiss');
      },
      error: (error) => {
        console.error(error);
        this.showSnackbar('Failed to add task', 'Dismiss', 'error');
      }
    });
  }

  getCurrentTasks() {
    return [...this.tasks];
  }

  getTasks(groupID: string) {
    this.apiService.getTasks(groupID).subscribe({
      next: (response) => {
        this.tasks = response.tasks;
        this.showSnackbar('Tasks fetched successfully', 'Dismiss');
      },
      error: (error) => {
        console.error(error);
        this.showSnackbar('Failed to fetch tasks', 'Dismiss', 'error');
      }
    });
  }

  markTaskStatus(task: Task) {
    this.apiService.markTask(task.id).subscribe({
      next: (response) => {
        task.isCompleted = !task.isCompleted;
        const status = task.isCompleted ? 'completed' : 'incomplete';
        this.showSnackbar(`Task marked as ${status}`, 'Dismiss');
      },
      error: (error) => {
        console.error(error);
        this.showSnackbar('Failed to mark task status', 'Dismiss', 'error');
      }
    });
  }

  moveTask(previousIndex: number, currentIndex: number) {
    moveItemInArray(this.tasks, previousIndex, currentIndex);
  }

  deleteTask(task: Task) {
    const index = this.tasks.findIndex(_task => _task.id == task.id);
    
    if (index != -1) {
      this.apiService.deleteTask(task.id).subscribe({
        next: () => {
          this.tasks.splice(index, 1);
          this.showSnackbar('Task deleted successfully', 'Dismiss');
        },
        error: (error) => {
          console.error(error);
          this.showSnackbar('Failed to delete task', 'Dismiss', 'error');
        }
      });
    }
  }

  private showSnackbar(message: string, action: string, panelClass?: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
      panelClass: panelClass || ''
    });
  }
}
