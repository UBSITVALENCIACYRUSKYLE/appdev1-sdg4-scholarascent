import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgFor, NgClass } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, NgFor, NgClass],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class HomeComponent {
  ranks = [
    { letter: 'E', name: 'Unranked Scholar', exp: '0' },
    { letter: 'D', name: 'Bronze Learner', exp: '500' },
    { letter: 'C', name: 'Silver Mind', exp: '1,500' },
    { letter: 'B', name: 'Gold Intellect', exp: '3,500' },
    { letter: 'A', name: 'Platinum Sage', exp: '7,000' },
    { letter: 'S', name: 'Shadow Scholar', exp: '12,000' },
  ];

  features = [
    { icon: '📖', title: 'Learn Programming', description: 'Study core programming concepts from variables to OOP through structured, bite-sized lessons.' },
    { icon: '⚔️', title: 'Complete Quests', description: 'Every lesson and quiz is a quest. Finish them to earn EXP and climb the Hunter ranks.' },
    { icon: '📈', title: 'Level Up', description: 'Track your progress through 6 ranks from E to S. Watch your EXP bar fill with every achievement.' },
    { icon: '🏆', title: 'Earn Badges', description: 'Unlock special badges for milestones like completing a topic or maintaining a login streak.' },
    { icon: '🧠', title: 'Test Your Knowledge', description: 'Face quizzes at the end of every lesson. The harder the quiz, the more EXP you earn.' },
    { icon: '🌍', title: 'SDG 4 Aligned', description: 'Every lesson contributes to quality education — making coding accessible to every learner.' },
  ];
}