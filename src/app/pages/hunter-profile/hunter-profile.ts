import { Component, inject } from '@angular/core';
import { NgFor, NgIf, NgClass, DatePipe } from '@angular/common';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-hunter-profile',
  standalone: true,
  imports: [NgFor, NgIf, NgClass, DatePipe],
  templateUrl: './hunter-profile.html',
  styleUrl: './hunter-profile.css'
})
export class HunterProfileComponent {
  private auth = inject(AuthService);

  username = 'Hunter';
  joinDate = new Date();

  stats = [
    { icon: '⚡', name: 'Total EXP', value: '0' },
    { icon: '📚', name: 'Lessons Completed', value: '0' },
    { icon: '✅', name: 'Quizzes Passed', value: '0' },
    { icon: '🔥', name: 'Login Streak', value: '0 days' },
    { icon: '🏅', name: 'Badges Earned', value: '0' },
    { icon: '⏱️', name: 'Time Studied', value: '0 hrs' },
  ];

  ranks = [
    { letter: 'E', name: 'Unranked Scholar', exp: '0', current: true, unlocked: true },
    { letter: 'D', name: 'Bronze Learner', exp: '500', current: false, unlocked: false },
    { letter: 'C', name: 'Silver Mind', exp: '1,500', current: false, unlocked: false },
    { letter: 'B', name: 'Gold Intellect', exp: '3,500', current: false, unlocked: false },
    { letter: 'A', name: 'Platinum Sage', exp: '7,000', current: false, unlocked: false },
    { letter: 'S', name: 'Shadow Scholar', exp: '12,000', current: false, unlocked: false },
  ];

  badges = [
    { icon: '🌟', name: 'First Steps', description: 'Complete your first lesson', unlocked: false },
    { icon: '🔥', name: 'On Fire', description: '3-day login streak', unlocked: false },
    { icon: '⚡', name: 'Quick Learner', description: 'Complete 5 lessons', unlocked: false },
    { icon: '🧠', name: 'Quiz Master', description: 'Pass 10 quizzes', unlocked: false },
    { icon: '🗡️', name: 'Rank Up', description: 'Reach Rank D', unlocked: false },
    { icon: '👑', name: 'Shadow Scholar', description: 'Reach Rank S', unlocked: false },
  ];

  onLogout(): void {
    this.auth.logout();
  }
}