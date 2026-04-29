import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NgFor, NgIf, UpperCasePipe, DecimalPipe } from '@angular/common';
import { LessonService } from '../../services/lesson';
import { ProgressService } from '../../services/progress';
import { Lesson } from '../../models/lesson.model';
import { CanComponentDeactivate } from '../../guards/lesson-guard';

interface DailyBonus {
  name: string;
  exp: number;
}

@Component({
  selector: 'app-lesson-detail',
  standalone: true,
  imports: [RouterLink, NgFor, NgIf, UpperCasePipe, DecimalPipe],
  templateUrl: './lesson-detail.html',
  styleUrl: './lesson-detail.css'
})
export class LessonDetailComponent implements OnInit, CanComponentDeactivate {
  private route = inject(ActivatedRoute);
  private lessonService = inject(LessonService);
  private progressService = inject(ProgressService);

  lesson: Lesson | undefined;
  choiceLetters = ['A', 'B', 'C', 'D'];

  selectedAnswers: { [key: number]: number } = {};
  quizSubmitted = false;
  quizPassed = false;
  score = 0;
  scorePercent = 0;
  expGained = 0;
  dailyQuestBonuses: DailyBonus[] = [];

  contentBlocks = [
    {
      title: 'Introduction',
      text: 'Welcome to this lesson. Read through the material carefully before attempting the quiz.',
      code: null
    },
    {
      title: 'Core Concept',
      text: 'Every programming concept builds on the basics. Understanding the fundamentals will help you progress through the ranks faster.',
      code: '// Example code\nconsole.log("Hello, Scholar!");'
    },
    {
      title: 'Key Takeaway',
      text: 'Apply what you have learned by completing the Knowledge Check below. You need 70% or higher to earn EXP.',
      code: null
    }
  ];

  quizQuestions = [
    {
      question: 'What is the primary purpose of a variable in programming?',
      choices: ['To store data', 'To delete data', 'To print output', 'To create loops'],
      correctIndex: 0
    },
    {
      question: 'Which of the following is a valid way to declare a variable in TypeScript?',
      choices: ['var x = 5', 'let x = 5', 'const x = 5', 'All of the above'],
      correctIndex: 3
    },
    {
      question: 'What does "console.log()" do in JavaScript?',
      choices: ['Saves data', 'Prints output to the console', 'Creates a variable', 'Loops through data'],
      correctIndex: 1
    }
  ];

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.lesson = this.lessonService.getLessonById(id);
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
      // Complete lesson — only grants EXP if not already completed
      const wasAlreadyCompleted = this.progressService.isLessonCompleted(this.lesson.id);
      this.progressService.completeLesson(this.lesson.id, this.lesson.expReward);

      if (!wasAlreadyCompleted) {
        this.expGained += this.lesson.expReward;
      }

      // Sync "Complete a Lesson" daily quest
      const lessonQuestClaimed = this.progressService.completeDailyQuest('complete_lesson', 100);
      if (lessonQuestClaimed) {
        this.expGained += 100;
        this.dailyQuestBonuses.push({ name: '⚔️ Complete a Lesson', exp: 100 });
      }

      // Sync "Pass a Quiz" daily quest
      const quizQuestClaimed = this.progressService.completeDailyQuest('pass_quiz', 50);
      if (quizQuestClaimed) {
        this.expGained += 50;
        this.dailyQuestBonuses.push({ name: '🧠 Pass a Quiz', exp: 50 });
      }

      // Track quiz count even if daily quest already claimed
      if (!quizQuestClaimed) {
        this.progressService.passQuiz(0);
      }
    }
  }

  retryQuiz(): void {
    this.selectedAnswers = {};
    this.quizSubmitted = false;
    this.score = 0;
    this.scorePercent = 0;
    this.expGained = 0;
    this.dailyQuestBonuses = [];
  }

  canDeactivate(): boolean {
    if (Object.keys(this.selectedAnswers).length > 0 && !this.quizSubmitted) {
      return false;
    }
    return true;
  }
}