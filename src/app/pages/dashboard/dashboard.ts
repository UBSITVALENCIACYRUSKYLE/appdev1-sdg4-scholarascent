import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgFor, NgClass, DatePipe } from '@angular/common';
import { ProgressService } from '../../services/progress';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterLink, NgFor, NgClass, DatePipe],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class DashboardComponent {
  progress = inject(ProgressService);

  today = new Date();

  get stats() {
    return [
      { icon: '⚡', value: this.progress.currentExp().toString(), label: 'Total EXP' },
      { icon: '📚', value: this.progress.getTotalLessonsCompleted().toString(), label: 'Lessons Done' },
      { icon: '🔥', value: this.progress.loginStreak().toString(), label: 'Day Streak' },
      { icon: '🏅', value: this.progress.quizzesPassed().toString(), label: 'Quizzes Passed' },
    ];
  }

  dailyQuests = [
    { name: 'Complete a Lesson', description: 'Finish any programming lesson', exp: 100, done: false },
    { name: 'Pass a Quiz', description: 'Score 70% or higher on any quiz', exp: 50, done: false },
    { name: 'Login Streak', description: 'Log in today to maintain your streak', exp: 25, done: false },
  ];

  rankProgression = [
    { letter: 'E', name: 'Unranked Scholar', exp: '0', current: false, unlocked: true },
    { letter: 'D', name: 'Bronze Learner', exp: '500', current: false, unlocked: false },
    { letter: 'C', name: 'Silver Mind', exp: '1,500', current: false, unlocked: false },
    { letter: 'B', name: 'Gold Intellect', exp: '3,500', current: false, unlocked: false },
    { letter: 'A', name: 'Platinum Sage', exp: '7,000', current: false, unlocked: false },
    { letter: 'S', name: 'Shadow Scholar', exp: '12,000', current: false, unlocked: false },
  ];

  getRankProgression() {
    return this.rankProgression.map(rank => ({
      ...rank,
      current: rank.letter === this.progress.currentRank(),
      unlocked: ['E', 'D', 'C', 'B', 'A', 'S']
        .indexOf(rank.letter) <= ['E', 'D', 'C', 'B', 'A', 'S']
        .indexOf(this.progress.currentRank())
    }));
  }
}