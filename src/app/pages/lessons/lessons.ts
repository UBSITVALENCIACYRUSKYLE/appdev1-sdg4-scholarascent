import { Component, inject, signal, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgFor, NgIf, AsyncPipe, UpperCasePipe, TitleCasePipe } from '@angular/common';
import { LessonService } from '../../services/lesson';
import { Lesson } from '../../models/lesson.model';
import { Observable, startWith, map, catchError, of } from 'rxjs';

interface BooksState {
  loading: boolean;
  error: boolean;
  data: any | null;
}

@Component({
  selector: 'app-lessons',
  standalone: true,
  imports: [RouterLink, NgFor, NgIf, AsyncPipe, UpperCasePipe, TitleCasePipe],
  templateUrl: './lessons.html',
  styleUrl: './lessons.css'
})
export class LessonsComponent {
  private lessonService = inject(LessonService);

  get lessons(): Lesson[] {
    return this.lessonService.getLessons();
  }

  selectedTopic = signal<string>('All');

  filteredLessons = computed(() => {
    const all = this.lessonService.getLessons();
    if (this.selectedTopic() === 'All') return all;
    return all.filter(l => l.topic === this.selectedTopic());
  });

  topics = ['All', 'Basics', 'Logic', 'Functions', 'Data Structures', 'OOP', 'Advanced'];

  // ✅ Single observable that tracks loading, error, and data states
  booksState$: Observable<BooksState> = this.lessonService
    .getProgrammingBooks('programming typescript')
    .pipe(
      map(data => ({ loading: false, error: false, data })),
      startWith({ loading: true, error: false, data: null }),
      catchError(() => of({ loading: false, error: true, data: null }))
    );

  setTopic(topic: string): void {
    this.selectedTopic.set(topic);
  }
}