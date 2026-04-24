import { Component, Input } from '@angular/core';
import { NgClass, NgIf } from '@angular/common';

@Component({
  selector: 'app-rank-badge',
  standalone: true,
  imports: [NgClass, NgIf],
  templateUrl: './rank-badge.html',
  styleUrl: './rank-badge.css'
})
export class RankBadgeComponent {
  @Input() rank: string = 'E';
  @Input() showLabel: boolean = true;
  @Input() size: 'sm' | 'md' | 'lg' = 'md';

  get rankName(): string {
    const names: { [key: string]: string } = {
      'E': 'Unranked Scholar',
      'D': 'Bronze Learner',
      'C': 'Silver Mind',
      'B': 'Gold Intellect',
      'A': 'Platinum Sage',
      'S': 'Shadow Scholar'
    };
    return names[this.rank] ?? 'Unknown';
  }
}