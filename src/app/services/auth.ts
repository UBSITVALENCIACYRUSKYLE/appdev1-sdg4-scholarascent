import { Injectable, signal, computed, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ProgressService } from './progress';

export interface Hunter {
  username: string;
  password: string;
  email: string;
  createdAt: Date;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private router = inject(Router);
  private progress = inject(ProgressService);

  private _isLoggedIn = signal<boolean>(false);
  private _username = signal<string>('');
  private _hunters = signal<Hunter[]>([]);

  readonly isAuthenticated = computed(() => this._isLoggedIn());
  readonly currentUser = computed(() => this._username());

  isLoggedIn(): boolean {
    return this._isLoggedIn();
  }

  login(username: string, password: string): boolean {
    const hunters = this._hunters();
    const found = hunters.find(
      h => h.username === username && h.password === password
    );
  
    if (found || (username === 'hunter' && password === 'hunter123')) {
      this._isLoggedIn.set(true);
      this._username.set(username);
      // Load THIS user's saved progress from localStorage
      this.progress.loadProgressForUser(username);
      return true;
    }
    return false;
  }

  register(username: string, email: string, password: string): { success: boolean; message: string } {
    const hunters = this._hunters();

    if (hunters.find(h => h.username === username)) {
      return { success: false, message: 'Username already taken.' };
    }

    if (hunters.find(h => h.email === email)) {
      return { success: false, message: 'Email already registered.' };
    }

    const newHunter: Hunter = {
      username,
      email,
      password,
      createdAt: new Date()
    };

    this._hunters.update(list => [...list, newHunter]);
    return { success: true, message: 'Account created successfully!' };
  }

  logout(): void {
    //  Reset progress on logout
    this.progress.resetProgress();
    this._isLoggedIn.set(false);
    this._username.set('');
    this.router.navigate(['/login']);
  }
}