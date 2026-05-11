import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgFor, NgIf, AsyncPipe, UpperCasePipe, TitleCasePipe } from '@angular/common';
import { LessonService } from '../../services/lesson';
import { ProgressService } from '../../services/progress';
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
  imports: [RouterLink, NgFor, NgIf, AsyncPipe, UpperCasePipe, TitleCasePipe, NgFor],
  templateUrl: './lessons.html',
  styleUrl: './lessons.css'
})
export class LessonsComponent {
  private lessonService = inject(LessonService);
  private progressService = inject(ProgressService);

  selectedTopic = signal<string>('All');
  searchQuery = signal<string>('');

  topics = ['All', 'Basics', 'Logic', 'Functions', 'Data Structures', 'OOP', 'Advanced'];

  // ✅ Getter so Angular re-evaluates on every change detection
  // picking up latest completion state from ProgressService
  get filteredLessons(): Lesson[] {
    const all = this.lessonService.getLessons();
    const topic = this.selectedTopic();
    const query = this.searchQuery().toLowerCase();

    return all.filter(l => {
      const matchTopic = topic === 'All' || l.topic === topic;
      const matchSearch = !query || l.title.toLowerCase().includes(query);
      return matchTopic && matchSearch;
    });
  }

  get lessons(): Lesson[] {
    return this.lessonService.getLessons();
  }

  // ✅ Progress summary
  get completedCount(): number {
    return this.lessonService.getLessons().filter(l => l.completed).length;
  }

  get totalCount(): number {
    return this.lessonService.getLessons().length;
  }

  // ✅ Observable with loading, error, and data states via async pipe
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

  onSearch(event: Event): void {
    this.searchQuery.set((event.target as HTMLInputElement).value);
  }
}