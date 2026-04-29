import { Component, inject, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgFor, NgClass, DatePipe } from '@angular/common';
import { ProgressService } from '../../services/progress';

export interface DailyQuest {
  id: string;
  name: string;
  description: string;
  exp: number;
}

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

  readonly dailyQuestDefs: DailyQuest[] = [
    { id: 'complete_lesson', name: 'Complete a Lesson', description: 'Finish any programming lesson', exp: 100 },
    { id: 'pass_quiz', name: 'Pass a Quiz', description: 'Score 70% or higher on any quiz', exp: 50 },
    { id: 'login_streak', name: 'Login Streak', description: 'Log in today to maintain your streak', exp: 25 },
  ];

  // ✅ Computed — reacts to signal changes automatically
  get dailyQuests() {
    return this.dailyQuestDefs.map(q => ({
      ...q,
      done: this.progress.isDailyQuestCompleted(q.id)
    }));
  }

  get stats() {
    return [
      { icon: '⚡', value: this.progress.currentExp().toString(), label: 'Total EXP' },
      { icon: '📚', value: this.progress.getTotalLessonsCompleted().toString(), label: 'Lessons Done' },
      { icon: '🔥', value: this.progress.loginStreak().toString(), label: 'Day Streak' },
      { icon: '🏅', value: this.progress.quizzesPassed().toString(), label: 'Quizzes Passed' },
    ];
  }

  // ✅ Only completes quest if not already done
  claimQuest(questId: string, exp: number): void {
    this.progress.completeDailyQuest(questId, exp);
  }

  getRankProgression() {
    const rankOrder = ['E', 'D', 'C', 'B', 'A', 'S'];
    const currentIndex = rankOrder.indexOf(this.progress.currentRank());
    return [
      { letter: 'E', name: 'Unranked Scholar', exp: '0' },
      { letter: 'D', name: 'Bronze Learner', exp: '500' },
      { letter: 'C', name: 'Silver Mind', exp: '1,500' },
      { letter: 'B', name: 'Gold Intellect', exp: '3,500' },
      { letter: 'A', name: 'Platinum Sage', exp: '7,000' },
      { letter: 'S', name: 'Shadow Scholar', exp: '12,000' },
    ].map((rank, i) => ({
      ...rank,
      current: rank.letter === this.progress.currentRank(),
      unlocked: i <= currentIndex
    }));
  }
}