import { Component, inject } from '@angular/core';
import { AuthService, User } from '../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-profile',
  imports: [CommonModule],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent {
  authService = inject(AuthService);
  showTooltip = false;

  get currentUser(): User | null {
    return this.authService.getCurrentUser();
  }

  onMouseEnter() {
    this.showTooltip = true;
  }

  onMouseLeave() {
    this.showTooltip = false;
  }
}
