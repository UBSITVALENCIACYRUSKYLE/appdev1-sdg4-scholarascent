import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NgFor, NgIf,NgClass, UpperCasePipe, DecimalPipe } from '@angular/common';
import { LessonService } from '../../services/lesson';
import { ProgressService } from '../../services/progress';
import { QuizService, QuizQuestion, LessonContent } from '../../services/quiz';
import { Lesson } from '../../models/lesson.model';
import { CanComponentDeactivate } from '../../guards/lesson-guard';
import { FormsModule } from '@angular/forms';

interface DailyBonus {
  name: string;
  exp: number;
}

@Component({
  selector: 'app-lesson-detail',
  standalone: true,
  imports: [RouterLink, NgFor, NgClass, NgIf, UpperCasePipe, DecimalPipe, FormsModule],
  templateUrl: './lesson-detail.html',
  styleUrl: './lesson-detail.css'
})
export class LessonDetailComponent implements OnInit, CanComponentDeactivate {
  private route = inject(ActivatedRoute);
  private lessonService = inject(LessonService);
  private progressService = inject(ProgressService);
  private quizService = inject(QuizService);

  lesson: Lesson | undefined;
  choiceLetters = ['A', 'B', 'C', 'D'];

  contentBlocks: LessonContent[] = [];
  quizQuestions: QuizQuestion[] = [];
  activity: any = null;

  selectedAnswers: { [key: number]: number } = {};
  quizSubmitted = false;
  quizPassed = false;
  score = 0;
  scorePercent = 0;
  expGained = 0;
  dailyQuestBonuses: DailyBonus[] = [];

  showActivity = false;
  activityAnswer = '';
  activitySubmitted = false;

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.lesson = this.lessonService.getLessonById(id);

    const data = this.quizService.getLessonData(id);
    if (data) {
      this.contentBlocks = data.content;
      this.quizQuestions = data.quiz;
      this.activity = data.activity;
    }
  }

  selectAnswer(questionIndex: number, choiceIndex: number): void {
    if (!this.quizSubmitted) {
      this.selectedAnswers[questionIndex] = choiceIndex;
    }
  }

  allAnswered(): boolean {
    return Object.keys(this.selectedAnswers).length === this.quizQuestions.length;
  }

  submitQuiz(): void {
    this.score = 0;
    this.dailyQuestBonuses = [];
    this.expGained = 0;

    this.quizQuestions.forEach((q, i) => {
      if (this.selectedAnswers[i] === q.correctIndex) this.score++;
    });

    this.scorePercent = (this.score / this.quizQuestions.length) * 100;
    this.quizPassed = this.scorePercent >= 70;
    this.quizSubmitted = true;

    if (this.quizPassed && this.lesson) {
      const wasAlreadyCompleted = this.progressService.isLessonCompleted(this.lesson.id);
      this.progressService.completeLesson(this.lesson.id, this.lesson.expReward);

      if (!wasAlreadyCompleted) {
        this.expGained += this.lesson.expReward;
      }

      const lessonQuestClaimed = this.progressService.completeDailyQuest('complete_lesson', 100);
      if (lessonQuestClaimed) {
        this.expGained += 100;
        this.dailyQuestBonuses.push({ name: '⚔️ Complete a Lesson', exp: 100 });
      }

      const quizQuestClaimed = this.progressService.completeDailyQuest('pass_quiz', 50);
      if (quizQuestClaimed) {
        this.expGained += 50;
        this.dailyQuestBonuses.push({ name: '🧠 Pass a Quiz', exp: 50 });
      }

      if (!quizQuestClaimed) {
        this.progressService.passQuiz(0);
      }

      // Show activity after passing
      if (!wasAlreadyCompleted) {
        this.showActivity = true;
      }
    }
  }

  submitActivity(): void {
    this.activitySubmitted = true;
  }

  retryQuiz(): void {
    this.selectedAnswers = {};
    this.quizSubmitted = false;
    this.score = 0;
    this.scorePercent = 0;
    this.expGained = 0;
    this.dailyQuestBonuses = [];
    this.showActivity = false;
    this.activityAnswer = '';
    this.activitySubmitted = false;
  }

  canDeactivate(): boolean {
    if (Object.keys(this.selectedAnswers).length > 0 && !this.quizSubmitted) {
      return false;
    }
    return true;
  }
}