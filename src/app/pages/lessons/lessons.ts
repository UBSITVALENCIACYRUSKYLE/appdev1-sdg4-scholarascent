import { Component, inject, signal, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgFor, NgIf, AsyncPipe, UpperCasePipe, TitleCasePipe } from '@angular/common';
import { LessonService } from '../../services/lesson';
import { Lesson } from '../../models/lesson.model';
import { Observable, catchError, of, tap } from 'rxjs';

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

  // isLoading flag for loading state
  isLoading = true;
  hasError = false;

  // Observable exposed — async pipe used in template, no manual subscribe
  books$: Observable<any> = this.lessonService.getProgrammingBooks('programming typescript').pipe(
    tap(() => this.isLoading = false),
    catchError(() => {
      this.isLoading = false;
      this.hasError = true;
      return of({ numFound: 0, start: 0, docs: [] });
    })
  );

  setTopic(topic: string): void {
    this.selectedTopic.set(topic);
  }
}