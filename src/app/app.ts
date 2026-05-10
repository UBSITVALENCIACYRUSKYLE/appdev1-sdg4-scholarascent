import { Component, inject, effect } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgIf } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar';
import { ProgressService } from './services/progress';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, NgIf],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class AppComponent {
  private progress = inject(ProgressService);

  showRankUp = false;
  newRank = '';
  newRankName = '';
  private previousRank = '';

  constructor() {
    effect(() => {
      const rank = this.progress.currentRank();
      if (this.previousRank && rank !== this.previousRank) {
        this.newRank = rank;
        this.newRankName = this.progress.rankName();
        this.showRankUp = true;
        setTimeout(() => this.showRankUp = false, 3500);
      }
      this.previousRank = rank;
    });
  }
}