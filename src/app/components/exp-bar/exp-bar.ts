import { Component, Input, computed, signal } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-exp-bar',
  standalone: true,
  imports: [NgClass],
  templateUrl: './exp-bar.html',
  styleUrl: './exp-bar.css'
})
export class ExpBarComponent {
  @Input() currentExp: number = 0;
  @Input() maxExp: number = 500;
  @Input() currentRank: string = 'E';
  @Input() nextRank: string = 'D';

  get percent(): number {
    return Math.min((this.currentExp / this.maxExp) * 100, 100);
  }
}