import { Injectable, signal, computed, effect } from '@angular/core';

export interface ProgressState {
  currentExp: number;
  completedLessons: number[];
  quizzesPassed: number;
  loginStreak: number;
  completedDailyQuests: string[];
  lastQuestDate: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProgressService {

  private readonly RANK_THRESHOLDS: { [key: string]: number } = {
    'E': 0, 'D': 500, 'C': 1500, 'B': 3500, 'A': 7000, 'S': 12000
  };

  private _currentExp = signal<number>(0);
  private _completedLessons = signal<number[]>([]);
  private _quizzesPassed = signal<number>(0);
  private _loginStreak = signal<number>(0);
  private _currentUsername = signal<string>('');
  private _completedDailyQuests = signal<string[]>([]);
  private _lastQuestDate = signal<string>('');

  readonly currentExp = computed(() => this._currentExp());
  readonly completedLessons = computed(() => this._completedLessons());
  readonly quizzesPassed = computed(() => this._quizzesPassed());
  readonly loginStreak = computed(() => this._loginStreak());
  readonly currentUsername = computed(() => this._currentUsername());
  readonly completedDailyQuests = computed(() => this._completedDailyQuests());

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
    const next: { [key: string]: string } = {
      'E': 'D', 'D': 'C', 'C': 'B', 'B': 'A', 'A': 'S', 'S': 'S'
    };
    return next[this.currentRank()];
  });

  readonly maxExpForCurrentRank = computed(() => {
    return this.RANK_THRESHOLDS[this.nextRank()] ?? 12000;
  });

  readonly expPercent = computed(() => {
    return Math.min((this._currentExp() / this.maxExpForCurrentRank()) * 100, 100);
  });

  readonly rankName = computed(() => {
    const names: { [key: string]: string } = {
      'E': 'Unranked Scholar', 'D': 'Bronze Learner',
      'C': 'Silver Mind', 'B': 'Gold Intellect',
      'A': 'Platinum Sage', 'S': 'Shadow Scholar'
    };
    return names[this.currentRank()] ?? 'Unknown';
  });

  constructor() {
    effect(() => {
      const username = this._currentUsername();
      if (!username) return;

      const state: ProgressState = {
        currentExp: this._currentExp(),
        completedLessons: this._completedLessons(),
        quizzesPassed: this._quizzesPassed(),
        loginStreak: this._loginStreak(),
        completedDailyQuests: this._completedDailyQuests(),
        lastQuestDate: this._lastQuestDate()
      };

      localStorage.setItem(
        `scholars_ascent_progress_${username}`,
        JSON.stringify(state)
      );
    });
  }

  loadProgressForUser(username: string): void {
    this._currentUsername.set(username);
    const key = `scholars_ascent_progress_${username}`;
    const saved = localStorage.getItem(key);

    if (saved) {
      try {
        const state: ProgressState = JSON.parse(saved);
        this._currentExp.set(state.currentExp ?? 0);
        this._completedLessons.set(state.completedLessons ?? []);
        this._quizzesPassed.set(state.quizzesPassed ?? 0);
        this._loginStreak.set(state.loginStreak ?? 0);

        // ✅ Reset daily quests if it's a new day
        const today = this.getTodayString();
        if (state.lastQuestDate !== today) {
          this._completedDailyQuests.set([]);
          this._lastQuestDate.set(today);
        } else {
          this._completedDailyQuests.set(state.completedDailyQuests ?? []);
          this._lastQuestDate.set(state.lastQuestDate ?? today);
        }
      } catch (e) {
        this.resetProgress();
      }
    } else {
      this.resetProgress();
      this._currentUsername.set(username);
    }
  }

  // ✅ Check if a daily quest is already completed
  isDailyQuestCompleted(questId: string): boolean {
    return this._completedDailyQuests().includes(questId);
  }

  // ✅ Complete a daily quest — only grants EXP once per day
  completeDailyQuest(questId: string, expReward: number): boolean {
    if (this.isDailyQuestCompleted(questId)) {
      return false; // already done
    }
    this._completedDailyQuests.update(list => [...list, questId]);
    this._lastQuestDate.set(this.getTodayString());
    this._currentExp.update(exp => exp + expReward);
    return true;
  }

  private getTodayString(): string {
    return new Date().toISOString().split('T')[0]; // e.g. "2026-04-24"
  }

  addExp(amount: number): void {
    this._currentExp.update(exp => exp + amount);
  }

  completeLesson(lessonId: number, expReward: number): void {
    if (!this._completedLessons().includes(lessonId)) {
      this._completedLessons.update(list => [...list, lessonId]);
      this._currentExp.update(exp => exp + expReward);
    }
  }

  passQuiz(expReward: number): void {
    this._quizzesPassed.update(n => n + 1);
    this._currentExp.update(exp => exp + expReward);
  }

  isLessonCompleted(lessonId: number): boolean {
    return this._completedLessons().includes(lessonId);
  }

  getTotalLessonsCompleted(): number {
    return this._completedLessons().length;
  }

  resetProgress(): void {
    this._currentUsername.set('');
    this._currentExp.set(0);
    this._completedLessons.set([]);
    this._quizzesPassed.set(0);
    this._loginStreak.set(0);
    this._completedDailyQuests.set([]);
    this._lastQuestDate.set('');
  }
}