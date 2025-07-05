import { Component, inject } from '@angular/core';
import { TaskListComponent } from './task-list/task-list.component';
import { ProjectTitleComponent } from './project-title/project-title.component';
import { ProgressBarComponent } from './progress-bar/progress-bar.component';
import { TaskService } from '../task.service';
import { Task } from '../task.model';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-project',
  standalone: true,
  imports: [TaskListComponent, ProgressBarComponent, ProjectTitleComponent, AsyncPipe],
  templateUrl: './project.component.html',
  styleUrl: './project.component.css',
})
export class ProjectComponent {
  private taskService = inject(TaskService);
  tasks$: Observable<Task[]>;

  constructor() {
    this.tasks$ = this.taskService.getTasks();
  }

  refreshTasks() {
    this.tasks$ = this.taskService.getTasks();
  }
}
