import { Component, inject, signal, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgFor, NgIf, NgClass, AsyncPipe, UpperCasePipe, TitleCasePipe } from '@angular/common';
import { LessonService } from '../../services/lesson';
import { Lesson } from '../../models/lesson.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-lessons',
  standalone: true,
  imports: [RouterLink, NgFor, NgIf, NgClass, AsyncPipe, UpperCasePipe, TitleCasePipe],
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
    if (this.selectedTopic() === 'All') return this.lessons;
    return this.lessons.filter(l => l.topic === this.selectedTopic());
  });

  topics = ['All', 'Basics', 'Logic', 'Functions', 'Data Structures', 'OOP', 'Advanced'];

  books$: Observable<any> = this.lessonService.getProgrammingBooks('programming typescript');

  setTopic(topic: string): void {
    this.selectedTopic.set(topic);
  }
}