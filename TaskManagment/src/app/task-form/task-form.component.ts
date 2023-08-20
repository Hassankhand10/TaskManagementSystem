import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { TasksService } from '../tasks/tasks.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent {
  title: string = ''
  description: string = ''

  constructor(private tasksService: TasksService , private snackBar: MatSnackBar) {}

    addTask() {
      const userString = localStorage.getItem("user") 
      if (userString) {
        const user = JSON.parse(userString)
        this.tasksService.addTask(this.title, this.description , user.username);
      }
      this.title = ''
      this.description = ''
    }
}
