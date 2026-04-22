import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';
import { OpenLibrarySearchResponse } from '../models/open-library.model';
import { Lesson } from '../models/lesson.model';

@Injectable({
  providedIn: 'root'
})
export class LessonService {
  private http = inject(HttpClient);

  private readonly API_URL = 'https://openlibrary.org';

  // Static lesson content for programming topics
  private lessons: Lesson[] = [
    { id: 1, title: 'Introduction to Programming', topic: 'Basics', description: 'Learn what programming is and how computers think.', expReward: 100, content: '', completed: false },
    { id: 2, title: 'Variables & Data Types', topic: 'Basics', description: 'Understand how to store and use data in your programs.', expReward: 100, content: '', completed: false },
    { id: 3, title: 'Control Flow & Conditionals', topic: 'Logic', description: 'Make decisions in your code using if/else statements.', expReward: 150, content: '', completed: false },
    { id: 4, title: 'Loops & Iteration', topic: 'Logic', description: 'Repeat actions efficiently using for and while loops.', expReward: 150, content: '', completed: false },
    { id: 5, title: 'Functions & Methods', topic: 'Functions', description: 'Organize your code into reusable blocks called functions.', expReward: 200, content: '', completed: false },
    { id: 6, title: 'Arrays & Collections', topic: 'Data Structures', description: 'Store multiple values in a single variable using arrays.', expReward: 200, content: '', completed: false },
    { id: 7, title: 'Object-Oriented Programming', topic: 'OOP', description: 'Model real-world things using classes and objects.', expReward: 300, content: '', completed: false },
    { id: 8, title: 'Error Handling', topic: 'Advanced', description: 'Write robust code that handles unexpected situations gracefully.', expReward: 250, content: '', completed: false },
  ];

  getLessons(): Lesson[] {
    return this.lessons;
  }

  getLessonById(id: number): Lesson | undefined {
    return this.lessons.find(l => l.id === id);
  }

  // Fetch programming books from Open Library API
  getProgrammingBooks(query: string = 'programming'): Observable<OpenLibrarySearchResponse> {
    return this.http.get<OpenLibrarySearchResponse>(
      `${this.API_URL}/search.json?q=${query}&subject=programming&limit=8`
    ).pipe(
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