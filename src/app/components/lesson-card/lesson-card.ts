import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgClass, UpperCasePipe } from '@angular/common';
import { Lesson } from '../../models/lesson.model';

@Component({
  selector: 'app-lesson-card',
  standalone: true,
  imports: [NgClass, UpperCasePipe],
  templateUrl: './lesson-card.html',
  styleUrl: './lesson-card.css'
})
export class LessonCardComponent {
  @Input() lesson!: Lesson;
  @Output() view = new EventEmitter<number>();

  onView(): void {
    this.view.emit(this.lesson.id);
  }
}