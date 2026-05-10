import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NgIf, NgClass } from '@angular/common';
import { AuthService } from '../../services/auth';
import { ProgressService } from '../../services/progress';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, NgIf, NgClass],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class NavbarComponent {
  private auth = inject(AuthService);
  private progress = inject(ProgressService);

  menuOpen = false;

  // ✅ Reactive rank from ProgressService signal
  currentRank = this.progress.currentRank;
  isLoggedIn = this.auth.isAuthenticated;

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  closeMenu(): void {
    this.menuOpen = false;
  }

  onLogout(): void {
    this.auth.logout();
    this.closeMenu();
  }
}