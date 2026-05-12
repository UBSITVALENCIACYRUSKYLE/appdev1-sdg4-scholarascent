import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';
import { OpenLibrarySearchResponse } from '../models/open-library.model';
import { Lesson } from '../models/lesson.model';
import { ProgressService } from './progress';

@Injectable({
  providedIn: 'root'
})
export class LessonService {
  private http = inject(HttpClient);
  private progress = inject(ProgressService);

  private readonly API_URL = 'https://openlibrary.org';

  private lessons: Lesson[] = [
  { id: 1, title: 'Introduction to Programming', topic: 'Basics', description: 'Learn what programming is and how computers think.', expReward: 100, content: '', completed: false },
  { id: 2, title: 'Variables & Data Types', topic: 'Basics', description: 'Understand how to store and use data in your programs.', expReward: 100, content: '', completed: false },
  { id: 3, title: 'Control Flow & Conditionals', topic: 'Logic', description: 'Make decisions in your code using if/else statements.', expReward: 150, content: '', completed: false },
  { id: 4, title: 'Loops & Iteration', topic: 'Logic', description: 'Repeat actions efficiently using for and while loops.', expReward: 150, content: '', completed: false },
  { id: 5, title: 'Functions & Methods', topic: 'Functions', description: 'Organize your code into reusable blocks called functions.', expReward: 200, content: '', completed: false },
  { id: 6, title: 'Arrays & Collections', topic: 'Data Structures', description: 'Store multiple values in a single variable using arrays.', expReward: 200, content: '', completed: false },
  { id: 7, title: 'Object-Oriented Programming', topic: 'OOP', description: 'Model real-world things using classes and objects.', expReward: 300, content: '', completed: false },
  { id: 8, title: 'Error Handling', topic: 'Advanced', description: 'Write robust code that handles unexpected situations gracefully.', expReward: 250, content: '', completed: false },
  { id: 9, title: 'TypeScript Basics', topic: 'Basics', description: 'Learn static typing and TypeScript fundamentals.', expReward: 150, content: '', completed: false },
  { id: 10, title: 'Recursion', topic: 'Functions', description: 'Solve problems by having functions call themselves.', expReward: 250, content: '', completed: false },
  { id: 11, title: 'Sorting Algorithms', topic: 'Data Structures', description: 'Learn how to sort data using bubble, selection, and merge sort.', expReward: 300, content: '', completed: false },
  { id: 12, title: 'Async & Promises', topic: 'Advanced', description: 'Handle asynchronous code with Promises and async/await.', expReward: 300, content: '', completed: false },
  { id: 13, title: 'Higher Order Functions', topic: 'Functions', description: 'Master map, filter, reduce and other powerful array methods.', expReward: 250, content: '', completed: false },
  { id: 14, title: 'Closures & Scope', topic: 'Functions', description: 'Understand lexical scope, closures, and how JavaScript handles variables.', expReward: 300, content: '', completed: false },
  { id: 15, title: 'Linked Lists', topic: 'Data Structures', description: 'Implement and traverse linked lists — a fundamental data structure.', expReward: 350, content: '', completed: false },
  { id: 16, title: 'Stacks & Queues', topic: 'Data Structures', description: 'Learn LIFO and FIFO data structures and their real-world applications.', expReward: 350, content: '', completed: false },
  { id: 17, title: 'Inheritance & Polymorphism', topic: 'OOP', description: 'Extend classes and override behavior using OOP inheritance patterns.', expReward: 350, content: '', completed: false },
  { id: 18, title: 'Design Patterns', topic: 'OOP', description: 'Learn Singleton, Observer, and Factory patterns used in real projects.', expReward: 400, content: '', completed: false },
  { id: 19, title: 'Binary Search', topic: 'Advanced', description: 'Efficiently search sorted data structures with O(log n) complexity.', expReward: 350, content: '', completed: false },
  { id: 20, title: 'Graph Algorithms', topic: 'Advanced', description: 'Explore BFS, DFS, and shortest path algorithms on graph structures.', expReward: 500, content: '', completed: false },
  { id: 21, title: 'Regular Expressions', topic: 'Basics', description: 'Match and manipulate text patterns using regex in TypeScript.', expReward: 200, content: '', completed: false },
  { id: 22, title: 'Modules & Namespaces', topic: 'Basics', description: 'Organize large TypeScript projects using ES modules and namespaces.', expReward: 200, content: '', completed: false },
  { id: 23, title: 'Decorators in TypeScript', topic: 'Advanced', description: 'Use TypeScript decorators to add metadata and modify class behavior.', expReward: 400, content: '', completed: false },
  { id: 24, title: 'Functional Programming', topic: 'Advanced', description: 'Write pure functions, avoid side effects, and embrace immutability.', expReward: 400, content: '', completed: false },
];

  getLessons(): Lesson[] {
    return this.lessons.map(lesson => ({
      ...lesson,
      completed: this.progress.isLessonCompleted(lesson.id)
    }));
  }

  getLessonById(id: number): Lesson | undefined {
    const lesson = this.lessons.find(l => l.id === id);
    if (!lesson) return undefined;
    return {
      ...lesson,
      completed: this.progress.isLessonCompleted(lesson.id)
    };
  }

  // All API calls inside service — not in component(done at home)
  getProgrammingBooks(query: string = 'programming'): Observable<OpenLibrarySearchResponse> {
    return this.http.get<OpenLibrarySearchResponse>(
      `${this.API_URL}/search.json?q=${query}&subject=programming&limit=8`
    ).pipe(
      // catchError handles HTTP errors gracefully(done at home))
      catchError(error => {
        console.error('Open Library API error:', error);
        return of({ numFound: 0, start: 0, docs: [] });
      })
    );
  }

  getBookCoverUrl(coverId: number, size: 'S' | 'M' | 'L' = 'M'): string {
    return `https://covers.openlibrary.org/b/id/${coverId}-${size}.jpg`;
  }
}