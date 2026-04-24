import { Injectable, signal, computed } from '@angular/core';

export interface ProgressState {
  currentExp: number;
  completedLessons: number[];
  loginStreak: number;
  quizzesPassed: number;
}

@Injectable({
  providedIn: 'root'
})
export class ProgressService {

  private readonly RANK_THRESHOLDS: { [key: string]: number } = {
    'E': 0,
    'D': 500,
    'C': 1500,
    'B': 3500,
    'A': 7000,
    'S': 12000
  };

  // Signals for reactive state
  private _currentExp = signal<number>(0);
  private _completedLessons = signal<number[]>([]);
  private _quizzesPassed = signal<number>(0);
  private _loginStreak = signal<number>(0);

  // Computed signals
  readonly currentExp = computed(() => this._currentExp());
  readonly completedLessons = computed(() => this._completedLessons());
  readonly quizzesPassed = computed(() => this._quizzesPassed());
  readonly loginStreak = computed(() => this._loginStreak());

  readonly currentRank = computed(() => {
    const exp = this._currentExp();
    if (exp >= 12000) return 'S';
    if (exp >= 7000) return 'A';
    if (exp >= 3500) return 'B';
    if (exp >= 1500) return 'C';
    if (exp >= 500) return 'D';
    return 'E';
  });

  readonly nextRank = computed(() => {
    const rank = this.currentRank();
    const next: { [key: string]: string } = {
      'E': 'D', 'D': 'C', 'C': 'B', 'B': 'A', 'A': 'S', 'S': 'S'
    };
    return next[rank];
  });

  readonly maxExpForCurrentRank = computed(() => {
    const next = this.nextRank();
    return this.RANK_THRESHOLDS[next] ?? 12000;
  });

  readonly expPercent = computed(() => {
    const exp = this._currentExp();
    const max = this.maxExpForCurrentRank();
    return Math.min((exp / max) * 100, 100);
  });

  readonly rankName = computed(() => {
    const names: { [key: string]: string } = {
      'E': 'Unranked Scholar',
      'D': 'Bronze Learner',
      'C': 'Silver Mind',
      'B': 'Gold Intellect',
      'A': 'Platinum Sage',
      'S': 'Shadow Scholar'
    };
    return names[this.currentRank()] ?? 'Unknown';
  });

  addExp(amount: number): void {
    this._currentExp.update(exp => exp + amount);
  }

  completeLesson(lessonId: number, expReward: number): void {
    const completed = this._completedLessons();
    if (!completed.includes(lessonId)) {
      this._completedLessons.update(list => [...list, lessonId]);
      this.addExp(expReward);
    }
  }

  passQuiz(expReward: number): void {
    this._quizzesPassed.update(n => n + 1);
    this.addExp(expReward);
  }

  isLessonCompleted(lessonId: number): boolean {
    return this._completedLessons().includes(lessonId);
  }

  getTotalLessonsCompleted(): number {
    return this._completedLessons().length;
  }
}