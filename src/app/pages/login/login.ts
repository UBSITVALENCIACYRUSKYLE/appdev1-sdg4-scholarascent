import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent {
  private auth = inject(AuthService);
  private router = inject(Router);

  // Login fields
  username = '';
  password = '';

  // Register fields
  regUsername = '';
  regEmail = '';
  regPassword = '';
  regConfirm = '';

  // State
  isRegistering = false;
  errorMessage = '';
  successMessage = '';
  fieldErrors: { [key: string]: string } = {};

  showRegister(): void {
    this.isRegistering = true;
    this.clearMessages();
  }

  showLogin(): void {
    this.isRegistering = false;
    this.clearMessages();
  }

  clearMessages(): void {
    this.errorMessage = '';
    this.successMessage = '';
    this.fieldErrors = {};
  }

  onLogin(): void {
    this.clearMessages();

    if (!this.username.trim()) {
      this.errorMessage = 'Please enter your Hunter ID.';
      return;
    }
    if (!this.password.trim()) {
      this.errorMessage = 'Please enter your Access Code.';
      return;
    }

    const success = this.auth.login(this.username, this.password);
    if (success) {
      this.router.navigate(['/dashboard']);
    } else {
      this.errorMessage = 'Invalid Hunter ID or Access Code.';
    }
  }

  onRegister(): void {
    this.clearMessages();
    let valid = true;

    if (!this.regUsername.trim()) {
      this.fieldErrors['username'] = 'Username is required.';
      valid = false;
    } else if (this.regUsername.length < 3) {
      this.fieldErrors['username'] = 'Username must be at least 3 characters.';
      valid = false;
    }

    if (!this.regEmail.trim()) {
      this.fieldErrors['email'] = 'Email is required.';
      valid = false;
    } else if (!this.regEmail.includes('@')) {
      this.fieldErrors['email'] = 'Please enter a valid email.';
      valid = false;
    }

    if (!this.regPassword.trim()) {
      this.fieldErrors['password'] = 'Password is required.';
      valid = false;
    } else if (this.regPassword.length < 6) {
      this.fieldErrors['password'] = 'Password must be at least 6 characters.';
      valid = false;
    }

    if (this.regPassword !== this.regConfirm) {
      this.fieldErrors['confirm'] = 'Passwords do not match.';
      valid = false;
    }

    if (!valid) return;

    const result = this.auth.register(
      this.regUsername,
      this.regEmail,
      this.regPassword
    );

    if (result.success) {
      this.successMessage = result.message + ' Redirecting to login...';
      setTimeout(() => {
        this.regUsername = '';
        this.regEmail = '';
        this.regPassword = '';
        this.regConfirm = '';
        this.showLogin();
      }, 2000);
    } else {
      this.errorMessage = result.message;
    }
  }
}