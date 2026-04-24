import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgIf, NgClass } from '@angular/common';

export interface Quest {
  name: string;
  description: string;
  exp: number;
  done: boolean;
}

@Component({
  selector: 'app-quest-card',
  standalone: true,
  imports: [NgIf, NgClass],
  templateUrl: './quest-card.html',
  styleUrl: './quest-card.css'
})
export class QuestCardComponent {
  @Input() quest!: Quest;
  @Output() complete = new EventEmitter<void>();

  onComplete(): void {
    this.complete.emit();
  }
}