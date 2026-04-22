import { Injectable, signal, computed, inject } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private router = inject(Router);

  private _isLoggedIn = signal<boolean>(false);
  private _username = signal<string>('');

  readonly isAuthenticated = computed(() => this._isLoggedIn());
  readonly currentUser = computed(() => this._username());

  isLoggedIn(): boolean {
    return this._isLoggedIn();
  }

  login(username: string, password: string): boolean {
    if (username.trim() && password.trim()) {
      this._isLoggedIn.set(true);
      this._username.set(username);
      return true;
    }
    return false;
  }

  logout(): void {
    this._isLoggedIn.set(false);
    this._username.set('');
    this.router.navigate(['/login']);
  }
}