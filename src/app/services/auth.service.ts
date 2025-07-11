import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { Router } from '@angular/router';
import { catchError, tap, throwError } from 'rxjs';

type TokenResponse = {
  token: string;
  user?: User;
};

export type User = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: 'USER' | 'ADMIN' | 'MANAGER';
};

export type RegisterRequest = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: 'USER' | 'ADMIN' | 'MANAGER';
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = '/api/auth';
  private http = inject(HttpClient);
  private storageService = inject(StorageService);
  private router = inject(Router);
  private currentUser: User | null = null;
  //constructor() { }

    login(email: string, password: string) {
    return this.http
      .post<TokenResponse>(`${this.apiUrl}/login`, { email, password })
      .pipe(
        tap((response) => {
          this.storageService.setToken(response.token);
          if (response.user) {
            this.currentUser = response.user;
            this.storageService.setUser(response.user);
          }
          this.router.navigate(['/']);
        }),
        catchError((error) => {
          return throwError(
            () => new Error('Incorrect login, please try again.')
          );
        })
      );
  }

  register({ firstName, lastName, email, password, role }: RegisterRequest) {
    return this.http
      .post<TokenResponse>(`${this.apiUrl}/register`, {
        firstName,
        lastName,
        email,
        password,
        role
      })
      .pipe(
        tap((response) => {
          this.storageService.setToken(response.token);
          if (response.user) {
            this.currentUser = response.user;
            this.storageService.setUser(response.user);
          }
          this.router.navigate(['/']);
        }),
        catchError((error) => {
          return throwError(
            () => new Error('Registration failed, please try again.')
          );
        })
      );
  }

  logout() {
    this.storageService.clearToken();
    this.storageService.clearUser();
    this.currentUser = null;
    this.router.navigate(['/login']);
  }

  isLoggedIn() {
    return Boolean(this.storageService.getToken());
  }

  getCurrentUser(): User | null {
    if (!this.currentUser) {
      this.currentUser = this.storageService.getUser();
    }
    return this.currentUser;
  }

}
