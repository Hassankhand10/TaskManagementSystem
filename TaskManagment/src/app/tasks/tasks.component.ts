import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { Task, TasksService } from './tasks.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  constructor(public tasksService: TasksService) {}
  
  ngOnInit(): void {
    const userString = localStorage.getItem("user") 
    if (userString) {
      const user = JSON.parse(userString)
      this.tasksService.getTasks(user.groupId);
    } 
  }

  getTasks() {
    return this.tasksService.getCurrentTasks();
  }

  markStatus(task: Task) {
    this.tasksService.markTaskStatus(task)
  }

  onTaskDrop(event: CdkDragDrop<string[]>) {
    this.tasksService.moveTask(event.previousIndex, event.currentIndex)
  }

  deleteTask(task: Task) {
    this.tasksService.deleteTask(task);
  }
}
