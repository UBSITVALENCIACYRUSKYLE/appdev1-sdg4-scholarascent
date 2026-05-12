import { Injectable, signal, computed, effect } from '@angular/core';

export interface ProgressState {
  currentExp: number;
  completedLessons: number[];
  quizzesPassed: number;
  loginStreak: number;
  completedDailyQuests: string[];
  lastQuestDate: string;
  studyTimeMinutes: number;
  lastLoginDate: string;
  recentActivity: { lessonTitle: string; exp: number; date: string }[];
}

@Injectable({
  providedIn: 'root'
})
export class ProgressService {

  private readonly RANK_THRESHOLDS: { [key: string]: number } = {
    'E': 0, 'D': 500, 'C': 1500, 'B': 3500, 'A': 7000, 'S': 12000
  };

  // ── Signals ──
  private _currentExp = signal<number>(0);
  private _completedLessons = signal<number[]>([]);
  private _quizzesPassed = signal<number>(0);
  private _loginStreak = signal<number>(0);
  private _currentUsername = signal<string>('');
  private _completedDailyQuests = signal<string[]>([]);
  private _lastQuestDate = signal<string>('');
  private _recentActivity = signal<{ lessonTitle: string; exp: number; date: string }[]>([]);
  private _quizInProgress = signal<boolean>(false);
  private _studyTimeMinutes = signal<number>(0);
private _lastLoginDate = signal<string>('');

readonly studyTimeMinutes = computed(() => this._studyTimeMinutes());
readonly studyTimeHours = computed(() => {
  const mins = this._studyTimeMinutes();
  if (mins < 60) return `${mins} min`;
  const hrs = Math.floor(mins / 60);
  const remaining = mins % 60;
  return remaining > 0 ? `${hrs}h ${remaining}m` : `${hrs} hrs`;
});
  // ── Computed Signals ──
  readonly currentExp = computed(() => this._currentExp());
  readonly completedLessons = computed(() => this._completedLessons());
  readonly quizzesPassed = computed(() => this._quizzesPassed());
  readonly loginStreak = computed(() => this._loginStreak());
  readonly currentUsername = computed(() => this._currentUsername());
  readonly completedDailyQuests = computed(() => this._completedDailyQuests());
  readonly recentActivity = computed(() => this._recentActivity());
  readonly quizInProgress = computed(() => this._quizInProgress());

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
      'E': 'Unranked Scholar',
      'D': 'Bronze Learner',
      'C': 'Silver Mind',
      'B': 'Gold Intellect',
      'A': 'Platinum Sage',
      'S': 'Shadow Scholar'
    };
    return names[this.currentRank()] ?? 'Unknown';
  });

  constructor() {
    // ✅ effect() auto-saves to localStorage whenever any signal changes
    effect(() => {
      const username = this._currentUsername();
      if (!username) return;

      const state: ProgressState = {
        currentExp: this._currentExp(),
        completedLessons: this._completedLessons(),
        quizzesPassed: this._quizzesPassed(),
        loginStreak: this._loginStreak(),
        completedDailyQuests: this._completedDailyQuests(),
        lastQuestDate: this._lastQuestDate(),
        studyTimeMinutes: this._studyTimeMinutes(),
        lastLoginDate: this._lastLoginDate(),
        recentActivity: this._recentActivity()
      };

      localStorage.setItem(
        `scholars_ascent_progress_${username}`,
        JSON.stringify(state)
      );
    });
  }

  // ── User Progress Loading ──
  loadProgressForUser(username: string): void {
    this._currentUsername.set(username);
    const key = `scholars_ascent_progress_${username}`;
    const saved = localStorage.getItem(key);

    if (saved) {
      try {
        const state: ProgressState = JSON.parse(saved);
        const today = this.getTodayString();
        this._currentExp.set(state.currentExp ?? 0);
        this._completedLessons.set(state.completedLessons ?? []);
        this._quizzesPassed.set(state.quizzesPassed ?? 0);
        this._loginStreak.set(state.loginStreak ?? 0);
        this._studyTimeMinutes.set(state.studyTimeMinutes ?? 0);
        // ✅ Fix login streak
        const lastLogin = state.lastLoginDate ?? '';
        if (lastLogin === '') {
          // First ever login
          this._loginStreak.set(1);
          this._lastLoginDate.set(today);
        } else if (lastLogin === today) {
          // Already logged in today — keep streak
          this._loginStreak.set(state.loginStreak ?? 1);
          this._lastLoginDate.set(today);
        } else {
          // Check if yesterday
          const yesterday = new Date();
          yesterday.setDate(yesterday.getDate() - 1);
          const yesterdayStr = yesterday.toISOString().split('T')[0];
          if (lastLogin === yesterdayStr) {
            // Consecutive day — increment streak
            this._loginStreak.update(s => s + 1);
          } else {
            // Streak broken
            this._loginStreak.set(1);
          }
          this._lastLoginDate.set(today);
        }
        this._recentActivity.set(state.recentActivity ?? []);

        // ✅ Reset daily quests if it's a new day
        if (state.lastQuestDate !== today) {
          this._completedDailyQuests.set([]);
          this._lastQuestDate.set(today);
        } else {
          this._completedDailyQuests.set(state.completedDailyQuests ?? []);
          this._lastQuestDate.set(state.lastQuestDate ?? today);
        }
      } catch (e) {
        console.error('[Progress] Failed to parse saved progress:', e);
        this.resetProgress();
        this._currentUsername.set(username);
      }
    } else {
      // New user — start fresh
      this.resetProgress();
      this._currentUsername.set(username);
    }
  }

  // ── Daily Quests ──
  isDailyQuestCompleted(questId: string): boolean {
    return this._completedDailyQuests().includes(questId);
  }

  completeDailyQuest(questId: string, expReward: number): boolean {
    if (this.isDailyQuestCompleted(questId)) {
      return false;
    }
    this._completedDailyQuests.update(list => [...list, questId]);
    this._lastQuestDate.set(this.getTodayString());
    this._currentExp.update(exp => exp + expReward);
    return true;
  }

  private getTodayString(): string {
    return new Date().toISOString().split('T')[0];
  }

  // ── Lesson & Quiz Progress ──
  addExp(amount: number): void {
    this._currentExp.update(exp => exp + amount);
  }

  completeLesson(lessonId: number, expReward: number, lessonTitle: string = 'Lesson'): void {
    if (!this._completedLessons().includes(lessonId)) {
      this._completedLessons.update(list => [...list, lessonId]);
      this._currentExp.update(exp => exp + expReward);

      // ✅ Add to recent activity (keep last 5)
      this._recentActivity.update(list => [
        { lessonTitle, exp: expReward, date: new Date().toISOString() },
        ...list
      ].slice(0, 5));
    }
  }

  passQuiz(expReward: number): void {
    this._quizzesPassed.update(n => n + 1);
    if (expReward > 0) {
      this._currentExp.update(exp => exp + expReward);
    }
  }

  isLessonCompleted(lessonId: number): boolean {
    return this._completedLessons().includes(lessonId);
  }

  getTotalLessonsCompleted(): number {
    return this._completedLessons().length;
  }

  // ── Quiz In Progress Indicator ──
  setQuizInProgress(value: boolean): void {
    this._quizInProgress.set(value);
  }

  // ── Reset ──
  resetProgress(): void {
    this._currentUsername.set('');
    this._currentExp.set(0);
    this._completedLessons.set([]);
    this._quizzesPassed.set(0);
    this._loginStreak.set(0);
    this._completedDailyQuests.set([]);
    this._lastQuestDate.set('');
    this._recentActivity.set([]);
    this._quizInProgress.set(false);
    this._studyTimeMinutes.set(0);
    this._lastLoginDate.set('');
  }
  addStudyTime(minutes: number): void {
    this._studyTimeMinutes.update(m => m + minutes);
  }
}