import { Component, Input } from '@angular/core';
import { Task } from '../../task.model';

@Component({
  selector: 'app-progress-bar',
  standalone: true,
  imports: [],
  templateUrl: './progress-bar.component.html',
  styleUrl: './progress-bar.component.css'
})
export class ProgressBarComponent {
  @Input() tasks: Task[] = [];

  get progressPercentage(): number {
    if (this.tasks.length === 0) return 0;
    const completedTasks = this.tasks.filter(task => task.completed).length;
    return Math.round((completedTasks / this.tasks.length) * 100);
  }
}
