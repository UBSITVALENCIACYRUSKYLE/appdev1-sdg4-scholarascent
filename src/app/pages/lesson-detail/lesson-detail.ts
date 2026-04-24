import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NgFor, NgIf, UpperCasePipe, DecimalPipe } from '@angular/common';
import { LessonService } from '../../services/lesson';
import { Lesson } from '../../models/lesson.model';
import { CanComponentDeactivate } from '../../guards/lesson-guard';

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

  lesson: Lesson | undefined;
  choiceLetters = ['A', 'B', 'C', 'D'];

  selectedAnswers: { [key: number]: number } = {};
  quizSubmitted = false;
  quizPassed = false;
  score = 0;
  scorePercent = 0;
  expGained = 0;

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
    this.quizQuestions.forEach((q, i) => {
      if (this.selectedAnswers[i] === q.correctIndex) this.score++;
    });
    this.scorePercent = (this.score / this.quizQuestions.length) * 100;
    this.quizPassed = this.scorePercent >= 70;
    this.expGained = this.quizPassed ? (this.lesson?.expReward ?? 100) : 0;
    this.quizSubmitted = true;
  }

  retryQuiz(): void {
    this.selectedAnswers = {};
    this.quizSubmitted = false;
    this.score = 0;
    this.scorePercent = 0;
  }

  // canDeactivate implementation
  canDeactivate(): boolean {
    if (Object.keys(this.selectedAnswers).length > 0 && !this.quizSubmitted) {
      return false;
    }
    return true;
  }
}