import { Component, inject, effect } from '@angular/core';
import { NgFor, NgIf, NgClass, DatePipe, DecimalPipe } from '@angular/common';
import { AuthService, Hunter } from '../../services/auth';
import { ProgressService } from '../../services/progress';

@Component({
  selector: 'app-hunter-profile',
  standalone: true,
  imports: [NgFor, NgIf, NgClass, DatePipe, DecimalPipe],
  templateUrl: './hunter-profile.html',
  styleUrl: './hunter-profile.css'
})
export class HunterProfileComponent {
  private auth = inject(AuthService);
  progress = inject(ProgressService);

  // Get current hunter details
  get currentHunter(): Hunter | null {
    return this.auth.getCurrentHunter();
  }

  get username(): string {
    return this.currentHunter?.username ?? 'Hunter';
  }

  get email(): string {
    return this.currentHunter?.email ?? 'No email on file';
  }

  get joinDate(): Date {
    return this.currentHunter?.createdAt ?? new Date();
  }

  private rankOrder = ['E', 'D', 'C', 'B', 'A', 'S'];

  ranks = [
    { letter: 'E', name: 'Unranked Scholar', exp: '0' },
    { letter: 'D', name: 'Bronze Learner', exp: '500' },
    { letter: 'C', name: 'Silver Mind', exp: '1,500' },
    { letter: 'B', name: 'Gold Intellect', exp: '3,500' },
    { letter: 'A', name: 'Platinum Sage', exp: '7,000' },
    { letter: 'S', name: 'Shadow Scholar', exp: '12,000' },
  ];

  constructor() {
    effect(() => {
      console.log(`[Profile] EXP updated: ${this.progress.currentExp()} | Rank: ${this.progress.currentRank()}`);
    });
  }

  get stats() {
    return [
      { icon: '⚡', name: 'Total EXP', value: this.progress.currentExp().toString() },
      { icon: '📚', name: 'Lessons Completed', value: this.progress.getTotalLessonsCompleted().toString() },
      { icon: '✅', name: 'Quizzes Passed', value: this.progress.quizzesPassed().toString() },
      { icon: '🔥', name: 'Login Streak', value: this.progress.loginStreak() + ' days' },
      { icon: '🏅', name: 'Badges Earned', value: this.getUnlockedBadges().toString() },
      { icon: '⏱️', name: 'Time Studied', value: '0 hrs' },
    ];
  }

  getRanks() {
    const currentIndex = this.rankOrder.indexOf(this.progress.currentRank());
    return this.ranks.map((rank, i) => ({
      ...rank,
      current: rank.letter === this.progress.currentRank(),
      unlocked: i <= currentIndex
    }));
  }

  get badges() {
    return [
      { icon: '🌟', name: 'First Steps', description: 'Complete your first lesson', unlocked: this.progress.getTotalLessonsCompleted() >= 1 },
      { icon: '🔥', name: 'On Fire', description: '3-day login streak', unlocked: this.progress.loginStreak() >= 3 },
      { icon: '⚡', name: 'Quick Learner', description: 'Complete 5 lessons', unlocked: this.progress.getTotalLessonsCompleted() >= 5 },
      { icon: '🧠', name: 'Quiz Master', description: 'Pass 10 quizzes', unlocked: this.progress.quizzesPassed() >= 10 },
      { icon: '🗡️', name: 'Rank Up', description: 'Reach Rank D', unlocked: this.rankOrder.indexOf(this.progress.currentRank()) >= 1 },
      { icon: '👑', name: 'Shadow Scholar', description: 'Reach Rank S', unlocked: this.progress.currentRank() === 'S' },
    ];
  }

  getUnlockedBadges(): number {
    return this.badges.filter(b => b.unlocked).length;
  }

  onLogout(): void {
    this.auth.logout();
  }
}