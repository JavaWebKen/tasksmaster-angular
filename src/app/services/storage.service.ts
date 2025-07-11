import { Injectable } from '@angular/core';
import { User } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private _cachedToken: string | null = null;
  private _cachedUser: User | null = null;
  private TOKEN_KEY = 'AUTH_TOKEN_KEY';
  private USER_KEY = 'AUTH_USER_KEY';

  setToken(token: string) {
    this._cachedToken = token;
    //localStorage.setItem(this.TOKEN_KEY, token);
    window.localStorage.setItem(this.TOKEN_KEY, token);
  }

  getToken(): string | null | void {
    if (!window) {
      return;
    }
    if (!this._cachedToken) {
      this._cachedToken = window.localStorage.getItem(this.TOKEN_KEY);
    }
    return this._cachedToken;
  }

  clearToken() {
    if (!window) {
      return;
    }
    this._cachedToken = null;
    window.localStorage.removeItem(this.TOKEN_KEY);
  }

  setUser(user: User) {
    this._cachedUser = user;
    window.localStorage.setItem(this.USER_KEY, JSON.stringify(user));
  }

  getUser(): User | null {
    if (!window) {
      return null;
    }
    if (!this._cachedUser) {
      const userData = window.localStorage.getItem(this.USER_KEY);
      this._cachedUser = userData ? JSON.parse(userData) : null;
    }
    return this._cachedUser;
  }

  clearUser() {
    if (!window) {
      return;
    }
    this._cachedUser = null;
    window.localStorage.removeItem(this.USER_KEY);
  }
}
